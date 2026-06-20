# AGENTS.md

Guidance for AI agents working on the `jose-carlos-portfolio` (Astro + Cloudflare Worker) project.

## Project layout

- `src/pages/index.astro` — single-page UI (hero, about, skills, projects, education, contact), i18n ES/EN, GSAP animations.
- `src/styles/global.css` — design tokens, light/dark theme, CSS components.
- `src/worker.ts` — Cloudflare Worker: Turnstile verification + protected routes (`/__contact-email`, `/__download-cv`, `/docs/cv-jose-carlos-gomez.pdf`). Helpers are **exported** for unit testing.
- `test/` — Vitest unit + integration tests for the Worker (run inside the Workers runtime via `@cloudflare/vitest-pool-workers`).
- `e2e/` — Playwright end-to-end tests for the public UI.
- `wrangler.jsonc` — Cloudflare Workers config (binding `ASSETS`, `run_worker_first: true`).

## Commands

Always run these before considering work done. Run from `agreeable-altitude/`.

```sh
npm run build              # Astro static build -> dist/
npm run test               # vitest run (unit + integration)
npm run test:coverage      # vitest run --coverage (gate: 100% on src/worker.ts)
npm run test:e2e           # playwright (builds + preview on :4321)
npx astro check            # typecheck for .astro / .ts
```

## Coverage gate

`vitest.config.ts` enforces **100% lines/functions/branches/statements on `src/worker.ts`**.
Any change to the Worker MUST keep coverage at 100% or the CI test job fails and blocks deploy.
Add or update tests in `test/worker/` alongside any Worker change.

## Testing conventions

- Worker tests run in the Cloudflare Workers runtime (pool-workers), not plain Node.
- Import the worker default and call `worker.fetch(request, mockEnv, createExecutionContext())` with a per-test mock `env` (mock `ASSETS` as a `{ fetch }` Fetcher; mock `globalThis.fetch` for Turnstile siteverify).
- Pure helpers (`sanitizeRedirect`, `escapeHtml`, `getCookie`, `isProtectedPath`, `base64UrlEncode`, `timingSafeEqual`, `signValue`, `hasValidVerificationCookie`, `renderChallengePage`, `renderEmailPage`) are exported and unit-tested directly.
- E2E (`e2e/`) targets the public UI served by `astro preview`. Turnstile-protected routes are covered by Worker integration tests, NOT by E2E (preview does not run the Worker).

## Security-sensitive code

`src/worker.ts` contains security logic (HMAC cookie signing, timing-safe compare, open-redirect sanitization, HTML escaping). Treat changes here with extra care and always add regression tests.
