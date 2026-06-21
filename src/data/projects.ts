import type { Project } from "../types";

const buildScreens = (folder: string, total: number) =>
	Array.from({ length: total }, (_, index) => {
		const path = `/projects/${folder}/preview-${index + 1}`;
		return {
			png: `${path}.png`,
			webp: `${path}.webp`,
			avif: `${path}.avif`,
		};
	});

export const projects: Project[] = [
	{
		id: "finance",
		folder: "mis-gastos",
		order: 0,
		stack: "React · Node.js · PostgreSQL · JWT/2FA",
		layout: "media-right",
		title: {
			es: "Mis Gastos Mensuales",
			en: "Monthly Expense Tracker",
		},
		description: {
			es: "Aplicación para llevar el control de ingresos, gastos y balance mensual. La experiencia está pensada para revisar movimientos, entender hábitos financieros y tomar decisiones sin perderse entre hojas de cálculo.",
			en: "An app for tracking income, expenses and monthly balance. The experience is designed to review movements, understand spending habits and make decisions without getting lost in spreadsheets.",
		},
		link: {
			repo: "https://github.com/joseCarlos1342/Mis_gastos_mensuales",
		},
		media: {
			kind: "images",
			screens: buildScreens("mis-gastos", 7),
			total: 7,
		},
	},
	{
		id: "game",
		folder: "mesa-primera",
		order: 1,
		stack: "Next.js · Colyseus · Supabase · Redis · WebRTC",
		layout: "video",
		title: {
			es: "Mesa de Primera",
			en: "Mesa de Primera",
		},
		description: {
			es: "Juego de cartas multijugador en tiempo real con motor autoritativo en servidor, PWA para jugadores, panel administrativo, Supabase con RLS, Redis para reconexión y WebRTC para comunicación en vivo.",
			en: "A real-time multiplayer card game with an authoritative server engine, player PWA, admin dashboard, Supabase with RLS, Redis reconnection support and WebRTC live communication.",
		},
		link: {
			repo: "https://github.com/joseCarlos1342/Mesa_primera",
		},
		media: {
			kind: "video",
			webm: "/projects/mesa-primera/demo-optimized.webm",
			mp4: "/projects/mesa-primera/demo-compatible.mp4",
		},
	},
	{
		id: "loans",
		folder: "prestamos",
		order: 2,
		stack: "Python · Flask · SQLite · AES-256 · Backups",
		layout: "media-right",
		title: {
			es: "Sistema de Préstamos Personales",
			en: "Personal Loan System",
		},
		description: {
			es: "Panel para administrar clientes, préstamos, alertas, flujo de caja y control de riesgo. Está orientado a ordenar la operación diaria y dar visibilidad rápida al estado financiero del negocio.",
			en: "A dashboard for managing clients, loans, alerts, cash flow and risk control. It is focused on organizing daily operations and giving quick visibility into the financial state of the business.",
		},
		link: {
			repo: "https://github.com/joseCarlos1342/Sistema_prestamos_personales",
		},
		media: {
			kind: "images",
			screens: buildScreens("prestamos", 7),
			total: 7,
		},
	},
];
