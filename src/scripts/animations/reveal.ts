type GsapStatic = {
	set: (target: unknown, vars: Record<string, unknown>) => void;
	to: (target: unknown, vars: Record<string, unknown>) => void;
	fromTo: (target: unknown, from: Record<string, unknown>, to: Record<string, unknown>) => void;
};

async function loadGsap(): Promise<GsapStatic | null> {
	try {
		const mod = (await import("gsap")) as unknown as { gsap: GsapStatic };
		return mod.gsap;
	} catch {
		return null;
	}
}

function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function revealAll() {
	document
		.querySelectorAll<HTMLElement>(".reveal")
		.forEach((element) => element.classList.add("is-visible"));
}

const CHILD_SELECTOR = ".cp, .channel, .legend-group, .site, .reading, .about__layer";

export async function initRevealAnimations() {
	if (prefersReducedMotion()) {
		revealAll();
		return;
	}
	const gsap = await loadGsap();
	if (!gsap) {
		revealAll();
		return;
	}

	const reveal = (element: HTMLElement) => {
		element.classList.add("is-visible");
		gsap.to(element, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
		const children = element.querySelectorAll(CHILD_SELECTOR);
		if (children.length) {
			gsap.fromTo(
				children,
				{ opacity: 0, y: 18 },
				{ opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.1 },
			);
		}
	};

	gsap.set(".reveal", { opacity: 0, y: 26 });

	// Hero reveals immediately on load
	document
		.querySelectorAll<HTMLElement>("#top .reveal")
		.forEach((element, index) => {
			element.classList.add("is-visible");
			gsap.fromTo(
				element,
				{ opacity: 0, y: 26 },
				{ opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.08 * index },
			);
		});

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				reveal(entry.target as HTMLElement);
				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
	);

	document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
		if (element.closest("#top")) return;
		observer.observe(element);
	});
}
