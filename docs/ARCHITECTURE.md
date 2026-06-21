# Architecture

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="espanol"></a>

## Espanol

### Vista general

El portafolio es una aplicacion **estatica-first** con un **Cloudflare Worker** que intercepta rutas protegidas. La arquitectura tiene dos capas:

```
Cliente (navegador)
    |
    v
Cloudflare Worker (src/worker/index.ts)
    |
    ├── Ruta protegida? ──Si──► Turnstile challenge (403)
    |                        |
    |                        ├── Cookie valida? ──Si──► Servir contenido
    |                        |
    |                        └── No ──► Render challenge page
    |
    └── Ruta publica? ──Si──► env.ASSETS.fetch() ──► dist/ (estatico)
```

### Capa 1: Astro SSG (estatica)

- **Output:** `output: 'static'` en `astro.config.mjs`.
- **Build:** `npm run build` genera HTML, CSS y JS en `dist/`.
- **Pagina:** una sola pagina (`src/pages/index.astro`) que orquesta componentes de `src/components/sections/*` (hero, about, skills, projects, education, contact).
- **Layout:** `src/layouts/BaseLayout.astro` con `<head>`, meta tags, JSON-LD, hreflang y el script anti-FOUC inline.
- **Estilos:** Tailwind CSS 4 via plugin Vite + `src/styles/tokens.css` (design tokens) + `src/styles/global.css` (componentes).
- **Datos:** tipados en `src/data/*.ts` (site, projects, education, skills, nav) y `src/data/i18n/strings.ts` (ES/EN).
- **Scripts cliente:** `src/scripts/main.ts` orquesta modulos en `src/scripts/{i18n,theme,carousel,lightbox,project-video}.ts` y `src/scripts/animations/*`.
- **Animaciones:** GSAP cargado dinamicamente como ES module solo en cliente. Sin runtime de Astro.

### Capa 2: Cloudflare Worker (rutas protegidas)

- **Config:** `wrangler.jsonc` con `run_worker_first: true` — el Worker se ejecuta antes que los assets estaticos. Entry point: `src/worker/index.ts` (apunta a `src/worker/index.ts`).
- **Modulos:**
  - `lib/` — helpers puros (escape HTML, sanitize-redirect, challenge-redirect, crypto, cookie, verification-cookie, is-protected-path, challenge-styles).
  - `routes/` — handlers HTTP (turnstile-verify, protected).
  - `pages/` — renderers de HTML (challenge, email).
  - `types.ts` — `Env` y constantes (rutas, cookies, siteverify URL).
  - `index.ts` — entry point que re-exporta la API publica para tests.
- **Binding:** `ASSETS` (Fetcher) da acceso al contenido estatico en `dist/`.
- **Rutas protegidas:** `/__contact-email`, `/__download-cv`, `/docs/cv-jose-carlos-gomez.pdf`.
- **Verificacion:** POST a `challenges.cloudflare.com/turnstile/v0/siteverify` con el token y el secret.
- **Cookie:** HMAC-SHA256 firmada con `COOKIE_SECRET`, base64url, `HttpOnly`, `Secure`, `SameSite=Lax`, 30 dias.

### Flujo de una peticion

1. El request llega al Worker.
2. Si es POST a `/__turnstile-verify` → validar token Turnstile → setear cookie → redirigir.
3. Si es una ruta protegida → verificar cookie → servir contenido o mostrar challenge.
4. Si es cualquier otra ruta → `env.ASSETS.fetch(request)` sirve el estatico.

### Decisiones de diseno

| Decision | Razon |
|---|---|
| Astro `output: 'static'` | Maximo performance, sin JS runtime, cacheable en edge |
| Worker `run_worker_first: true` | El Worker intercepta antes que los assets para proteger rutas |
| Single page (`index.astro`) | Portafolio de una sola pagina, scroll fluido, SEO simple |
| Componentes por seccion en `components/sections/*` | Mantenibilidad, cada seccion aislada y testeable |
| Datos tipados en `src/data/*` | Sin acoplamiento a Markdown, tipos compartidos cliente/servidor |
| GSAP via ES module dinamico | Sin dependencia runtime de Astro, tree-shakeable |
| Turnstile solo en 3 rutas | No bloquear el contenido principal; solo proteger email y CV |
| Cookie HMAC firmada | Evitar manipulacion del timestamp de verificacion |
| `color-scheme` CSS | Alinear controles nativos y scrollbar con el tema |

Ver [docs/adr/](./adr/) para los registros formales de decision.

---

<a id="english"></a>

## English

### Overview

The portfolio is a **static-first** application with a **Cloudflare Worker** that intercepts protected routes. The architecture has two layers:

```
Client (browser)
    |
    v
Cloudflare Worker (src/worker/index.ts)
    |
    ├── Protected route? ──Yes──► Turnstile challenge (403)
    |                           |
    |                           ├── Valid cookie? ──Yes──► Serve content
    |                           |
    |                           └── No ──► Render challenge page
    |
    └── Public route? ──Yes──► env.ASSETS.fetch() ──► dist/ (static)
```

### Layer 1: Astro SSG (static)

- **Output:** `output: 'static'` in `astro.config.mjs`.
- **Build:** `npm run build` generates HTML, CSS and JS in `dist/`.
- **Page:** a single page (`src/pages/index.astro`) that orchestrates components from `src/components/sections/*` (hero, about, skills, projects, education, contact).
- **Layout:** `src/layouts/BaseLayout.astro` with `<head>`, meta tags, JSON-LD, hreflang and the inline anti-FOUC script.
- **Styles:** Tailwind CSS 4 via Vite plugin + `src/styles/tokens.css` (design tokens) + `src/styles/global.css` (components).
- **Data:** typed in `src/data/*.ts` (site, projects, education, skills, nav) and `src/data/i18n/strings.ts` (ES/EN).
- **Client scripts:** `src/scripts/main.ts` orchestrates modules in `src/scripts/{i18n,theme,carousel,lightbox,project-video}.ts` and `src/scripts/animations/*`.
- **Animations:** GSAP loaded dynamically as an ES module on the client only. No Astro runtime.

### Layer 2: Cloudflare Worker (protected routes)

- **Config:** `wrangler.jsonc` with `run_worker_first: true` — the Worker runs before static assets. Entry point: `src/worker/index.ts`.
- **Modules:**
  - `lib/` — pure helpers (escape HTML, sanitize-redirect, challenge-redirect, crypto, cookie, verification-cookie, is-protected-path, challenge-styles).
  - `routes/` — HTTP handlers (turnstile-verify, protected).
  - `pages/` — HTML renderers (challenge, email).
  - `types.ts` — `Env` and constants (paths, cookies, siteverify URL).
  - `index.ts` — entry point that re-exports the public API for tests.
- **Binding:** `ASSETS` (Fetcher) gives access to static content in `dist/`.
- **Protected routes:** `/__contact-email`, `/__download-cv`, `/docs/cv-jose-carlos-gomez.pdf`.
- **Verification:** POST to `challenges.cloudflare.com/turnstile/v0/siteverify` with the token and the secret.
- **Cookie:** HMAC-SHA256 signed with `COOKIE_SECRET`, base64url, `HttpOnly`, `Secure`, `SameSite=Lax`, 30 days.

### Request flow

1. The request hits the Worker.
2. If POST to `/__turnstile-verify` → validate Turnstile token → set cookie → redirect.
3. If protected path → verify cookie → serve content or render challenge.
4. Otherwise → `env.ASSETS.fetch(request)` serves the static asset.

### Design decisions

| Decision | Reason |
|---|---|
| Astro `output: 'static'` | Maximum performance, no JS runtime, edge-cacheable |
| Worker `run_worker_first: true` | Worker intercepts before assets to protect routes |
| Single page (`index.astro`) | Single-page portfolio, fluid scroll, simple SEO |
| Components per section in `components/sections/*` | Maintainability, each section isolated and testable |
| Typed data in `src/data/*` | No Markdown coupling, types shared client/server |
| GSAP via dynamic ES module | No Astro runtime dependency, tree-shakeable |
| Turnstile on 3 routes only | Don't block main content; only protect email and CV |
| HMAC-signed cookie | Prevent verification timestamp tampering |
| `color-scheme` CSS | Align native controls and scrollbar with the theme |

See [docs/adr/](./adr/) for formal decision records.
