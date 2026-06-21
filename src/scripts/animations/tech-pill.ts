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

export async function initTechPills() {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const gsap = await loadGsap();
	if (!gsap) return;
	document.querySelectorAll<HTMLElement>(".tech-pill").forEach((element) => {
		element.addEventListener("pointerenter", () => {
			gsap.to(element, { y: -4, scale: 1.025, duration: 0.28, ease: "power2.out" });
			gsap.to(element.querySelector(".tech-logo"), {
				rotate: -6,
				scale: 1.08,
				duration: 0.28,
				ease: "back.out(2)",
			});
		});
		element.addEventListener("pointerleave", () => {
			gsap.to(element, { y: 0, scale: 1, duration: 0.32, ease: "power2.out" });
			gsap.to(element.querySelector(".tech-logo"), {
				rotate: 0,
				scale: 1,
				duration: 0.32,
				ease: "power2.out",
			});
		});
	});
}
