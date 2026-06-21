import type { Locale } from "../types";

const LANG_KEY = "lang";

export function getStoredLocale(): Locale {
	return (localStorage.getItem(LANG_KEY) as Locale) === "en" ? "en" : "es";
}

export function setStoredLocale(locale: Locale) {
	localStorage.setItem(LANG_KEY, locale);
}

export function applyLocale(lang: Locale, root: HTMLElement) {
	root.lang = lang;
	document
		.querySelectorAll<HTMLElement>("[data-es][data-en]:not(.skip-link)")
		.forEach((node) => {
			const next = node.dataset[lang];
			if (next) node.textContent = next;
		});
	document
		.querySelectorAll<HTMLElement>("[data-i18n-aria-es][data-i18n-aria-en]")
		.forEach((node) => {
			const next = node.getAttribute(`data-i18n-aria-${lang}`);
			if (next) node.setAttribute("aria-label", next);
		});
	const langToggle = document.getElementById("languageToggle");
	if (langToggle) {
		langToggle.textContent = lang === "es" ? "EN" : "ES";
		const aria = lang === "es" ? "Cambiar idioma a inglés" : "Switch language to Spanish";
		langToggle.setAttribute("aria-label", aria);
	}
	const copyStatus = document.getElementById("copyStatus");
	if (copyStatus && copyStatus.dataset.visible === "true") {
		copyStatus.textContent =
			lang === "es" ? "Email copiado al portapapeles." : "Email copied to clipboard.";
	}
}

export function toggleLocale(root: HTMLElement): Locale {
	const next: Locale = root.lang === "es" ? "en" : "es";
	setStoredLocale(next);
	applyLocale(next, root);
	return next;
}
