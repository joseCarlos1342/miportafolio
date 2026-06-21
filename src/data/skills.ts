import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
	{
		id: "frontend",
		title: { es: "Frontend", en: "Frontend" },
		items: [
			{ name: "JavaScript", slug: "js", color: "#f7df1e" },
			{ name: "TypeScript", slug: "typescript", color: "#3178c6" },
			{ name: "React", slug: "react", color: "#61dafb" },
			{ name: "Next.js", slug: "nextjs", color: "#ffffff" },
			{ name: "Astro", slug: "astro", color: "#ff5d01" },
			{ name: "Tailwind CSS", slug: "tailwind", color: "#38bdf8" },
		],
	},
	{
		id: "backend",
		title: { es: "Backend", en: "Backend" },
		items: [
			{ name: "Node.js", slug: "nodejs", color: "#5fa04e" },
			{ name: "Express", slug: "express", color: "#ffffff" },
			{ name: "Python", slug: "python", color: "#3776ab" },
			{ name: "Flask", slug: "flask", color: "#000000" },
			{ name: "Microservicios", slug: "microservices", color: "#8b5cf6" },
		],
	},
	{
		id: "data",
		title: { es: "Datos y cloud", en: "Data and cloud" },
		items: [
			{ name: "PostgreSQL", slug: "postgresql", color: "#4169e1" },
			{ name: "Supabase", slug: "supabase", color: "#3ecf8e" },
			{ name: "Redis", slug: "redis", color: "#dc382d" },
			{ name: "SQLite", slug: "sqlite", color: "#003b57" },
			{ name: "Railway", slug: "railway", color: "#7c3aed" },
		],
	},
	{
		id: "security",
		title: { es: "Seguridad", en: "Security" },
		items: [
			{ name: "JWT", slug: "jwt", color: "#f97316" },
			{ name: "TOTP / 2FA", slug: "totp", color: "#14b8a6" },
			{ name: "AES-256", slug: "aes", color: "#64748b" },
			{ name: "Row Level Security", slug: "rls", color: "#3ecf8e" },
			{ name: "Linux Admin", slug: "linux", color: "#111827" },
		],
	},
];
