import { describe, it, expect } from "vitest";
import {
	sanitizeRedirect,
	escapeHtml,
	getCookie,
	isProtectedPath,
	base64UrlEncode,
	timingSafeEqual,
	signValue,
	hasValidVerificationCookie,
	renderChallengePage,
	renderEmailPage,
	withTurnstileReason,
	challengeRedirect,
} from "../../src/worker";
import type { Env } from "../../src/worker";

const TEST_ENV: Env = {
	ASSETS: { fetch: async () => new Response("asset") } as unknown as Env["ASSETS"],
	PUBLIC_TURNSTILE_SITE_KEY: "0xSITEKEY",
	TURNSTILE_SECRET_KEY: "turnstile-secret",
	COOKIE_SECRET: "cookie-secret",
	CONTACT_EMAIL: "contact@example.test",
};

function makeRequest(cookieHeader?: string) {
	const headers = new Headers();
	if (cookieHeader) headers.set("cookie", cookieHeader);
	return new Request("https://portfolio.local/__download-cv", { headers });
}

describe("sanitizeRedirect", () => {
	it("rejects values that do not start with /", () => {
		expect(sanitizeRedirect("http://evil.example")).toBe("/");
		expect(sanitizeRedirect("https://evil.example/path")).toBe("/");
	});

	it("rejects protocol-relative URLs starting with //", () => {
		expect(sanitizeRedirect("//evil.example")).toBe("/");
		expect(sanitizeRedirect("//evil.example/path")).toBe("/");
	});

	it("keeps normal relative paths", () => {
		expect(sanitizeRedirect("/__download-cv")).toBe("/__download-cv");
		expect(sanitizeRedirect("/__contact-email?foo=bar#anchor")).toBe("/__contact-email?foo=bar#anchor");
	});

	it("strips any preexisting turnstile query param", () => {
		expect(sanitizeRedirect("/__download-cv?turnstile=verification-failed")).toBe("/__download-cv");
		expect(sanitizeRedirect("/__download-cv?keep=1&turnstile=x&also=2")).toBe("/__download-cv?keep=1&also=2");
	});

	it("returns root for empty string", () => {
		expect(sanitizeRedirect("")).toBe("/");
	});
});

describe("escapeHtml", () => {
	it("escapes every special character", () => {
		expect(escapeHtml(`<a href="x" onclick='y'>&</a>`)).toBe(
			"&lt;a href=&quot;x&quot; onclick=&#039;y&#039;&gt;&amp;&lt;/a&gt;"
		);
	});

	it("returns empty string unchanged", () => {
		expect(escapeHtml("")).toBe("");
	});

	it("leaves safe text untouched", () => {
		expect(escapeHtml("hello world 123")).toBe("hello world 123");
	});

	it("escapes each character independently", () => {
		expect(escapeHtml("<")).toBe("&lt;");
		expect(escapeHtml(">")).toBe("&gt;");
		expect(escapeHtml("&")).toBe("&amp;");
		expect(escapeHtml('"')).toBe("&quot;");
		expect(escapeHtml("'")).toBe("&#039;");
	});
});

describe("getCookie", () => {
	it("returns the value when the cookie is present", () => {
		expect(getCookie("a=1; portfolio_turnstile_verified=abc.def; b=2", "portfolio_turnstile_verified")).toBe(
			"abc.def"
		);
	});

	it("returns null when the cookie is absent", () => {
		expect(getCookie("a=1; b=2", "portfolio_turnstile_verified")).toBeNull();
	});

	it("returns null for an empty header", () => {
		expect(getCookie("", "portfolio_turnstile_verified")).toBeNull();
	});

	it("decodes URI-encoded values", () => {
		const raw = encodeURIComponent("val ue%2F");
		expect(getCookie("name=" + raw, "name")).toBe("val ue%2F");
	});

	it("does not match cookies that merely contain the name as a substring", () => {
		expect(getCookie("not_portfolio_turnstile_verified=1", "portfolio_turnstile_verified")).toBeNull();
	});
});

describe("isProtectedPath", () => {
	it("returns true for the three protected routes", () => {
		expect(isProtectedPath("/__contact-email")).toBe(true);
		expect(isProtectedPath("/__download-cv")).toBe(true);
		expect(isProtectedPath("/docs/cv-jose-carlos-gomez.pdf")).toBe(true);
	});

	it("returns false for public routes", () => {
		expect(isProtectedPath("/")).toBe(false);
		expect(isProtectedPath("/index.html")).toBe(false);
		expect(isProtectedPath("/styles/global.css")).toBe(false);
		expect(isProtectedPath("/docs/other.pdf")).toBe(false);
	});
});

describe("base64UrlEncode", () => {
	it("encodes bytes to base64url without padding", () => {
		const bytes = new TextEncoder().encode("hello");
		expect(base64UrlEncode(bytes.buffer)).toBe("aGVsbG8");
	});

	it("produces URL-safe characters only", () => {
		const bytes = new Uint8Array([0xfb, 0xff, 0xbf]).buffer;
		const encoded = base64UrlEncode(bytes);
		expect(encoded).not.toMatch(/[+/=]/);
		expect(encoded).toBe("-_-_");
	});

	it("encodes an empty buffer to an empty string", () => {
		expect(base64UrlEncode(new ArrayBuffer(0))).toBe("");
	});
});

describe("timingSafeEqual", () => {
	it("returns true for equal strings", () => {
		expect(timingSafeEqual("abc", "abc")).toBe(true);
		expect(timingSafeEqual("", "")).toBe(true);
	});

	it("returns false for different lengths", () => {
		expect(timingSafeEqual("abc", "ab")).toBe(false);
		expect(timingSafeEqual("ab", "abc")).toBe(false);
		expect(timingSafeEqual("abc", "")).toBe(false);
	});

	it("returns false for same length but different content", () => {
		expect(timingSafeEqual("abc", "abd")).toBe(false);
		expect(timingSafeEqual("abc", "ABC")).toBe(false);
	});
});

describe("signValue", () => {
	it("is deterministic for the same value and secret", async () => {
		const a = await signValue("123", "secret");
		const b = await signValue("123", "secret");
		expect(a).toBe(b);
		expect(a).not.toBe("");
	});

	it("changes when the value changes", async () => {
		const a = await signValue("123", "secret");
		const b = await signValue("124", "secret");
		expect(a).not.toBe(b);
	});

	it("changes when the secret changes", async () => {
		const a = await signValue("123", "secret-a");
		const b = await signValue("123", "secret-b");
		expect(a).not.toBe(b);
	});
});

describe("hasValidVerificationCookie", () => {
	it("returns false when there is no cookie header", async () => {
		expect(await hasValidVerificationCookie(makeRequest(), TEST_ENV)).toBe(false);
	});

	it("returns false when the named cookie is absent", async () => {
		expect(await hasValidVerificationCookie(makeRequest("other=1"), TEST_ENV)).toBe(false);
	});

	it("returns false when the cookie has no signature separator", async () => {
		expect(await hasValidVerificationCookie(makeRequest("portfolio_turnstile_verified=abc"), TEST_ENV)).toBe(
			false
		);
	});

	it("returns false when the timestamp is not a finite number", async () => {
		expect(
			await hasValidVerificationCookie(makeRequest("portfolio_turnstile_verified=notanumber.sig"), TEST_ENV)
		).toBe(false);
	});

	it("returns false when the cookie is older than 30 days", async () => {
		const expired = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 31;
		const signature = await signValue(String(expired), TEST_ENV.COOKIE_SECRET);
		expect(
			await hasValidVerificationCookie(
				makeRequest(`portfolio_turnstile_verified=${expired}.${signature}`),
				TEST_ENV
			)
		).toBe(false);
	});

	it("returns true for a fresh cookie signed with the right secret", async () => {
		const now = Math.floor(Date.now() / 1000);
		const signature = await signValue(String(now), TEST_ENV.COOKIE_SECRET);
		expect(
			await hasValidVerificationCookie(
				makeRequest(`portfolio_turnstile_verified=${now}.${signature}`),
				TEST_ENV
			)
		).toBe(true);
	});

	it("returns false when the signature was produced with a different secret", async () => {
		const now = Math.floor(Date.now() / 1000);
		const signature = await signValue(String(now), "different-secret");
		expect(
			await hasValidVerificationCookie(
				makeRequest(`portfolio_turnstile_verified=${now}.${signature}`),
				TEST_ENV
			)
		).toBe(false);
	});
});

describe("renderChallengePage", () => {
	it("renders the challenge HTML with the site key and verify form", () => {
		const html = renderChallengePage("0xSITEKEY", "/__download-cv");
		expect(html).toContain("<!doctype html>");
		expect(html).toContain('data-sitekey="0xSITEKEY"');
		expect(html).toContain('action="/__turnstile-verify"');
		expect(html).toContain('name="redirect" value="/__download-cv"');
	});

	it("escapes a malicious site key", () => {
		const html = renderChallengePage('"><script>alert(1)</script>', "/__download-cv");
		expect(html).not.toContain("<script>alert(1)</script>");
		expect(html).toContain("&quot;&gt;&lt;script&gt;");
	});

	it("sanitizes a malicious redirect target", () => {
		const html = renderChallengePage("0xSITEKEY", "//evil.example");
		expect(html).toContain('value="/"');
		expect(html).not.toContain("//evil.example");
	});

	it("drops a stale turnstile param from the redirect", () => {
		const html = renderChallengePage("0xSITEKEY", "/__download-cv?turnstile=old");
		expect(html).toContain('value="/__download-cv"');
	});
});

describe("renderEmailPage", () => {
	it("renders the email page with a mailto link", () => {
		const html = renderEmailPage("contact@example.test");
		expect(html).toContain("<!doctype html>");
		expect(html).toContain("contact@example.test");
		expect(html).toContain('href="mailto:contact@example.test"');
	});

	it("escapes a malicious email", () => {
		const html = renderEmailPage('a@b"><script>alert(1)</script>');
		expect(html).not.toContain("<script>alert(1)</script>");
		expect(html).toContain("&quot;&gt;&lt;script&gt;");
	});
});

describe("withTurnstileReason", () => {
	it("replaces any existing turnstile param with the new reason", () => {
		expect(withTurnstileReason("/__download-cv?turnstile=old", "missing-token")).toBe(
			"/__download-cv?turnstile=missing-token"
		);
	});

	it("adds the turnstile param when not present", () => {
		expect(withTurnstileReason("/__download-cv", "verification-failed")).toBe(
			"/__download-cv?turnstile=verification-failed"
		);
	});

	it("preserves other params and the hash", () => {
		expect(withTurnstileReason("/path?a=1&turnstile=old#frag", "missing-token")).toBe(
			"/path?a=1&turnstile=missing-token#frag"
		);
	});
});

describe("challengeRedirect", () => {
	it("returns a 303 redirect with the reason appended", () => {
		const response = challengeRedirect("/__download-cv", "missing-token");
		expect(response.status).toBe(303);
		expect(response.headers.get("location")).toBe("/__download-cv?turnstile=missing-token");
		expect(response.headers.get("cache-control")).toBe("no-store");
	});

	it("sanitizes the redirect target before appending the reason", () => {
		const response = challengeRedirect("//evil.example", "verification-failed");
		expect(response.headers.get("location")).toBe("/?turnstile=verification-failed");
	});
});
