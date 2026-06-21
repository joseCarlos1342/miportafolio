const CSS_TOKENS = `:root {
	color-scheme: light;
	--ink: #1d1d1f;
	--muted: #6e6e73;
	--canvas: #f5f5f7;
	--panel: #ffffff;
	--primary: #0066cc;
	--hairline: rgba(0, 0, 0, 0.1);
}`;

const SHARED_RESET = `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; background: var(--canvas); color: var(--ink); font-family: SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; }
main { width: min(100%, 460px); padding: 40px; border: 1px solid var(--hairline); border-radius: 28px; background: var(--panel); text-align: center; }
h1 { margin: 0; font-size: clamp(32px, 7vw, 48px); line-height: 1.05; letter-spacing: -0.045em; }
p { margin: 18px 0 28px; color: var(--muted); font-size: 17px; line-height: 1.47; }`;

export function challengeStyles() {
	return `${CSS_TOKENS}\n${SHARED_RESET}`;
}
