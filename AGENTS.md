# AGENTS.md

Guidance for AI agents working on the `jose-carlos-portfolio` (Astro + Cloudflare Worker) project.

## Project layout

- `src/pages/index.astro` — single-page UI orchestrator (~25 lines, delegates to sections).
- `src/layouts/BaseLayout.astro` — `<html>`, `<head>`, meta, structured data, anti-FOUC script, client bundle.
- `src/components/` — reusable Astro components, grouped by concern:
  - `seo/` (`MetaTags`, `StructuredData`, `Hreflang`)
  - `sections/` (`Hero`, `About`, `Skills`, `Projects`, `Education`, `Contact`)
  - `ui/` (`Button`, `Eyebrow`, `SectionHeading`, `TechPill`)
  - `projects/` (`ProjectCard`, `ProjectGallery`, `LightboxDialog`)
  - `i18n/`, `theme/`, `nav/` (`LanguageSwitch`, `ThemeToggle`, `Header`, `Footer`)
- `src/data/` — typed static data:
  - `site.ts`, `projects.ts`, `education.ts`, `skills.ts`, `nav.ts`
  - `i18n/strings.ts` (ES/EN bundles + `TranslationKey` type)
- `src/types/index.ts` — shared types (`Project`, `SkillGroup`, `Locale`, etc.).
- `src/scripts/` — client-side TypeScript modules (bundled by Astro):
  - `main.ts` (orchestrator), `i18n.ts`, `theme.ts`
  - `carousel.ts`, `lightbox.ts`, `project-video.ts`
  - `animations/{reveal,magnetic,tech-pill,project-card}.ts`
- `src/styles/` — `tokens.css` (design system variables) + `global.css` (Tailwind + components).
- `src/worker/` — Cloudflare Worker (split into modules, barrel re-exports the public API):
  - `index.ts` — entry point + re-exports for tests
  - `types.ts` — `Env` + path/siteverify constants
  - `lib/` — pure helpers (`escape-html`, `sanitize-redirect`, `challenge-redirect`, `crypto`, `cookie`, `verification-cookie`, `is-protected-path`, `challenge-styles`)
  - `routes/` — `turnstile-verify.ts`, `protected.ts`
  - `pages/` — HTML renderers (`challenge.ts`, `email.ts`)
- `tests/` — all tests under one root:
  - `tests/unit/worker/` — Vitest (run in Workers runtime)
  - `tests/unit/data/` — reserved for data-shape tests
  - `tests/e2e/` — Playwright
  - `tests/fixtures/` — JSON fixtures for tests
- `docs/` — design + technical docs:
  - `ARCHITECTURE.md`, `CONTENT.md`, `DEPLOYMENT.md`, `ENVIRONMENT.md`, `PERFORMANCE.md`, `SECURITY.md`, `SEO.md`, `TESTING.md`, `ACCESSIBILITY.md`, `DESIGN.md`
  - `adr/` — Architecture Decision Records

## Commands

Always run these before considering work done.

```sh
npm run build              # Astro static build -> dist/
npm run test               # vitest run (unit + integration)
npm run test:coverage      # vitest run --coverage (gate: 100% on src/worker/**/*.ts)
npm run test:e2e           # playwright (builds + preview on :4321)
npx astro check            # typecheck for .astro / .ts
```

## Coverage gate

`vitest.config.ts` enforces **100% lines/functions/branches/statements on `src/worker/**/*.ts`**.
Any change to the Worker MUST keep coverage at 100% or the CI test job fails and blocks deploy.
Add or update tests in `tests/unit/worker/` alongside any Worker change.

## Testing conventions

- Worker tests run in the Cloudflare Workers runtime (pool-workers), not plain Node.
- Import the worker default and call `worker.fetch(request, env, createExecutionContext())` with a per-test mock `env` (mock `ASSETS` as a `{ fetch }` Fetcher; mock `globalThis.fetch` for Turnstile siteverify).
- Pure helpers are exported from `src/worker/index.ts` (re-exported) and unit-tested directly.
- E2E (`tests/e2e/`) targets the public UI served by `astro preview`. Turnstile-protected routes are covered by Worker integration tests, NOT by E2E (preview does not run the Worker).

## Security-sensitive code

`src/worker/` contains security logic (HMAC cookie signing, timing-safe compare, open-redirect sanitization, HTML escaping, Turnstile verification). Treat changes here with extra care and always add regression tests.
