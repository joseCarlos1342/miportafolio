import { openPreview } from "./lightbox";

function playProjectVideo(video: HTMLVideoElement) {
	video.muted = true;
	video.playsInline = true;
	video.play().catch(() => {
		video.controls = true;
	});
}

export function initProjectVideos() {
	const videos = document.querySelectorAll<HTMLVideoElement>(".project-video");
	videos.forEach((video) => {
		video.addEventListener("loadedmetadata", () => playProjectVideo(video), {
			once: true,
		});
		video.addEventListener("pointerenter", () => playProjectVideo(video));
	});

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) playProjectVideo(entry.target as HTMLVideoElement);
			});
		},
		{ threshold: 0.35 },
	);
	videos.forEach((video) => observer.observe(video));

	document
		.querySelectorAll<HTMLButtonElement>(".preview-expand[data-lightbox-type='video']")
		.forEach((button) => {
			button.addEventListener("click", () =>
				openPreview({
					type: "video",
					src: button.dataset.lightboxSrc,
					webm: button.dataset.lightboxWebm,
					label: button.dataset.lightboxLabel,
				}),
			);
		});
}
