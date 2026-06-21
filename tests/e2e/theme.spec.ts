import { test, expect } from "@playwright/test";

async function clearStorageAndGoto(page: import("@playwright/test").Page) {
	await page.context().clearCookies();
	await page.goto("/");
	await page.evaluate(() => localStorage.clear());
	await page.goto("/");
}

test.describe("Theme toggle", () => {
	test.beforeEach(async ({ page }) => {
		await clearStorageAndGoto(page);
	});

	test("toggles between light and dark", async ({ page }) => {
		const html = page.locator("html");
		const toggle = page.locator("#themeToggle");
		const label = page.locator("#themeToggle .theme-label");

		const startsDark = await html.evaluate((el) => el.classList.contains("dark"));
		await toggle.click();
		if (startsDark) {
			await expect(html).not.toHaveClass(/dark/);
			await expect(label).toHaveText("Dark");
			await expect(toggle).toHaveAttribute("aria-pressed", "false");
		} else {
			await expect(html).toHaveClass(/dark/);
			await expect(label).toHaveText("Light");
			await expect(toggle).toHaveAttribute("aria-pressed", "true");
		}

		await toggle.click();
		if (startsDark) {
			await expect(html).toHaveClass(/dark/);
			await expect(toggle).toHaveAttribute("aria-pressed", "true");
		} else {
			await expect(html).not.toHaveClass(/dark/);
			await expect(toggle).toHaveAttribute("aria-pressed", "false");
		}
	});

	test("persists the theme in localStorage", async ({ page }) => {
		const toggle = page.locator("#themeToggle");
		const startsDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
		await toggle.click();
		expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(
			startsDark ? "light" : "dark"
		);
	});

	test("restores the stored theme on reload", async ({ page }) => {
		await page.locator("#themeToggle").click();
		const themeAfterToggle = await page.evaluate(() => localStorage.getItem("theme"));
		expect(themeAfterToggle).not.toBeNull();

		await page.reload();
		await expect(page.locator("html")).toHaveAttribute("data-theme", themeAfterToggle as string);
	});
});
