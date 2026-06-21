import { test, expect } from "@playwright/test";

test.describe("Project carousels and lightbox", () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => localStorage.clear());
		await page.goto("/");
	});

	test("advances and rewinds the finance carousel", async ({ page }) => {
		const carousel = page.locator("[data-carousel]").first();
		const current = carousel.locator("[data-carousel-current]");
		await expect(current).toHaveText("1");

		await carousel.locator(".carousel-next").click();
		await expect(current).toHaveText("2");

		await carousel.locator(".carousel-prev").click();
		await expect(current).toHaveText("1");
	});

	test("wraps around at the end of the carousel", async ({ page }) => {
		const carousel = page.locator("[data-carousel]").first();
		const current = carousel.locator("[data-carousel-current]");
		await expect(current).toHaveText("1");
		await carousel.locator(".carousel-prev").click();
		await expect(current).toHaveText("7");
	});

	test("opens the lightbox dialog with the project label and closes it", async ({ page }) => {
		const carousel = page.locator("[data-carousel]").first();
		const dialog = page.locator("#previewDialog");
		await expect(dialog).not.toHaveAttribute("open", "");

		await carousel.locator(".preview-expand").click();
		await expect(dialog).toHaveAttribute("open", "");
		await expect(page.locator("#previewDialogTitle")).toHaveText("Mis Gastos Mensuales");

		await page.locator("#previewDialogClose").click();
		await expect(dialog).not.toHaveAttribute("open", "");
	});

	test("navigates inside the lightbox with prev/next", async ({ page }) => {
		const carousel = page.locator("[data-carousel]").first();
		await carousel.locator(".preview-expand").click();
		const count = page.locator("#previewDialogCount");
		await expect(count).toHaveText("1 / 7");

		await page.locator("#previewDialogNext").click();
		await expect(count).toHaveText("2 / 7");

		await page.locator("#previewDialogPrev").click();
		await expect(count).toHaveText("1 / 7");
	});

	test("project GitHub links point to the right repositories", async ({ page }) => {
		await expect(page.locator("#projects a[href='https://github.com/joseCarlos1342/Mis_gastos_mensuales']")).toBeVisible();
		await expect(page.locator("#projects a[href='https://github.com/joseCarlos1342/Mesa_primera']")).toBeVisible();
		await expect(page.locator("#projects a[href='https://github.com/joseCarlos1342/Sistema_prestamos_personales']")).toBeVisible();
	});
});
