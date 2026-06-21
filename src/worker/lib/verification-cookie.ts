import { COOKIE_MAX_AGE_SECONDS, COOKIE_NAME, type Env } from "../types";
import { getCookie } from "./cookie";
import { signValue, timingSafeEqual } from "./crypto";

export async function hasValidVerificationCookie(request: Request, env: Env) {
	const rawCookie = getCookie(request.headers.get("cookie") ?? "", COOKIE_NAME);
	if (!rawCookie) return false;

	const [verifiedAt, signature] = rawCookie.split(".");
	if (!verifiedAt || !signature) return false;

	const timestamp = Number(verifiedAt);
	const now = Math.floor(Date.now() / 1000);
	if (!Number.isFinite(timestamp) || now - timestamp > COOKIE_MAX_AGE_SECONDS) return false;

	const expectedSignature = await signValue(verifiedAt, env.COOKIE_SECRET);
	return timingSafeEqual(signature, expectedSignature);
}
