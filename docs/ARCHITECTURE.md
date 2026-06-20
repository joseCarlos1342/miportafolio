# Architecture

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="espanol"></a>

## Espanol

### Vista general

El portafolio es una aplicacion **estatica-first** con un **Cloudflare Worker** que intercepta rutas protegidas. La arquitectura tiene dos capas:

```
Cliente (navegador)
    │
    ▼
Cloudflare Worker (src/worker.ts)
    │
    ├── Ruta protegida? ──Si──► Turnstile challenge (403)
    │                        │
    │                        ├── Cookie valida? ──Si──► Servir contenido
    │                        │
    │                        └── No ──► Render challenge page
    │
    └── Ruta publica? ──Si──► env.ASSETS.fetch() ──► dist/ (estatico)
```

### Capa 1: Astro SSG (estatica)

- **Output:** `output: 'static'` en `astro.config.mjs`.
- **Build:** `npm run build` genera HTML, CSS y JS en `dist/`.
- **Pagina:** una sola pagina (`src/pages/index.astro`) con 6 secciones: hero, about, skills, projects, education, contact.
- **Estilos:** Tailwind CSS 4 via plugin Vite + `src/styles/global.css` con design tokens CSS.
- **Animaciones:** GSAP cargado como ES module dentro del `<script>` de la pagina. No hay JS de Astro runtime — todo es estatico.

### Capa 2: Cloudflare Worker (rutas protegidas)

- **Config:** `wrangler.jsonc` con `run_worker_first: true` — el Worker se ejecuta antes que los assets estaticos.
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
| GSAP via ES module | Sin dependencia runtime de Astro, tree-shakeable |
| Turnstile solo en 3 rutas | No bloquear el contenido principal; solo proteger email y CV |
| Cookie HMAC firmada | Evitar manipulacion del timestamp de verificacion |
| `color-scheme` CSS | Alinear controles nativos y scrollbar con el tema |

---

<a id="english"></a>

## English

### Overview

The portfolio is a **static-first** application with a **Cloudflare Worker** that intercepts protected routes. The architecture has two layers:

```
Client (browser)
    │
    ▼
Cloudflare Worker (src/worker.ts)
    │
    ├── Protected route? ──Yes──► Turnstile challenge (403)
    │                           │
    │                           ├── Valid cookie? ──Yes──► Serve content
    │                           │
    │                           └── No ──► Render challenge page
    │
    └── Public route? ──Yes──► env.ASSETS.fetch() ──► dist/ (static)
```

### Layer 1: Astro SSG (static)

- **Output:** `output: 'static'` in `astro.config.mjs`.
- **Build:** `npm run build` generates HTML, CSS, and JS in `dist/`.
- **Page:** a single page (`src/pages/index.astro`) with 6 sections: hero, about, skills, projects, education, contact.
- **Styles:** Tailwind CSS 4 via Vite plugin + `src/styles/global.css` with CSS design tokens.
- **Animations:** GSAP loaded as an ES module inside the page's `<script>`. No Astro runtime JS — everything is static.

### Layer 2: Cloudflare Worker (protected routes)

- **Config:** `wrangler.jsonc` with `run_worker_first: true` — the Worker runs before static assets.
- **Binding:** `ASSETS` (Fetcher) provides access to static content in `dist/`.
- **Protected routes:** `/__contact-email`, `/__download-cv`, `/docs/cv-jose-carlos-gomez.pdf`.
- **Verification:** POST to `challenges.cloudflare.com/turnstile/v0/siteverify` with token and secret.
- **Cookie:** HMAC-SHA256 signed with `COOKIE_SECRET`, base64url, `HttpOnly`, `Secure`, `SameSite=Lax`, 30 days.

### Request flow

1. Request arrives at the Worker.
2. If POST to `/__turnstile-verify` → validate Turnstile token → set cookie → redirect.
3. If protected route → verify cookie → serve content or show challenge.
4. If any other route → `env.ASSETS.fetch(request)` serves the static file.

### Design decisions

| Decision | Rationale |
|---|---|
| Astro `output: 'static'` | Maximum performance, no runtime JS, edge-cacheable |
| Worker `run_worker_first: true` | Worker intercepts before assets to protect routes |
| Single page (`index.astro`) | One-page portfolio, smooth scroll, simple SEO |
| GSAP via ES module | No Astro runtime dependency, tree-shakeable |
| Turnstile on 3 routes only | Don't block main content; only protect email and CV |
| HMAC-signed cookie | Prevent tampering of verification timestamp |
| `color-scheme` CSS | Align native controls and scrollbar with theme |
