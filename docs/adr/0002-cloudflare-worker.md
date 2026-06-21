# ADR 0002 — Cloudflare Worker for protected routes

- Status: Accepted
- Date: 2025-01-01

## Context

The portfolio exposes the contact email and the CV download behind a Turnstile challenge. We need to do it without an extra origin and without slowing down public assets.

## Decision

Deploy the site through a Cloudflare Worker (`src/worker/index.ts`) configured with `run_worker_first: true`. The Worker checks protected paths first and either serves the content, renders a Turnstile challenge, or delegates to `env.ASSETS.fetch()` for public paths.

## Consequences

- Same origin for static + protected routes (no CORS, no extra DNS).
- Worker code is unit-tested inside the Workers runtime via `@cloudflare/vitest-pool-workers`.
- Coverage gate enforced at 100% on `src/worker/**/*.ts` (see `vitest.config.ts`).
- The CV file itself stays in `public/docs/`, but access is gated through the Worker (`/__download-cv`).
