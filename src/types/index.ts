export type Locale = "es" | "en";

export type Tech = {
	name: string;
	slug: string;
	color: string;
};

export type SkillGroup = {
	id: "frontend" | "backend" | "data" | "security";
	title: Record<Locale, string>;
	items: Tech[];
};

export type ProjectScreen = {
	png: string;
	webp: string;
	avif: string;
};

export type ProjectLink = {
	repo: string;
};

export type Project = {
	id: string;
	folder: string;
	stack: string;
	order: number;
	layout: "media-left" | "media-right" | "video";
	title: Record<Locale, string>;
	description: Record<Locale, string>;
	link: ProjectLink;
	media:
		| { kind: "images"; screens: ProjectScreen[]; total: number }
		| { kind: "video"; webm: string; mp4: string };
};

export type Education = {
	id: string;
	kind: "feature" | "card";
	logo: string;
	eyebrow?: Record<Locale, string>;
	title: Record<Locale, string>;
	body: Record<Locale, string>;
};

export type EducationStat = {
	value: string;
	label: Record<Locale, string>;
};

export type NavLink = {
	href: string;
	label: Record<Locale, string>;
};

export type SocialLink = {
	id: "linkedin" | "github";
	href: string;
	label: Record<Locale, string>;
};

export type SiteConfig = {
	url: string;
	title: string;
	description: string;
	socialDescription: string;
	socialImage: string;
	ogImageWidth: number;
	ogImageHeight: number;
	keywords: string;
	locale: string;
	author: string;
	applicationName: string;
	social: {
		linkedin: string;
		github: string;
	};
	protected: {
		emailPath: string;
		downloadCvPath: string;
	};
};

export type I18nNode = Record<string, string>;

export type I18nBundle = Record<Locale, I18nNode>;
