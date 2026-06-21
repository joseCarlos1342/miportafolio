type CarouselSlide = {
	avif: string;
	webp: string;
	png: string;
	alt: string;
};

type LightboxItem = CarouselSlide;

type OpenPreview = {
	type: "image" | "video";
	src?: string;
	webm?: string;
	items?: LightboxItem[];
	index?: number;
	label?: string;
};

let lightboxItems: LightboxItem[] = [];
let lightboxIndex = 0;

function getDialogRefs() {
	return {
		dialog: document.getElementById("previewDialog") as HTMLDialogElement | null,
		title: document.getElementById("previewDialogTitle"),
		media: document.getElementById("previewDialogMedia"),
		prev: document.getElementById("previewDialogPrev") as HTMLButtonElement | null,
		next: document.getElementById("previewDialogNext") as HTMLButtonElement | null,
		count: document.getElementById("previewDialogCount"),
		close: document.getElementById("previewDialogClose"),
	};
}

function setDialogControls(visible: boolean) {
	const { prev, next, count } = getDialogRefs();
	[prev, next, count].forEach((element) => {
		if (element) element.hidden = !visible;
	});
}

function renderLightboxImage() {
	const { media, count } = getDialogRefs();
	if (!media || lightboxItems.length === 0) return;
	const item = lightboxItems[lightboxIndex];
	const picture = document.createElement("picture");
	const avif = document.createElement("source");
	avif.srcset = item.avif;
	avif.type = "image/avif";
	const webp = document.createElement("source");
	webp.srcset = item.webp;
	webp.type = "image/webp";
	const image = document.createElement("img");
	image.src = item.png;
	image.alt = item.alt || "Preview";
	picture.appendChild(avif);
	picture.appendChild(webp);
	picture.appendChild(image);
	media.replaceChildren(picture);
	if (count) count.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
}

function moveLightbox(step: number) {
	if (lightboxItems.length === 0) return;
	lightboxIndex = (lightboxIndex + step + lightboxItems.length) % lightboxItems.length;
	renderLightboxImage();
}

export function openPreview({ type, src, webm, items = [], index = 0, label }: OpenPreview) {
	const { dialog, title, media } = getDialogRefs();
	if (!dialog || !media) return;
	media.replaceChildren();
	if (title) title.textContent = label || "Preview";

	if (type === "video") {
		setDialogControls(false);
		lightboxItems = [];
		const video = document.createElement("video");
		if (webm) {
			const webmSource = document.createElement("source");
			webmSource.src = webm;
			webmSource.type = "video/webm";
			video.appendChild(webmSource);
		}
		const mp4Source = document.createElement("source");
		mp4Source.src = src ?? "";
		mp4Source.type = "video/mp4";
		video.appendChild(mp4Source);
		video.controls = true;
		video.autoplay = true;
		video.muted = true;
		video.loop = true;
		video.playsInline = true;
		media.appendChild(video);
		video.play().catch(() => undefined);
	} else {
		lightboxItems = items;
		lightboxIndex = index;
		setDialogControls(lightboxItems.length > 1);
		renderLightboxImage();
	}

	dialog.showModal();
}

export function initLightbox() {
	const { dialog, prev, next, close } = getDialogRefs();
	prev?.addEventListener("click", () => moveLightbox(-1));
	next?.addEventListener("click", () => moveLightbox(1));
	dialog?.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") moveLightbox(-1);
		if (event.key === "ArrowRight") moveLightbox(1);
	});
	close?.addEventListener("click", () => dialog?.close());
	dialog?.addEventListener("click", (event) => {
		if (event.target === dialog) dialog.close();
	});
	const { media } = getDialogRefs();
	dialog?.addEventListener("close", () => media?.replaceChildren());
}
