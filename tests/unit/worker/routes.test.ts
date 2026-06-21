import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import worker, { type Env } from "../../../src/worker";

const TURNSTILE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function makeEnv(overrides: Partial<Env> = {}): Env {
	return {
		ASSETS: {
			fetch: vi.fn(async (request: Request) => {
				return new Response("pdf-body-bytes", {
					status: 200,
					headers: { "content-type": "application/pdf" },
				});
			}),
		} as unknown as Env["ASSETS"],
		PUBLIC_TURNSTILE_SITE_KEY: "0xSITEKEY",
		TURNSTILE_SECRET_KEY: "turnstile-secret",
		COOKIE_SECRET: "cookie-secret",
		CONTACT_EMAIL: "contact@example.test",
		...overrides,
	};
}

async function callWorker(request: Request, env: Env) {
	const ctx = createExecutionContext();
	const response = await worker.fetch(request, env, ctx);
	await waitOnExecutionContext(ctx);
	return response;
}

function makeVerifyRequest(fields: Record<string, string>, headers: Record<string, string> = {}) {
	const formData = new FormData();
	for (const [key, value] of Object.entries(fields)) formData.set(key, value);
	const request = new Request("https://portfolio.local/__turnstile-verify", {
		method: "POST",
		body: formData,
	});
	for (const [key, value] of Object.entries(headers)) request.headers.set(key, value);
	return request;
}

function freshCookieSignature(env: Env, ageSeconds = 0) {
	const ts = Math.floor(Date.now() / 1000) - ageSeconds;
	return `${ts}.sig`;
}

describe("public routes", () => {
	it("delegates non-protected paths to ASSETS", async () => {
		const env = makeEnv();
		const response = await callWorker(new Request("https://portfolio.local/"), env);
		expect(response.status).toBe(200);
		expect(env.ASSETS.fetch).toHaveBeenCalledOnce();
	});

	it("delegates static assets to ASSETS without verification", async () => {
		const env = makeEnv();
		await callWorker(new Request("https://portfolio.local/styles/global.css"), env);
		expect(env.ASSETS.fetch).toHaveBeenCalledOnce();
	});
});

describe("protected routes without a valid cookie", () => {
	const protectedPaths = ["/__contact-email", "/__download-cv", "/docs/cv-jose-carlos-gomez.pdf"];

	for (const path of protectedPaths) {
		it(`returns 403 with the challenge page for ${path}`, async () => {
			const env = makeEnv();
			const response = await callWorker(new Request(`https://portfolio.local${path}`), env);
			expect(response.status).toBe(403);
			expect(response.headers.get("content-type")).toContain("text/html");
			expect(response.headers.get("cache-control")).toBe("no-store");
			const body = await response.text();
			expect(body).toContain("data-sitekey=\"0xSITEKEY\"");
			expect(body).toContain('action="/__turnstile-verify"');
			expect(env.ASSETS.fetch).not.toHaveBeenCalled();
		});
	}

	it("does not ask ASSETS for other PDFs under /docs/", async () => {
		const env = makeEnv();
		const response = await callWorker(
			new Request("https://portfolio.local/docs/other.pdf"),
			env
		);
		expect(response.status).toBe(200);
		expect(env.ASSETS.fetch).toHaveBeenCalledOnce();
	});
});

describe("protected routes with a valid cookie", () => {
	async function makeSignedCookie(env: Env) {
		const ts = Math.floor(Date.now() / 1000);
		const { signValue } = await import("../../../src/worker");
		const signature = await signValue(String(ts), env.COOKIE_SECRET);
		return `portfolio_turnstile_verified=${ts}.${signature}`;
	}

	it("serves the contact email page for /__contact-email", async () => {
		const env = makeEnv();
		const cookie = await makeSignedCookie(env);
		const request = new Request("https://portfolio.local/__contact-email", {
			headers: { cookie },
		});
		const response = await callWorker(request, env);
		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toContain("text/html");
		expect(response.headers.get("cache-control")).toBe("no-store");
		const body = await response.text();
		expect(body).toContain("contact@example.test");
		expect(body).toContain('href="mailto:contact@example.test"');
		expect(env.ASSETS.fetch).not.toHaveBeenCalled();
	});

	it("serves the CV as a PDF attachment for /__download-cv", async () => {
		const env = makeEnv();
		const cookie = await makeSignedCookie(env);
		const request = new Request("https://portfolio.local/__download-cv", {
			headers: { cookie },
		});
		const response = await callWorker(request, env);
		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toBe("application/pdf");
		expect(response.headers.get("content-disposition")).toBe(
			'attachment; filename="cv-jose-carlos-gomez.pdf"'
		);
		expect(response.headers.get("cache-control")).toBe("private, max-age=0, must-revalidate");
		expect(env.ASSETS.fetch).toHaveBeenCalledOnce();
		const body = await response.text();
		expect(body).toBe("pdf-body-bytes");
	});

	it("serves the CV for the direct PDF path too", async () => {
		const env = makeEnv();
		const cookie = await makeSignedCookie(env);
		const request = new Request("https://portfolio.local/docs/cv-jose-carlos-gomez.pdf", {
			headers: { cookie },
		});
		const response = await callWorker(request, env);
		expect(response.status).toBe(200);
		expect(response.headers.get("content-type")).toBe("application/pdf");
		expect(env.ASSETS.fetch).toHaveBeenCalledOnce();
	});
});

describe("POST /__turnstile-verify", () => {
	let originalFetch: typeof globalThis.fetch;
	let siteverifyMock: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		originalFetch = globalThis.fetch;
		siteverifyMock = vi.fn();
		vi.stubGlobal("fetch", siteverifyMock);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("redirects with missing-token when no token is posted", async () => {
		const env = makeEnv();
		const response = await callWorker(
			makeVerifyRequest({ redirect: "/__download-cv" }),
			env
		);
		expect(response.status).toBe(303);
		expect(response.headers.get("location")).toBe("/__download-cv?turnstile=missing-token");
		expect(response.headers.get("cache-control")).toBe("no-store");
		expect(siteverifyMock).not.toHaveBeenCalled();
	});

	it("defaults the redirect to / when the field is not posted", async () => {
		const env = makeEnv();
		const response = await callWorker(
			makeVerifyRequest({ "turnstile-token": "" }),
			env
		);
		expect(response.status).toBe(303);
		expect(response.headers.get("location")).toBe("/?turnstile=missing-token");
	});

	it("sets a signed cookie and redirects on a successful verification", async () => {
		siteverifyMock.mockResolvedValue(
			new Response(JSON.stringify({ success: true, hostname: "portfolio.local" }), {
				headers: { "content-type": "application/json" },
			})
		);
		const env = makeEnv();
		const response = await callWorker(
			makeVerifyRequest({ "turnstile-token": "valid-token", redirect: "/__download-cv" }),
			env
		);
		expect(response.status).toBe(303);
		expect(response.headers.get("location")).toBe("/__download-cv");
		const setCookie = response.headers.get("set-cookie");
		expect(setCookie).toContain("portfolio_turnstile_verified=");
		expect(setCookie).toContain("HttpOnly");
		expect(setCookie).toContain("Secure");
		expect(setCookie).toContain("SameSite=Lax");
		expect(setCookie).toContain("Max-Age=2592000");
		expect(siteverifyMock).toHaveBeenCalledOnce();
		const call = siteverifyMock.mock.calls[0];
		expect(call[0]).toBe(TURNSTILE_SITEVERIFY_URL);
		const sentBody = call[1].body as FormData;
		expect(sentBody.get("secret")).toBe("turnstile-secret");
		expect(sentBody.get("response")).toBe("valid-token");
	});

	it("forwards the CF-Connecting-IP as remoteip when present", async () => {
		siteverifyMock.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), {
				headers: { "content-type": "application/json" },
			})
		);
		const env = makeEnv();
		await callWorker(
			makeVerifyRequest(
				{ "turnstile-token": "valid-token", redirect: "/" },
				{ "CF-Connecting-IP": "203.0.113.10" }
			),
			env
		);
		const sentBody = siteverifyMock.mock.calls[0][1].body as FormData;
		expect(sentBody.get("remoteip")).toBe("203.0.113.10");
	});

	it("redirects with verification-failed when siteverify rejects the token", async () => {
		siteverifyMock.mockResolvedValue(
			new Response(JSON.stringify({ success: false }), {
				headers: { "content-type": "application/json" },
			})
		);
		const env = makeEnv();
		const response = await callWorker(
			makeVerifyRequest({ "turnstile-token": "bad-token", redirect: "/__download-cv" }),
			env
		);
		expect(response.status).toBe(303);
		expect(response.headers.get("location")).toBe("/__download-cv?turnstile=verification-failed");
		expect(response.headers.get("set-cookie")).toBeNull();
	});

	it("also accepts the cf-turnstile-response field name", async () => {
		siteverifyMock.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), {
				headers: { "content-type": "application/json" },
			})
		);
		const env = makeEnv();
		const response = await callWorker(
			makeVerifyRequest({ "cf-turnstile-response": "alt-token", redirect: "/" }),
			env
		);
		expect(response.status).toBe(303);
		expect(response.headers.get("set-cookie")).toContain("portfolio_turnstile_verified=");
		const sentBody = siteverifyMock.mock.calls[0][1].body as FormData;
		expect(sentBody.get("response")).toBe("alt-token");
	});

	it("sanitizes an unsafe redirect target on success", async () => {
		siteverifyMock.mockResolvedValue(
			new Response(JSON.stringify({ success: true }), {
				headers: { "content-type": "application/json" },
			})
		);
		const env = makeEnv();
		const response = await callWorker(
			makeVerifyRequest({ "turnstile-token": "valid-token", redirect: "//evil.example" }),
			env
		);
		expect(response.status).toBe(303);
		expect(response.headers.get("location")).toBe("/");
	});
});
