// Signature: a living topographic contour field drawn on canvas.
// Degrades to the static SVG contours when JS is off or reduced-motion is set.

type Colors = { line: string; index: string };

function readColors(): Colors {
	const style = getComputedStyle(document.documentElement);
	return {
		line: style.getPropertyValue("--contour").trim() || "#b3b9a7",
		index: style.getPropertyValue("--contour-index").trim() || "#949e8a",
	};
}

export function initContourField() {
	const el = document.getElementById("contourField") as HTMLCanvasElement | null;
	if (!el) return;
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	const context = el.getContext("2d");
	if (!context) return;

	const canvas = el;
	const ctx = context;

	let colors = readColors();
	let width = 0;
	let height = 0;
	let dpr = Math.min(window.devicePixelRatio || 1, 2);

	// pointer parallax (damped)
	let targetX = 0;
	let targetY = 0;
	let curX = 0;
	let curY = 0;
	let raf = 0;

	const RINGS = 15;
	const SAMPLES = 88;

	function resize() {
		const rect = canvas.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function draw(t: number) {
		ctx.clearRect(0, 0, width, height);
		curX += (targetX - curX) * 0.045;
		curY += (targetY - curY) * 0.045;

		const cx = width * 0.68 + curX * 40;
		const cy = height * 0.46 + curY * 30;
		const baseR = Math.min(width, height) * 0.05;
		const step = Math.min(width, height) * 0.052;
		const time = t * 0.00016;

		for (let i = 0; i < RINGS; i++) {
			const rBase = baseR + i * step;
			const isIndex = i % 5 === 0;
			ctx.beginPath();
			for (let s = 0; s <= SAMPLES; s++) {
				const a = (s / SAMPLES) * Math.PI * 2;
				const wobble =
					Math.sin(a * 3 + time * 1.6 + i * 0.35) * (5 + i * 0.9) +
					Math.sin(a * 2 - time * 1.1 + i * 0.2) * (7 + i * 0.6) +
					Math.sin(a * 5 + time * 0.7) * 2.4;
				const r = rBase + wobble;
				const x = cx + Math.cos(a) * r;
				const y = cy + Math.sin(a) * r * 0.72;
				if (s === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.closePath();
			ctx.strokeStyle = isIndex ? colors.index : colors.line;
			ctx.globalAlpha = isIndex ? 0.9 : 0.62;
			ctx.lineWidth = isIndex ? 1.4 : 1;
			ctx.stroke();
		}
		ctx.globalAlpha = 1;
		raf = requestAnimationFrame(draw);
	}

	const onPointer = (e: PointerEvent) => {
		targetX = (e.clientX / window.innerWidth - 0.5) * 2;
		targetY = (e.clientY / window.innerHeight - 0.5) * 2;
	};

	const themeObserver = new MutationObserver(() => {
		colors = readColors();
	});

	resize();
	canvas.classList.add("is-live");
	window.addEventListener("resize", resize, { passive: true });
	window.addEventListener("pointermove", onPointer, { passive: true });
	themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

	// Pause when off-screen to save cycles
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && !raf) {
					raf = requestAnimationFrame(draw);
				} else if (!entry.isIntersecting && raf) {
					cancelAnimationFrame(raf);
					raf = 0;
				}
			}
		},
		{ threshold: 0 },
	);
	io.observe(canvas);
}
