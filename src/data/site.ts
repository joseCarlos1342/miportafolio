import type { SiteConfig } from "../types";

export const site: SiteConfig = {
	url: "https://portafoliojosecarlos.com",
	title: "José Carlos Gómez R. | Ingeniero de Software Full-Stack",
	description:
		"Portafolio de José Carlos Gómez R., ingeniero Full-Stack especializado en React, Next.js, Python, PostgreSQL y Supabase.",
	socialDescription:
		"Proyectos Full-Stack con seguridad, tiempo real, datos y experiencias web modernas listas para producción.",
	socialImage: "https://portafoliojosecarlos.com/og-image.png?v=2",
	ogImageWidth: 1200,
	ogImageHeight: 630,
	keywords:
		"José Carlos Gómez, ingeniero de software, desarrollador full-stack, React, Next.js, Astro, Node.js, Python, Flask, PostgreSQL, Supabase, Redis, portafolio desarrollador Colombia",
	locale: "es-CO",
	author: "José Carlos Gómez R.",
	applicationName: "Portafolio José Carlos Gómez R.",
	social: {
		linkedin: "https://www.linkedin.com/in/josecarlos-gomez-ing",
		github: "https://github.com/joseCarlos1342",
	},
	protected: {
		emailPath: "/__contact-email",
		downloadCvPath: "/__download-cv",
	},
};
