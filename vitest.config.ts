/// <reference types="vitest/config" />
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
		}),
	],
	resolve: {
		alias: {
			"~/*": "./src/*",
		},
	},
	test: {
		include: ["tests/unit/**/*.test.ts"],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "text-summary", "html", "lcov"],
			reportsDirectory: "coverage",
			include: ["src/worker/**/*.ts"],
			thresholds: {
				perFile: true,
				lines: 100,
				functions: 100,
				branches: 100,
				statements: 100,
			},
		},
	},
});
