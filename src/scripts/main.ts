import { applyLocale, getStoredLocale, toggleLocale } from "./i18n";
import { applyTheme, getStoredTheme, toggleTheme } from "./theme";
import { initCarousels } from "./carousel";
import { initLightbox } from "./lightbox";
import { initProjectVideos } from "./project-video";
import { initRevealAnimations } from "./animations/reveal";
import { initMagnetic } from "./animations/magnetic";
import { initTechPills } from "./animations/tech-pill";
import { initProjectCardTilt } from "./animations/project-card";

async function loadGsap() {
	try {
		const mod = await import("gsap");
		return (mod as { gsap: { fromTo: (t: string, f: Record<string, unknown>, to: Record<string, unknown>) => void } }).gsap;
	} catch {
		return null;
	}
}

export async function initClient() {
	if (typeof window === "undefined") return;
	const root = document.documentElement;
	window.addEventListener("pageshow", () => window.scrollTo(0, 0), { once: true });

	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const initialLocale = getStoredLocale();
	applyLocale(initialLocale, root);
	const initialTheme = getStoredTheme(
		root.classList.contains("dark") ? "dark" : "light",
	);
	applyTheme(initialTheme, root);

	const langToggle = document.getElementById("languageToggle");
	const themeToggle = document.getElementById("themeToggle");

	langToggle?.addEventListener("click", async () => {
		toggleLocale(root);
		if (!reduceMotion) {
			const gsap = await loadGsap();
			gsap?.fromTo(
				"[data-es][data-en]:not(.skip-link)",
				{ opacity: 0.65, y: 3 },
				{ opacity: 1, y: 0, duration: 0.22, stagger: 0.004, ease: "power2.out" },
			);
		}
	});

	themeToggle?.addEventListener("click", async () => {
		toggleTheme(root);
		if (!reduceMotion) {
			const gsap = await loadGsap();
			gsap?.fromTo(
				"body",
				{ opacity: 0.94 },
				{ opacity: 1, duration: 0.24, ease: "power2.out" },
			);
		}
	});

	initCarousels();
	initLightbox();
	initProjectVideos();
	initMagnetic();
	initTechPills();
	initProjectCardTilt();
	await initRevealAnimations();
}
