import { openPreview } from "./lightbox";

export function initCarousels() {
	document.querySelectorAll<HTMLElement>("[data-carousel]").forEach((carousel) => {
		const slides = Array.from(
			carousel.querySelectorAll<HTMLElement>("[data-slide]"),
		);
		const current = carousel.querySelector<HTMLElement>("[data-carousel-current]");
		const previous = carousel.querySelector<HTMLButtonElement>(".carousel-prev");
		const next = carousel.querySelector<HTMLButtonElement>(".carousel-next");
		const expand = carousel.querySelector<HTMLButtonElement>(".preview-expand");
		let activeIndex = 0;

		const showSlide = (index: number) => {
			activeIndex = (index + slides.length) % slides.length;
			slides.forEach((slide, slideIndex) => {
				slide.hidden = slideIndex !== activeIndex;
			});
			if (current) current.textContent = String(activeIndex + 1);
		};

		previous?.addEventListener("click", () => showSlide(activeIndex - 1));
		next?.addEventListener("click", () => showSlide(activeIndex + 1));
		expand?.addEventListener("click", () => {
			const items = slides.map((slide) => ({
				avif: slide.dataset.avif ?? "",
				webp: slide.dataset.webp ?? "",
				png: slide.dataset.png ?? "",
				alt: slide.dataset.alt ?? "",
			}));
			openPreview({
				type: "image",
				items,
				index: activeIndex,
				label: expand.dataset.lightboxLabel,
			});
		});
		showSlide(0);
	});
}
