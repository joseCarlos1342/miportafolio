async function loadGsap() {
	try {
		const mod = await import("gsap");
		return (mod as { gsap: { to: (target: Element, vars: Record<string, unknown>) => void } }).gsap;
	} catch {
		return null;
	}
}

export async function initMagnetic() {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const gsap = await loadGsap();
	if (!gsap) return;
	document.querySelectorAll<HTMLElement>(".magnetic").forEach((element) => {
		element.addEventListener("pointermove", (event) => {
			const rect = element.getBoundingClientRect();
			const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
			const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
			gsap.to(element, { x, y, scale: 1.035, duration: 0.35, ease: "power3.out" });
		});
		element.addEventListener("pointerleave", () => {
			gsap.to(element, {
				x: 0,
				y: 0,
				scale: 1,
				duration: 0.45,
				ease: "elastic.out(1, 0.45)",
			});
		});
	});
}
