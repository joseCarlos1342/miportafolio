export function getCookie(cookieHeader: string, name: string) {
	const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
	const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
	return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}
