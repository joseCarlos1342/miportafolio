import { CONTACT_EMAIL_PATH, DOWNLOAD_CV_PATH, PROTECTED_CV_PATH } from "../types";

export function isProtectedPath(pathname: string) {
	return (
		pathname === CONTACT_EMAIL_PATH ||
		pathname === DOWNLOAD_CV_PATH ||
		pathname === PROTECTED_CV_PATH
	);
}
