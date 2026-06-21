export interface Env {
	ASSETS: Fetcher;
	PUBLIC_TURNSTILE_SITE_KEY: string;
	TURNSTILE_SECRET_KEY: string;
	COOKIE_SECRET: string;
	CONTACT_EMAIL: string;
}

export const COOKIE_NAME = "portfolio_turnstile_verified";
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
export const VERIFY_PATH = "/__turnstile-verify";
export const CONTACT_EMAIL_PATH = "/__contact-email";
export const DOWNLOAD_CV_PATH = "/__download-cv";
export const PROTECTED_CV_PATH = "/docs/cv-jose-carlos-gomez.pdf";
export const TURNSTILE_SITEVERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";
