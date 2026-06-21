import { VERIFY_PATH } from "../types";
import { escapeHtml } from "../lib/escape-html";
import { sanitizeRedirect } from "../lib/sanitize-redirect";
import { challengeStyles } from "../lib/challenge-styles";

export function renderChallengePage(siteKey: string, redirectTo: string) {
	const safeRedirect = escapeHtml(sanitizeRedirect(redirectTo));
	const safeSiteKey = escapeHtml(siteKey);
	const styles = challengeStyles();

	return `<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="robots" content="noindex" />
		<title>Verificacion de seguridad</title>
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
		<style>
			${styles}

			.turnstile-wrap { display: flex; justify-content: center; }
			button { margin-top: 24px; border: 0; border-radius: 999px; background: var(--primary); color: white; padding: 12px 24px; font: inherit; cursor: pointer; }
			button:disabled { cursor: not-allowed; opacity: 0.52; }
			.error { margin: 18px 0 0; color: #b42318; font-size: 14px; line-height: 1.4; }

			@media (max-width: 480px) { main { padding: 32px 20px; } }
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
			const form = document.getElementById("turnstile-form");
			const tokenInput = document.getElementById("turnstile-token");
			const continueButton = document.getElementById("continue-button");
			const errorMessage = document.getElementById("turnstile-error");

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
