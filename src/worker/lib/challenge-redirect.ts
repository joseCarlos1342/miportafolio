export function withTurnstileReason(redirectTo: string, reason: string) {
	const url = new URL(redirectTo, "https://portfolio.local");
	url.searchParams.delete("turnstile");
	url.searchParams.set("turnstile", reason);
	return `${url.pathname}${url.search}${url.hash}`;
}

export function challengeRedirect(redirectTo: string, reason: string) {
	const cleanRedirect = withTurnstileReason(redirectTo, reason);

	return new Response(null, {
		status: 303,
		headers: {
			location: cleanRedirect,
			"cache-control": "no-store",
		},
	});
}
