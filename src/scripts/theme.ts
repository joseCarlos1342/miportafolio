export type Theme = "light" | "dark";
const THEME_KEY = "theme";

export function getStoredTheme(fallback: Theme): Theme {
	const stored = localStorage.getItem(THEME_KEY);
	if (stored === "light" || stored === "dark") return stored;
	return fallback;
}

export function applyTheme(theme: Theme, root: HTMLElement) {
	root.classList.toggle("dark", theme === "dark");
	root.dataset.theme = theme;
	localStorage.setItem(THEME_KEY, theme);
	const toggle = document.getElementById("themeToggle");
	if (toggle) toggle.setAttribute("aria-pressed", String(theme === "dark"));
	const label = toggle?.querySelector<HTMLElement>(".theme-label");
	if (label) label.textContent = theme === "dark" ? "Light" : "Dark";
}

export function toggleTheme(root: HTMLElement): Theme {
	const next: Theme = root.classList.contains("dark") ? "light" : "dark";
	applyTheme(next, root);
	return next;
}
