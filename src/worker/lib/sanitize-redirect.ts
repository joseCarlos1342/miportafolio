export function sanitizeRedirect(value: string) {
	if (!value.startsWith("/")) return "/";
	if (value.startsWith("//")) return "/";
	const url = new URL(value, "https://portfolio.local");
	url.searchParams.delete("turnstile");
	return `${url.pathname}${url.search}${url.hash}`;
}
