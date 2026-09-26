import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.env.QA_URL || "http://localhost:4321/";
const outDir = ".impeccable/review";
mkdirSync(outDir, { recursive: true });

const shots = [
	{ name: "desktop-light", width: 1440, height: 900, theme: "light" },
	{ name: "desktop-dark", width: 1440, height: 900, theme: "dark" },
	{ name: "mobile-light", width: 390, height: 844, theme: "light" },
	{ name: "mobile-dark", width: 390, height: 844, theme: "dark" },
];

const browser = await chromium.launch();
for (const shot of shots) {
	const context = await browser.newContext({
		viewport: { width: shot.width, height: shot.height },
		deviceScaleFactor: 2,
		reducedMotion: "reduce",
	});
	const page = await context.newPage();
	await page.addInitScript((theme) => {
		localStorage.setItem("theme", theme);
		localStorage.setItem("lang", "es");
	}, shot.theme);
	await page.goto(base, { waitUntil: "networkidle" });
	await page.waitForTimeout(400);
	await page.screenshot({ path: `${outDir}/${shot.name}.png`, fullPage: true });
	// Also a first-viewport (hero) capture
	await page.screenshot({ path: `${outDir}/${shot.name}-hero.png`, fullPage: false });
	await context.close();
	console.log("captured", shot.name);
}
await browser.close();
