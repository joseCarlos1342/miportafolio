# ADR 0001 — Astro static output

- Status: Accepted
- Date: 2025-01-01

## Context

The portfolio is a single-page site. We need maximum performance and zero JS runtime cost, while keeping the option to add interactive client features progressively.

## Decision

Use `output: 'static'` in `astro.config.mjs` and host the result on Cloudflare Pages via a Worker with `run_worker_first: true`.

## Consequences

- HTML is pre-rendered at build time → cached on the edge.
- No Astro runtime JS shipped to clients.
- GSAP and other client libs only load when the page hydrates the inline `<script>` from `BaseLayout.astro`.
- Protected routes (email, CV download) are still possible because the Worker runs before the asset fetch.
