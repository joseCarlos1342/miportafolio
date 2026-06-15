interface Env {
	ASSETS: Fetcher;
	PUBLIC_TURNSTILE_SITE_KEY: string;
	TURNSTILE_SECRET_KEY: string;
	COOKIE_SECRET: string;
	CONTACT_EMAIL: string;
}

const COOKIE_NAME = 'portfolio_turnstile_verified';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const VERIFY_PATH = '/__turnstile-verify';
const CONTACT_EMAIL_PATH = '/__contact-email';
const PROTECTED_CV_PATH = '/docs/cv-jose-carlos-gomez.pdf';
const TURNSTILE_SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === 'POST' && url.pathname === VERIFY_PATH) {
			return verifyTurnstile(request, env);
		}

		if (isProtectedPath(url.pathname)) {
			if (await hasValidVerificationCookie(request, env)) {
				if (url.pathname === CONTACT_EMAIL_PATH) {
					return new Response(renderEmailPage(env.CONTACT_EMAIL), {
						headers: {
							'content-type': 'text/html; charset=utf-8',
							'cache-control': 'no-store',
						},
					});
				}

				return env.ASSETS.fetch(request);
			}

			return new Response(renderChallengePage(env.PUBLIC_TURNSTILE_SITE_KEY, url.pathname + url.search), {
				status: 403,
				headers: {
					'content-type': 'text/html; charset=utf-8',
					'cache-control': 'no-store',
				},
			});
		}

		return env.ASSETS.fetch(request);
	},
};

function isProtectedPath(pathname: string) {
	return pathname === CONTACT_EMAIL_PATH || pathname === PROTECTED_CV_PATH;
}

async function verifyTurnstile(request: Request, env: Env) {
	const formData = await request.formData();
	const token = String(formData.get('turnstile-token') || formData.get('cf-turnstile-response') || '');
	const redirectTo = sanitizeRedirect(String(formData.get('redirect') ?? '/'));

	if (!token) {
		return challengeRedirect(redirectTo, 'missing-token');
	}

	const siteverifyBody = new FormData();
	siteverifyBody.set('secret', env.TURNSTILE_SECRET_KEY);
	siteverifyBody.set('response', token);

	const remoteIp = request.headers.get('CF-Connecting-IP');
	if (remoteIp) {
		siteverifyBody.set('remoteip', remoteIp);
	}

	const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
		method: 'POST',
		body: siteverifyBody,
	});

	const result = await response.json<{ success?: boolean; hostname?: string }>();
	if (!result.success) {
		return challengeRedirect(redirectTo, 'verification-failed');
	}

	const verifiedAt = Math.floor(Date.now() / 1000).toString();
	const signature = await signValue(verifiedAt, env.COOKIE_SECRET);
	const cookie = `${COOKIE_NAME}=${verifiedAt}.${signature}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`;

	return new Response(null, {
		status: 303,
		headers: {
			location: redirectTo,
			'set-cookie': cookie,
			'cache-control': 'no-store',
		},
	});
}

function challengeRedirect(redirectTo: string, reason: string) {
	const cleanRedirect = withTurnstileReason(redirectTo, reason);

	return new Response(null, {
		status: 303,
		headers: {
			location: cleanRedirect,
			'cache-control': 'no-store',
		},
	});
}

function withTurnstileReason(redirectTo: string, reason: string) {
	const url = new URL(redirectTo, 'https://portfolio.local');
	url.searchParams.delete('turnstile');
	url.searchParams.set('turnstile', reason);
	return `${url.pathname}${url.search}${url.hash}`;
}

async function hasValidVerificationCookie(request: Request, env: Env) {
	const rawCookie = getCookie(request.headers.get('cookie') ?? '', COOKIE_NAME);
	if (!rawCookie) return false;

	const [verifiedAt, signature] = rawCookie.split('.');
	if (!verifiedAt || !signature) return false;

	const timestamp = Number(verifiedAt);
	const now = Math.floor(Date.now() / 1000);
	if (!Number.isFinite(timestamp) || now - timestamp > COOKIE_MAX_AGE_SECONDS) return false;

	const expectedSignature = await signValue(verifiedAt, env.COOKIE_SECRET);
	return timingSafeEqual(signature, expectedSignature);
}

function getCookie(cookieHeader: string, name: string) {
	const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
	const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
	return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

async function signValue(value: string, secret: string) {
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
	return base64UrlEncode(signature);
}

function base64UrlEncode(buffer: ArrayBuffer) {
	const bytes = new Uint8Array(buffer);
	let binary = '';
	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}

	return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function timingSafeEqual(a: string, b: string) {
	if (a.length !== b.length) return false;

	let mismatch = 0;
	for (let index = 0; index < a.length; index += 1) {
		mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
	}

	return mismatch === 0;
}

function sanitizeRedirect(value: string) {
	if (!value.startsWith('/')) return '/';
	if (value.startsWith('//')) return '/';
	const url = new URL(value, 'https://portfolio.local');
	url.searchParams.delete('turnstile');
	return `${url.pathname}${url.search}${url.hash}`;
}

function renderChallengePage(siteKey: string, redirectTo: string) {
	const safeRedirect = escapeHtml(sanitizeRedirect(redirectTo));
	const safeSiteKey = escapeHtml(siteKey);

	return `<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="robots" content="noindex" />
		<title>Verificacion de seguridad</title>
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
		<style>
			:root {
				color-scheme: light;
				--ink: #1d1d1f;
				--muted: #6e6e73;
				--canvas: #f5f5f7;
				--panel: #ffffff;
				--primary: #0066cc;
				--hairline: rgba(0, 0, 0, 0.1);
			}

			* { box-sizing: border-box; }

			body {
				margin: 0;
				min-height: 100vh;
				display: grid;
				place-items: center;
				padding: 24px;
				background: var(--canvas);
				color: var(--ink);
				font-family: SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
			}

			main {
				width: min(100%, 460px);
				padding: 40px;
				border: 1px solid var(--hairline);
				border-radius: 28px;
				background: var(--panel);
				text-align: center;
			}

			h1 {
				margin: 0;
				font-size: clamp(32px, 7vw, 48px);
				line-height: 1.05;
				letter-spacing: -0.045em;
			}

			p {
				margin: 18px 0 28px;
				color: var(--muted);
				font-size: 17px;
				line-height: 1.47;
			}

			.turnstile-wrap {
				display: flex;
				justify-content: center;
			}

			button {
				margin-top: 24px;
				border: 0;
				border-radius: 999px;
				background: var(--primary);
				color: white;
				padding: 12px 24px;
				font: inherit;
				cursor: pointer;
			}

			button:disabled {
				cursor: not-allowed;
				opacity: 0.52;
			}

			.error {
				margin: 18px 0 0;
				color: #b42318;
				font-size: 14px;
				line-height: 1.4;
			}

			@media (max-width: 480px) {
				main { padding: 32px 20px; }
			}
		</style>
	</head>
	<body>
		<main aria-labelledby="security-title">
			<h1 id="security-title">Un momento.</h1>
			<p>Verifica que eres una persona para acceder al portafolio de Jose Carlos.</p>
			<form id="turnstile-form" method="post" action="${VERIFY_PATH}">
				<input type="hidden" name="redirect" value="${safeRedirect}" />
				<input id="turnstile-token" type="hidden" name="turnstile-token" />
				<div class="turnstile-wrap">
					<div class="cf-turnstile" data-sitekey="${safeSiteKey}" data-theme="light" data-callback="onTurnstileSuccess" data-expired-callback="onTurnstileExpired" data-error-callback="onTurnstileExpired"></div>
				</div>
				<button id="continue-button" type="submit" disabled>Continuar</button>
				<p id="turnstile-error" class="error" hidden>No se pudo verificar. Recarga la pagina e intenta de nuevo.</p>
			</form>
		</main>
		<script>
			const form = document.getElementById('turnstile-form');
			const tokenInput = document.getElementById('turnstile-token');
			const continueButton = document.getElementById('continue-button');
			const errorMessage = document.getElementById('turnstile-error');

			window.onTurnstileSuccess = (token) => {
				tokenInput.value = token;
				continueButton.disabled = false;
				errorMessage.hidden = true;
			};

			window.onTurnstileExpired = () => {
				tokenInput.value = '';
				continueButton.disabled = true;
			};

			form.addEventListener('submit', (event) => {
				if (!tokenInput.value) {
					event.preventDefault();
					errorMessage.hidden = false;
				}
			});
		</script>
	</body>
</html>`;
}

function renderEmailPage(email: string) {
	const safeEmail = escapeHtml(email);
	const mailto = `mailto:${safeEmail}`;

	return `<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="robots" content="noindex" />
		<title>Email de contacto</title>
		<style>
			:root { color-scheme: light; --ink: #1d1d1f; --muted: #6e6e73; --canvas: #f5f5f7; --panel: #fff; --primary: #0066cc; --hairline: rgba(0, 0, 0, 0.1); }
			* { box-sizing: border-box; }
			body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; background: var(--canvas); color: var(--ink); font-family: SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; }
			main { width: min(100%, 500px); padding: 40px; border: 1px solid var(--hairline); border-radius: 28px; background: var(--panel); text-align: center; }
			h1 { margin: 0; font-size: clamp(32px, 7vw, 48px); line-height: 1.05; letter-spacing: -0.045em; }
			p { margin: 18px 0 28px; color: var(--muted); font-size: 17px; line-height: 1.47; }
			.email { display: block; margin: 0 0 24px; color: var(--ink); font-size: clamp(20px, 5vw, 28px); font-weight: 600; overflow-wrap: anywhere; }
			.actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
			a, button { min-height: 44px; border: 0; border-radius: 999px; padding: 12px 22px; font: inherit; text-decoration: none; cursor: pointer; }
			a { background: var(--primary); color: #fff; }
			button { background: #f5f5f7; color: var(--ink); }
			.status { min-height: 22px; margin: 18px 0 0; font-size: 14px; }
		</style>
	</head>
	<body>
		<main>
			<h1>Email de contacto.</h1>
			<p>Este dato esta protegido para reducir scraping automatizado.</p>
			<strong id="email" class="email">${safeEmail}</strong>
			<div class="actions">
				<a href="${mailto}">Abrir correo</a>
				<button id="copy" type="button">Copiar email</button>
				<a href="/#contact">Volver</a>
			</div>
			<p id="status" class="status" role="status" aria-live="polite"></p>
		</main>
		<script>
			const email = document.getElementById('email').textContent;
			const status = document.getElementById('status');
			document.getElementById('copy').addEventListener('click', async () => {
				try {
					await navigator.clipboard.writeText(email);
					status.textContent = 'Email copiado al portapapeles.';
				} catch {
					status.textContent = email;
				}
			});
		</script>
	</body>
</html>`;
}

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}
