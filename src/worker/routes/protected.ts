import { PROTECTED_CV_PATH, type Env } from "../types";

export async function handleContactEmail(env: Env): Promise<Response> {
	const { renderEmailPage } = await import("../pages/email");
	return new Response(renderEmailPage(env.CONTACT_EMAIL), {
		headers: {
			"content-type": "text/html; charset=utf-8",
			"cache-control": "no-store",
		},
	});
}

export async function handleDownloadCv(
	request: Request,
	env: Env,
): Promise<Response> {
	const url = new URL(request.url);
	url.pathname = PROTECTED_CV_PATH;
	url.search = "";

	const response = await env.ASSETS.fetch(new Request(url, request));
	const headers = new Headers(response.headers);
	headers.set("content-type", "application/pdf");
	headers.set(
		"content-disposition",
		'attachment; filename="cv-jose-carlos-gomez.pdf"',
	);
	headers.set("cache-control", "private, max-age=0, must-revalidate");

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
