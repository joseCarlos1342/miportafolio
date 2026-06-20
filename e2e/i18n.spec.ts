import { test, expect } from "@playwright/test";

async function clearStorageAndGoto(page: import("@playwright/test").Page) {
	await page.context().clearCookies();
	await page.goto("/");
	await page.evaluate(() => localStorage.clear());
	await page.goto("/");
}

test.describe("Language toggle (i18n)", () => {
	test.beforeEach(async ({ page }) => {
		await clearStorageAndGoto(page);
	});

	test("defaults to Spanish", async ({ page }) => {
		await expect(page.locator("html")).toHaveAttribute("lang", "es");
		await expect(page.locator("#languageToggle")).toHaveText("EN");
		await expect(page.locator("#projects-title")).toHaveText(
			"Proyectos reales con interfaz, lógica de negocio y despliegue."
		);
	});

	test("switches to English and back to Spanish", async ({ page }) => {
		const toggle = page.locator("#languageToggle");

		await toggle.click();
		await expect(page.locator("html")).toHaveAttribute("lang", "en");
		await expect(toggle).toHaveText("ES");
		await expect(page.locator("#projects-title")).toHaveText(
			"Real projects with interface, business logic and deployment."
		);
		await expect(page.locator("#contact-title")).toHaveText("Let's talk about your next idea.");

		await toggle.click();
		await expect(page.locator("html")).toHaveAttribute("lang", "es");
		await expect(toggle).toHaveText("EN");
		await expect(page.locator("#projects-title")).toHaveText(
			"Proyectos reales con interfaz, lógica de negocio y despliegue."
		);
	});

	test("persists the chosen language in localStorage", async ({ page }) => {
		await page.locator("#languageToggle").click();
		expect(await page.evaluate(() => localStorage.getItem("lang"))).toBe("en");
	});

	test("restores English on reload after persisting", async ({ page }) => {
		await page.locator("#languageToggle").click();
		await expect(page.locator("html")).toHaveAttribute("lang", "en");

		await page.reload();
		await page.waitForFunction(() => document.documentElement.lang === "en");
		await expect(page.locator("html")).toHaveAttribute("lang", "en");
		await expect(page.locator("#languageToggle")).toHaveText("ES");
	});

	test("updates aria-labels on toggle", async ({ page }) => {
		const nav = page.locator('nav[aria-label]');
		await expect(nav).toHaveAttribute("aria-label", "Navegación principal");

		await page.locator("#languageToggle").click();
		await expect(nav).toHaveAttribute("aria-label", "Main navigation");
	});

	test("the skip link is always in Spanish (excluded from i18n)", async ({ page }) => {
		const skip = page.locator(".skip-link");
		await expect(skip).toHaveText("Saltar al contenido");

		await page.locator("#languageToggle").click();
		await expect(skip).toHaveText("Saltar al contenido");
	});
});
