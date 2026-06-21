# ADR 0003 — Turnstile protection

- Status: Accepted
- Date: 2025-01-01

## Context

Email and CV download are scraping targets. We want a CAPTCHA that does not hurt UX for the rest of the site.

## Decision

Use Cloudflare Turnstile on three protected routes only: `/__contact-email`, `/__download-cv`, and the direct `/docs/cv-jose-carlos-gomez.pdf`. The challenge sets a signed HMAC cookie valid for 30 days. Public assets are served untouched.

## Consequences

- Scrapers get the challenge page; legitimate users only see it once every 30 days.
- Cookie tampering fails because the value is signed with `COOKIE_SECRET` and verified with `timingSafeEqual`.
- Open-redirect attacks are blocked by `sanitizeRedirect` (rejects `//evil.example` and any non-`/` prefix).
- Turnstile siteverify happens server-side, the secret never leaves the Worker.
