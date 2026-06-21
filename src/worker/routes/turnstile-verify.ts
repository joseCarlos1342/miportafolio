import {
	COOKIE_MAX_AGE_SECONDS,
	COOKIE_NAME,
	TURNSTILE_SITEVERIFY_URL,
	type Env,
} from "../types";
import { sanitizeRedirect } from "../lib/sanitize-redirect";
import { signValue } from "../lib/crypto";
import { challengeRedirect } from "../lib/challenge-redirect";

export async function handleTurnstileVerify(
	request: Request,
	env: Env,
): Promise<Response> {
	const formData = await request.formData();
	const token = String(
		formData.get("turnstile-token") || formData.get("cf-turnstile-response") || "",
	);
	const redirectTo = sanitizeRedirect(String(formData.get("redirect") ?? "/"));

	if (!token) {
		return challengeRedirect(redirectTo, "missing-token");
	}

	const siteverifyBody = new FormData();
	siteverifyBody.set("secret", env.TURNSTILE_SECRET_KEY);
	siteverifyBody.set("response", token);

	const remoteIp = request.headers.get("CF-Connecting-IP");
	if (remoteIp) {
		siteverifyBody.set("remoteip", remoteIp);
	}

	const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
		method: "POST",
		body: siteverifyBody,
	});

	const result = await response.json<{ success?: boolean; hostname?: string }>();
	if (!result.success) {
		return challengeRedirect(redirectTo, "verification-failed");
	}

	const verifiedAt = Math.floor(Date.now() / 1000).toString();
	const signature = await signValue(verifiedAt, env.COOKIE_SECRET);
	const cookie = `${COOKIE_NAME}=${verifiedAt}.${signature}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`;

	return new Response(null, {
		status: 303,
		headers: {
			location: redirectTo,
			"set-cookie": cookie,
			"cache-control": "no-store",
		},
	});
}
