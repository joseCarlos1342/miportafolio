# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `DESIGN.md` — design system in Google design.md format, validated with `@google/design.md lint` (0 errors, 0 warnings).
- `LICENSE` — MIT License with third-party software licenses appendix.
- `README.md` — bilingual (Spanish/English) with full project documentation.
- `public/llms.txt` — AI-friendly site index (llms.txt convention).
- `public/humans.txt` — human-readable credits.
- `docs/ARCHITECTURE.md` — architecture documentation (Astro SSG + Cloudflare Worker).
- `docs/DEPLOYMENT.md` — CI/CD documentation with troubleshooting.
- `docs/ENVIRONMENT.md` — full environment variable table.
- `docs/SECURITY.md` — security model, Turnstile flow, HMAC cookies, redirect sanitization.
- `docs/SEO.md` — Open Graph, Twitter Card, JSON-LD, sitemap, robots.
- `docs/PERFORMANCE.md` — image, video, font, CSS, JS optimization strategies.
- `docs/ACCESSIBILITY.md` — WCAG 2.1 AA compliance, ARIA, reduced-motion, contrast ratios.
- `docs/CONTENT.md` — content management guide (projects, i18n, assets).
- `CONTRIBUTING.md` — contribution guide.
- `CODE_OF_CONDUCT.md` — Contributor Covenant.
- `.github/ISSUE_TEMPLATE/` — bug report and feature request templates.
- `.github/PULL_REQUEST_TEMPLATE.md` — pull request template.

### Changed
- `.gitignore` — removed `DESIGN.md` entry so the design system is committed to the repo.
- `README.md` — rewritten from 52 lines (outdated, contradicted code) to full bilingual documentation.
- `.github/workflows/deploy.yml` — removed duplicate `env:` block that prevented Cloudflare credentials from propagating to wrangler-action.

### Fixed
- CI/CD: `CLOUDFLARE_API_TOKEN` was not reaching the wrangler subprocess because the `env:` block on the deploy step shadowed the action inputs. Credentials now passed exclusively via `with:` inputs per the `cloudflare/wrangler-action@v3` documentation.

## [0.0.1] — 2026-05-14

### Added
- Astro 6 static site with Tailwind CSS 4 and GSAP.
- Single-page layout: hero, about, skills, projects, education, contact.
- Bilingual ES/EN with `data-es`/`data-en` attribute system.
- Light/dark theme with `localStorage` persistence and no-FOUC inline script.
- Cloudflare Worker with Turnstile protection for contact email and CV download.
- HMAC-SHA256 signed cookies with `timingSafeEqual` validation.
- Open Graph, Twitter Card, and JSON-LD (Person + WebSite) structured data.
- Project image carousels with AVIF/WebP/PNG `<picture>` sources.
- Project gameplay video with WebM/MP4 fallback and IntersectionObserver playback.
- GSAP micro-interactions: reveal-on-scroll, magnetic buttons, 3D tilt on project cards.
- `prefers-reduced-motion` support.
- PWA manifest, favicon SVG/ICO, and icon generation scripts.
- GitHub Actions CI/CD workflow for automatic deployment to Cloudflare Workers.
