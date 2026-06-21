type GsapTimeline = {
	to: (
		target: ElementSelector,
		vars: Record<string, unknown>,
		position?: string | number,
	) => GsapTimeline;
	fromTo: (
		target: ElementSelector,
		from: Record<string, unknown>,
		to: Record<string, unknown>,
		position?: string | number,
	) => GsapTimeline;
	set: (target: ElementSelector, vars: Record<string, unknown>) => void;
};

type GsapStatic = {
	set: (target: ElementSelector, vars: Record<string, unknown>) => void;
	timeline: (opts?: Record<string, unknown>) => GsapTimeline;
	to: (target: ElementSelector, vars: Record<string, unknown>) => void;
	fromTo: (
		target: ElementSelector,
		from: Record<string, unknown>,
		to: Record<string, unknown>,
	) => void;
};

type ElementSelector = string | Element | Element[] | NodeList;

type GsapModule = { gsap: GsapStatic };

async function loadGsap(): Promise<GsapStatic | null> {
	try {
		const mod = (await import("gsap")) as unknown as GsapModule;
		return mod.gsap;
	} catch {
		return null;
	}
}

function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setRevealTargetsToVisible() {
	document
		.querySelectorAll<HTMLElement>(".reveal")
		.forEach((element) => element.classList.add("is-visible"));
}

function prepareHeadings() {
	document.querySelectorAll<HTMLElement>("h1, h2").forEach((heading) => {
		if (heading.dataset.textPrepared === "true") return;
		const html = heading.innerHTML;
		heading.dataset.textPrepared = "true";
		heading.innerHTML = `<span class="text-reveal-line"><span>${html}</span></span>`;
	});
}

export async function initRevealAnimations() {
	if (prefersReducedMotion()) {
		setRevealTargetsToVisible();
		return;
	}
	const gsap = await loadGsap();
	if (!gsap) {
		setRevealTargetsToVisible();
		return;
	}
	prepareHeadings();
	gsap.set(".reveal", { opacity: 0, y: 42 });
	gsap.set(".text-reveal-line > span", { yPercent: 110, opacity: 0 });
	gsap
		.timeline({ defaults: { ease: "power3.out" } })
		.to("header", { y: 0, opacity: 1, duration: 0.55 })
		.to(
			"#top .reveal",
			{ opacity: 1, y: 0, duration: 0.9, stagger: 0.16 },
			"-=0.2",
		)
		.to(
			"#top .text-reveal-line > span",
			{ yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
			"-=0.9",
		)
		.fromTo(
			"#top .preview-panel, #top [class*='shadow-[var(--shadow-product)]']",
			{ rotateX: 6, rotateY: -8, scale: 0.96 },
			{ rotateX: 0, rotateY: 0, scale: 1, duration: 1.1 },
			"-=0.85",
		);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const target = entry.target as HTMLElement;
				target.classList.add("is-visible");
				gsap.to(target, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" });
				gsap.to(target.querySelectorAll(".text-reveal-line > span"), {
					yPercent: 0,
					opacity: 1,
					duration: 0.75,
					stagger: 0.06,
					ease: "power3.out",
				});
				gsap.fromTo(
					target.querySelectorAll(
						".education-card, .education-stat, .contact-action, .project-card",
					),
					{ opacity: 0, y: 18 },
					{ opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
				);
				observer.unobserve(target);
			});
		},
		{ threshold: 0.18 },
	);
	document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => observer.observe(element));
}
