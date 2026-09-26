# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: technical recruiters, hiring managers, and potential collaborators/clients evaluating José Carlos Gómez R. as a full-stack software engineer. They arrive from LinkedIn, GitHub, or a shared link, often on mobile, usually skimming quickly to decide whether he is worth a conversation. Secondary: fellow engineers assessing the depth and rigor of his work.

## Product Purpose

A bilingual (Spanish / English) personal portfolio that proves José Carlos can design, build, secure, and ship real full-stack products end to end. Success means a first-time visitor understands who he is and what he can build within seconds, is convinced by concrete project evidence, and takes an action: view a project, connect on LinkedIn, or download his CV.

## Positioning

Not a generic "developer template" portfolio. The differentiator is demonstrated end-to-end ownership: real deployed products spanning frontend, backend, databases, real-time systems, and hard security engineering (HMAC-signed cookies, timing-safe comparison, Turnstile anti-scraping, RLS, AES-256, 2FA). The portfolio itself is evidence — it is engineered, not assembled: static Astro edge-served with a Cloudflare Worker gate and a 100%-covered security layer.

## Operating Context

Single-page site, served statically from the Cloudflare edge, with a Worker that runs before assets and gates three sensitive routes (contact email, CV download, CV PDF) behind a Cloudflare Turnstile challenge and HMAC-SHA256 signed cookies. Read on desktop and mobile, in ES or EN, in light or dark ambient conditions. No tracking, no analytics.

## Capabilities and Constraints

- Static Astro SSG build (`output: static`) deployed to Cloudflare Workers; zero framework JS at runtime.
- Bilingual ES/EN via `data-es`/`data-en` attributes toggled client-side without reload; ES is the default document language.
- Light/dark theme persisted in `localStorage`, applied by an inline anti-FOUC script in `<head>`.
- Installable PWA (`site.webmanifest`, 192/512 icons).
- Full SEO: Open Graph (1200×630), Twitter Card, JSON-LD `Person` + `WebSite`, sitemap, robots, llms.txt, humans.txt.
- Accessibility target WCAG 2.1 AA; all motion must respect `prefers-reduced-motion`.
- `src/worker/**` (security layer) is under a CI coverage gate of 100% lines/functions/branches/statements and MUST NOT be altered by visual work.
- Node.js >= 22.12.0. Styling via Tailwind 4 (Vite plugin) + custom CSS tokens. GSAP for animation, loaded dynamically.

## Brand Commitments

- Name shown as "José Carlos Gómez R."; domain `portafoliojosecarlos.com`.
- Bilingual ES/EN is non-negotiable.
- Links: LinkedIn (`in/josecarlos-gomez-ing`), GitHub (`joseCarlos1342`).
- Voice: clear, practical, confident without hype; Spanish-first.
- No fabricated claims (no invented employers, metrics, testimonials, or certifications beyond those listed in Evidence).

## Evidence on Hand

- Three real projects with repos and media assets in `public/projects/`:
  - Mis Gastos Mensuales — React · Node.js · PostgreSQL · JWT/2FA (7 screenshots).
  - Mesa de Primera — Next.js · Colyseus · Supabase · Redis · WebRTC (optimized video demo).
  - Sistema de Préstamos Personales — Python · Flask · SQLite · AES-256 · Backups (7 screenshots).
- Skills across Frontend, Backend, Data/Cloud, Security (see `src/data/skills.ts`), with brand SVG icons in `public/tech/`.
- Education: in-progress Software Engineering degree (UNIMINUTO), Cisco/Python Institute tracks, SENA, B2 English; institution logos in `public/education/`.
- Professional photo at `/profile.png`. CV PDF (Turnstile-gated). Contact email (Turnstile-gated).
- No numeric performance benchmarks, client counts, or testimonials exist — these must not be fabricated.

## Product Principles

1. Evidence over adjectives — show real deployed products and the engineering behind them, never generic claims.
2. The medium is the proof — the portfolio's own craft (performance, security, polish) is part of the argument.
3. Fast and legible first — a skimming recruiter must grasp who he is and act within seconds, on any device.
4. Bilingual parity — ES and EN are equally first-class.
5. Integrity — accessible, private, honest; every claim traces to real evidence.

## Accessibility & Inclusion

WCAG 2.1 AA target. Full keyboard operability, visible focus, correct semantics/ARIA, and complete `prefers-reduced-motion` fallbacks (all signature motion degrades to a static, fully legible state). Bilingual content served accessibly in both languages.
