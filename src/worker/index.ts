import { CONTACT_EMAIL_PATH, VERIFY_PATH, type Env } from "./types";
import { handleTurnstileVerify } from "./routes/turnstile-verify";
import { handleContactEmail, handleDownloadCv } from "./routes/protected";
import { hasValidVerificationCookie } from "./lib/verification-cookie";
import { isProtectedPath } from "./lib/is-protected-path";
import { renderChallengePage } from "./pages/challenge";

export { isProtectedPath } from "./lib/is-protected-path";
export { renderChallengePage } from "./pages/challenge";
export { renderEmailPage } from "./pages/email";
export { sanitizeRedirect } from "./lib/sanitize-redirect";
export { escapeHtml } from "./lib/escape-html";
export { withTurnstileReason, challengeRedirect } from "./lib/challenge-redirect";
export { getCookie } from "./lib/cookie";
export { base64UrlEncode, timingSafeEqual, signValue } from "./lib/crypto";
export { hasValidVerificationCookie } from "./lib/verification-cookie";

export type { Env } from "./types";
export {
	COOKIE_NAME,
	COOKIE_MAX_AGE_SECONDS,
	VERIFY_PATH,
	CONTACT_EMAIL_PATH,
	DOWNLOAD_CV_PATH,
	PROTECTED_CV_PATH,
	TURNSTILE_SITEVERIFY_URL,
} from "./types";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === "POST" && url.pathname === VERIFY_PATH) {
			return handleTurnstileVerify(request, env);
		}

		if (isProtectedPath(url.pathname)) {
			if (await hasValidVerificationCookie(request, env)) {
				if (url.pathname === CONTACT_EMAIL_PATH) {
					return handleContactEmail(env);
				}
				return handleDownloadCv(request, env);
			}

			return new Response(
				renderChallengePage(env.PUBLIC_TURNSTILE_SITE_KEY, url.pathname + url.search),
				{
					status: 403,
					headers: {
						"content-type": "text/html; charset=utf-8",
						"cache-control": "no-store",
					},
				},
			);
		}

		return env.ASSETS.fetch(request);
	},
};
