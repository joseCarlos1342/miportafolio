import { test, expect } from "@playwright/test";

test.describe("Contact and protected routes", () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => localStorage.clear());
		await page.goto("/");
	});

	test("contact links point to the expected destinations", async ({ page }) => {
		const linkedin = page.locator('#contact a[href="https://www.linkedin.com/in/josecarlos-gomez-ing"]');
		const github = page.locator('#contact a[href="https://github.com/joseCarlos1342"]');
		const cv = page.locator('#contact a[href="/__download-cv"]');
		const email = page.locator('#contact a[href="/__contact-email"]');
		await expect(linkedin).toBeVisible();
		await expect(github).toBeVisible();
		await expect(cv).toBeVisible();
		await expect(email).toBeVisible();
	});

	test("the CV link targets the protected download route", async ({ page }) => {
		const cvHref = await page.locator('#contact a[href="/__download-cv"]').first().getAttribute("href");
		expect(cvHref).toBe("/__download-cv");
	});

	test("the email button targets the protected email route", async ({ page }) => {
		const emailHref = await page.locator('#contact a[href="/__contact-email"]').getAttribute("href");
		expect(emailHref).toBe("/__contact-email");
	});

	test("copy status region is present for live updates", async ({ page }) => {
		const status = page.locator("#copyStatus");
		await expect(status).toHaveAttribute("role", "status");
		await expect(status).toHaveAttribute("aria-live", "polite");
	});
});
