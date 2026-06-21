import { test, expect } from "@playwright/test";

test.describe("Accessibility and reduced motion", () => {
	test("skip link is present, focuses, and scrolls to main on activation", async ({ page }) => {
		await page.goto("/");
		const skip = page.locator(".skip-link");
		await expect(skip).toHaveAttribute("href", "#main");
		await skip.focus();
		await expect(skip).toBeVisible();
		await page.keyboard.press("Enter");
		await expect(page).toHaveURL(/#main/);
	});

	test("theme toggle exposes aria-pressed", async ({ page }) => {
		await page.goto("/");
		await page.evaluate(() => localStorage.clear());
		await page.reload();
		const toggle = page.locator("#themeToggle");
		const startsDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
		await expect(toggle).toHaveAttribute("aria-pressed", String(startsDark));
		await toggle.click();
		await expect(toggle).toHaveAttribute("aria-pressed", String(!startsDark));
	});

	test("language toggle exposes an accessible label", async ({ page }) => {
		await page.goto("/");
		const toggle = page.locator("#languageToggle");
		await expect(toggle).toHaveAttribute("aria-label", "Cambiar idioma a inglés");
	});

	test("nav is labelled as main navigation", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator('nav[aria-label="Navegación principal"]')).toBeVisible();
	});

	test("images have meaningful alt text or are decorative", async ({ page }) => {
		await page.goto("/");
		const profileImg = page.locator('img[alt*="José Carlos"]');
		await expect(profileImg).toHaveAttribute(
			"alt",
			"Foto profesional de José Carlos Gómez R."
		);
		const techLogos = page.locator(".tech-logo");
		await expect(techLogos.first()).toHaveAttribute("alt", "");
	});

	test("respects prefers-reduced-motion by revealing content immediately", async ({ page }) => {
		await page.emulateMedia({ reducedMotion: "reduce" });
		await page.goto("/");
		const firstReveal = page.locator(".reveal").first();
		await expect(firstReveal).toHaveClass(/is-visible/);
	});

	test("carousel controls have aria-labels", async ({ page }) => {
		await page.goto("/");
		const prev = page.locator(".carousel-prev").first();
		const next = page.locator(".carousel-next").first();
		await expect(prev).toHaveAttribute("aria-label", "Imagen anterior");
		await expect(next).toHaveAttribute("aria-label", "Imagen siguiente");
	});

	test("preview dialog has an accessible label", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("#previewDialog")).toHaveAttribute(
			"aria-label",
			"Vista ampliada del proyecto"
		);
	});
});
