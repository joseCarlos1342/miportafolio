import { escapeHtml } from "../lib/escape-html";
import { challengeStyles } from "../lib/challenge-styles";

export function renderEmailPage(email: string) {
	const safeEmail = escapeHtml(email);
	const mailto = `mailto:${safeEmail}`;
	const styles = challengeStyles();

	return `<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="robots" content="noindex" />
		<title>Email de contacto</title>
		<style>
			${styles}

			main { width: min(100%, 500px); }
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
