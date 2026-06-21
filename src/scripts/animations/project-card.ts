async function loadGsap() {
	try {
		const mod = await import("gsap");
		return mod.gsap as {
			to: (target: Element | null, vars: Record<string, unknown>) => void;
		};
	} catch {
		return null;
	}
}

export async function initProjectCardTilt() {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const gsap = await loadGsap();
	if (!gsap) return;
	document.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
		const panel = card.querySelector<HTMLElement>(".preview-panel");
		if (!panel) return;
		card.addEventListener("pointermove", (event) => {
			const rect = card.getBoundingClientRect();
			const px = (event.clientX - rect.left) / rect.width - 0.5;
			const py = (event.clientY - rect.top) / rect.height - 0.5;
			gsap.to(panel, {
				rotateY: px * 7,
				rotateX: py * -7,
				y: -8,
				duration: 0.45,
				ease: "power3.out",
				transformPerspective: 900,
			});
		});
		card.addEventListener("pointerleave", () => {
			gsap.to(panel, {
				rotateY: 0,
				rotateX: 0,
				y: 0,
				duration: 0.65,
				ease: "elastic.out(1, 0.5)",
			});
		});
	});
}
