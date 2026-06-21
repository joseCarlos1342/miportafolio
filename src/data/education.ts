import type { Education, EducationStat } from "../types";

export const educationStats: EducationStat[] = [
	{ value: "4", label: { es: "rutas", en: "tracks" } },
	{ value: "B2", label: { es: "inglés", en: "English" } },
	{ value: "IT", label: { es: "enfoque", en: "focus" } },
];

export const education: Education[] = [
	{
		id: "undergraduate",
		kind: "feature",
		logo: "/education/universidad.png",
		eyebrow: {
			es: "Pregrado en curso",
			en: "Undergraduate in progress",
		},
		title: {
			es: "Ingeniería de Software",
			en: "Software Engineering",
		},
		body: {
			es: "Corporación Universitaria Minuto de Dios. Base formal para diseño de software, arquitectura, datos y construcción de soluciones web.",
			en: "Corporación Universitaria Minuto de Dios. Formal foundation for software design, architecture, data and web solution development.",
		},
	},
	{
		id: "cisco",
		kind: "card",
		logo: "/education/cisco.png",
		title: { es: "Cisco / Python Institute", en: "Cisco / Python Institute" },
		body: {
			es: "Python Essentials 1 & 2 y ruta de Cybersecurity para reforzar lógica, scripting y fundamentos de seguridad.",
			en: "Python Essentials 1 & 2 and Cybersecurity track to reinforce logic, scripting and security fundamentals.",
		},
	},
	{
		id: "sena",
		kind: "card",
		logo: "/education/sena.png",
		title: { es: "SENA", en: "SENA" },
		body: {
			es: "Variables, estructuras de control en Python y análisis exploratorio de datos para trabajar con información de forma más clara.",
			en: "Variables, Python control structures and exploratory data analysis to work with information more clearly.",
		},
	},
	{
		id: "english",
		kind: "card",
		logo: "/education/sena.png",
		title: { es: "Inglés B2", en: "B2 English" },
		body: {
			es: "English for IT y English Does Work niveles 1-7 para documentación técnica, comunicación y aprendizaje continuo.",
			en: "English for IT and English Does Work levels 1-7 for technical documentation, communication and continuous learning.",
		},
	},
];
