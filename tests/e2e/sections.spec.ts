import { test, expect } from "@playwright/test";

test.describe("Sections and navigation", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("renders the hero with the name and CTAs", async ({ page }) => {
		await expect(page.locator("h1")).toContainText("José Carlos");
		await expect(page.locator("h1")).toContainText("Gómez R.");
		await expect(page.locator('#top a[href="#projects"]')).toHaveText("Ver proyectos");
		await expect(page.locator('#top a[href="https://www.linkedin.com/in/josecarlos-gomez-ing"]')).toBeVisible();
		await expect(page.locator('#top a[href="/__download-cv"]').first()).toBeVisible();
	});

	test("renders the about section", async ({ page }) => {
		await expect(page.locator("#about-title")).toBeVisible();
		await expect(page.locator("#about-title")).toContainText("Desarrollo con enfoque práctico");
	});

	test("renders the skills section with four categories", async ({ page }) => {
		await expect(page.locator("#skills-title")).toBeVisible();
		const cards = page.locator("#skills .reveal h3");
		await expect(cards).toHaveCount(4);
		await expect(cards.nth(0)).toHaveText("Frontend");
		await expect(cards.nth(1)).toHaveText("Backend");
		await expect(cards.nth(2)).toHaveText("Datos y cloud");
		await expect(cards.nth(3)).toHaveText("Seguridad");
	});

	test("renders three project cards", async ({ page }) => {
		await expect(page.locator("#projects-title")).toBeVisible();
		await expect(page.locator("#finance-title")).toHaveText("Mis Gastos Mensuales");
		await expect(page.locator("#game-title")).toHaveText("Mesa de Primera");
		await expect(page.locator("#loans-title")).toHaveText("Sistema de Préstamos Personales");
	});

	test("renders the education section", async ({ page }) => {
		await expect(page.locator("#education-title")).toBeVisible();
		await expect(page.locator("#education-title")).toContainText("Base académica");
		await expect(page.locator(".education-feature h3").first()).toHaveText("Ingeniería de Software");
	});

	test("renders the contact section with channels", async ({ page }) => {
		await expect(page.locator("#contact-title")).toBeVisible();
		await expect(page.locator('#contact a[href="https://www.linkedin.com/in/josecarlos-gomez-ing"]')).toBeVisible();
		await expect(page.locator('#contact a[href="https://github.com/joseCarlos1342"]')).toBeVisible();
	});

	test("renders the footer with the copyright", async ({ page }) => {
		await expect(page.locator("footer")).toContainText("© 2026 José Carlos Gómez R.");
	});

	test("header nav links scroll to the right sections (desktop)", async ({ page, isMobile }) => {
		test.skip(isMobile, "desktop nav links are hidden on mobile");
		await page.locator('header a[href="#projects"]').click();
		await expect(page.locator("#projects")).toBeInViewport();
		await page.locator('header a[href="#skills"]').click();
		await expect(page.locator("#skills")).toBeInViewport();
		await page.locator('header a[href="#contact"]').click();
		await expect(page.locator("#contact")).toBeInViewport();
	});

	test("skip link is present and targets main", async ({ page }) => {
		const skip = page.locator(".skip-link");
		await expect(skip).toHaveAttribute("href", "#main");
		await expect(page.locator("#main")).toHaveId("main");
	});
});
