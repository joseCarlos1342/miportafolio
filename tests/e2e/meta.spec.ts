import { test, expect } from "@playwright/test";

test.describe("Meta and head", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("has the correct title and language", async ({ page }) => {
		await expect(page).toHaveTitle("José Carlos Gómez R. | Ingeniero de Software Full-Stack");
		await expect(page.locator("html")).toHaveAttribute("lang", "es");
	});

	test("has meta description and robots directives", async ({ page }) => {
		const description = await page.locator('meta[name="description"]').getAttribute("content");
		expect(description).toContain("Portafolio de José Carlos Gómez R.");
		expect(description).toContain("Full-Stack");
		const robots = await page.locator('meta[name="robots"]').getAttribute("content");
		expect(robots).toContain("index, follow");
	});

	test("has canonical link", async ({ page }) => {
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			"href",
			"https://portafoliojosecarlos.com/"
		);
	});

	test("has Open Graph tags", async ({ page }) => {
		await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
		await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
			"content",
			"José Carlos Gómez R. | Ingeniero de Software Full-Stack"
		);
		await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
			"content",
			"https://portafoliojosecarlos.com/og-image.png?v=2"
		);
		await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "es_CO");
	});

	test("has Twitter card tags", async ({ page }) => {
		await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
			"content",
			"summary_large_image"
		);
		await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
			"content",
			"José Carlos Gómez R. | Ingeniero de Software Full-Stack"
		);
	});

	test("has JSON-LD structured data with Person and WebSite", async ({ page }) => {
		const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
		const data = JSON.parse(jsonLd ?? "{}");
		expect(data["@context"]).toBe("https://schema.org");
		const types = data["@graph"].map((node: { "@type": string }) => node["@type"]);
		expect(types).toContain("Person");
		expect(types).toContain("WebSite");
		const person = data["@graph"].find((node: { "@type": string }) => node["@type"] === "Person");
		expect(person.name).toBe("José Carlos Gómez R.");
	});

	test("has favicon and manifest links", async ({ page }) => {
		await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute(
			"href",
			"/favicon.svg"
		);
		await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/site.webmanifest");
	});

	test("sets theme-color meta for light and dark", async ({ page }) => {
		const light = page.locator('meta[name="theme-color"][media*="light"]');
		const dark = page.locator('meta[name="theme-color"][media*="dark"]');
		await expect(light).toHaveAttribute("content", "#ffffff");
		await expect(dark).toHaveAttribute("content", "#000000");
	});
});
