# Jose Carlos Gomez R. — Portfolio

> **Idiomas / Languages:** [Espanol](#espanol) | [English](#english)

---

<a id="espanol"></a>

## Espanol

Portafolio web bilingue (Espanol / Ingles) de Jose Carlos Gomez R., ingeniero de software Full-Stack. Sitio estatico construido con Astro, desplegado en Cloudflare Workers Assets, con proteccion anti-scraping via Cloudflare Turnstile para el email de contacto y la descarga del CV.

### Badges

| CI | Despliegue | Licencia |
|---|---|---|
| ![CI](https://github.com/joseCarlos1342/miportafolio/actions/workflows/deploy.yml/badge.svg) | Cloudflare Workers | MIT |

### Stack

| Tecnologia | Version | Licencia | Uso |
|---|---|---|---|
| [Astro](https://astro.build) | ^6.3.3 | MIT | Framework SSG |
| [Tailwind CSS](https://tailwindcss.com) | ^4.3.0 | MIT | Estilos |
| [GSAP](https://gsap.com) | ^3.15.0 | GSAP Standard | Animaciones |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | ^4.100.0 | MIT | Deploy CLI |
| [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) | — | Cloudflare ToS | Anti-bot |

**Requisitos:** Node.js >= 22.12.0

### Estructura del proyecto

```
agreeable-altitude/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD: build + deploy a Cloudflare
├── public/
│   ├── tech/                      # Iconos SVG de tecnologias
│   ├── education/                 # Logos de instituciones
│   ├── projects/                  # Capturas y videos de proyectos
│   ├── docs/                      # CV en PDF (protegido)
│   ├── favicon.svg / .ico         # Favicon y iconos PWA
│   ├── og-image.png / .svg        # Open Graph image
│   ├── robots.txt                 # Directivas para crawlers
│   ├── sitemap.xml                # Sitemap
│   ├── site.webmanifest           # PWA manifest
│   ├── llms.txt                   # Indice para modelos de IA
│   └── llms-full.txt              # Contenido completo para IA
├── scripts/
│   ├── generate-icons.cjs         # Genera iconos PWA desde favicon.svg
│   └── generate-ico.cjs           # Genera favicon.ico
├── src/
│   ├── pages/
│   │   └── index.astro            # Pagina unica (hero, about, skills, projects, education, contact)
│   ├── styles/
│   │   └── global.css             # Design tokens, tema claro/oscuro, componentes CSS
│   └── worker.ts                  # Cloudflare Worker: Turnstile + rutas protegidas
├── astro.config.mjs               # Configuracion Astro (output: static, Tailwind Vite)
├── wrangler.jsonc                 # Configuracion Cloudflare Workers
├── DESIGN.md                      # Sistema de diseno (formato Google design.md)
├── tsconfig.json                  # TypeScript strict
└── package.json
```

### Desarrollo

```sh
npm install
npm run dev
```

El sitio estara disponible en `http://localhost:4321`.

### Build

```sh
npm run build
```

El output estatico se genera en `dist/`.

### Variables de entorno

Ver documentacion completa en [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md).

| Variable | Tipo | Origen | Descripcion |
|---|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Publica | `wrangler.jsonc` vars | Site key del widget Turnstile |
| `TURNSTILE_SECRET_KEY` | Secreto | `wrangler secret put` | Secret key para validar tokens |
| `COOKIE_SECRET` | Secreto | `wrangler secret put` | Clave HMAC para firmar cookies |
| `CONTACT_EMAIL` | Secreto | `wrangler secret put` | Email de contacto (protegido) |
| `CLOUDFLARE_API_TOKEN` | CI | GitHub Secrets | Token para deploy desde CI |
| `CLOUDFLARE_ACCOUNT_ID` | CI | GitHub Secrets | Account ID para deploy desde CI |

### Despliegue

El despliegue es automatico via GitHub Actions al hacer push a `master`.

Ver documentacion completa en [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

```sh
# Despliegue manual (alternativo)
npm run build
npx wrangler deploy
```

### Rutas protegidas por Turnstile

El Worker en `src/worker.ts` protege **unicamente** tres rutas:

| Ruta | Metodo | Descripcion |
|---|---|---|
| `/__contact-email` | GET | Pagina con el email de contacto |
| `/__download-cv` | GET | Descarga del CV en PDF |
| `/docs/cv-jose-carlos-gomez.pdf` | GET | Archivo PDF del CV |

El resto del sitio (HTML, CSS, JS, imagenes, fuentes) se sirve publicamente sin verificacion.

**Flujo:**
1. El usuario accede a una ruta protegida.
2. Si no tiene cookie valida, el Worker devuelve una pagina con el widget Turnstile (HTTP 403).
3. Al completar el challenge, el Worker valida el token contra `challenges.cloudflare.com/turnstile/v0/siteverify`.
4. Si la validacion pasa, se establece una cookie `HttpOnly`, `Secure`, `SameSite=Lax` por 30 dias.
5. Las visitas posteriores con cookie valida acceden directamente al contenido protegido.

### Documentacion

| Documento | Descripcion |
|---|---|
| [DESIGN.md](DESIGN.md) | Sistema de diseno (formato Google design.md, validado con `@google/design.md lint`) |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Arquitectura: Astro + Cloudflare Worker |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | CI/CD con GitHub Actions, secrets, troubleshooting |
| [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md) | Tabla completa de variables de entorno |
| [docs/SECURITY.md](docs/SECURITY.md) | Modelo de seguridad, Turnstile, cookies HMAC |
| [docs/SEO.md](docs/SEO.md) | Open Graph, JSON-LD, sitemap, robots |
| [docs/PERFORMANCE.md](docs/PERFORMANCE.md) | Optimizacion de imagenes, video, fonts |
| [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) | WCAG, ARIA, reduced-motion, focus management |
| [docs/CONTENT.md](docs/CONTENT.md) | Guia para agregar proyectos, i18n, assets |
| [CHANGELOG.md](CHANGELOG.md) | Historial de versiones |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Guia de contribucion |

### Licencia

Este proyecto esta licenciado bajo **MIT License**. Ver [LICENSE](LICENSE).

Las tecnologias de terceros (Astro, Tailwind CSS, GSAP, Wrangler, Cloudflare Turnstile) mantienen sus propias licencias. Los logos y marcas (Apple, Cisco, SENA, Python Institute, LinkedIn, GitHub, Cloudflare) pertenecen a sus respectivos duenos y se referencian nominalmente con fines educativos y de atribucion profesional.

---

<a id="english"></a>

## English

Bilingual (Spanish / English) web portfolio for Jose Carlos Gomez R., a Full-Stack software engineer. Static site built with Astro, deployed to Cloudflare Workers Assets, with anti-scraping protection via Cloudflare Turnstile for the contact email and CV download.

### Badges

| CI | Deploy | License |
|---|---|---|
| ![CI](https://github.com/joseCarlos1342/miportafolio/actions/workflows/deploy.yml/badge.svg) | Cloudflare Workers | MIT |

### Stack

| Technology | Version | License | Purpose |
|---|---|---|---|
| [Astro](https://astro.build) | ^6.3.3 | MIT | SSG framework |
| [Tailwind CSS](https://tailwindcss.com) | ^4.3.0 | MIT | Styling |
| [GSAP](https://gsap.com) | ^3.15.0 | GSAP Standard | Animations |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | ^4.100.0 | MIT | Deploy CLI |
| [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) | — | Cloudflare ToS | Anti-bot |

**Requirements:** Node.js >= 22.12.0

### Project structure

```
agreeable-altitude/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD: build + deploy to Cloudflare
├── public/
│   ├── tech/                      # Technology SVG icons
│   ├── education/                 # Institution logos
│   ├── projects/                  # Project screenshots and videos
│   ├── docs/                      # CV PDF (protected)
│   ├── favicon.svg / .ico         # Favicon and PWA icons
│   ├── og-image.png / .svg        # Open Graph image
│   ├── robots.txt                 # Crawler directives
│   ├── sitemap.xml                # Sitemap
│   ├── site.webmanifest           # PWA manifest
│   ├── llms.txt                   # Index for AI models
│   └── llms-full.txt              # Full content for AI
├── scripts/
│   ├── generate-icons.cjs         # Generates PWA icons from favicon.svg
│   └── generate-ico.cjs           # Generates favicon.ico
├── src/
│   ├── pages/
│   │   └── index.astro            # Single page (hero, about, skills, projects, education, contact)
│   ├── styles/
│   │   └── global.css             # Design tokens, light/dark theme, CSS components
│   └── worker.ts                  # Cloudflare Worker: Turnstile + protected routes
├── astro.config.mjs               # Astro config (output: static, Tailwind Vite)
├── wrangler.jsonc                 # Cloudflare Workers config
├── DESIGN.md                      # Design system (Google design.md format)
├── tsconfig.json                  # TypeScript strict
└── package.json
```

### Development

```sh
npm install
npm run dev
```

The site will be available at `http://localhost:4321`.

### Build

```sh
npm run build
```

Static output is generated in `dist/`.

### Environment variables

See full documentation in [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md).

| Variable | Type | Source | Description |
|---|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Public | `wrangler.jsonc` vars | Turnstile widget site key |
| `TURNSTILE_SECRET_KEY` | Secret | `wrangler secret put` | Secret key to validate tokens |
| `COOKIE_SECRET` | Secret | `wrangler secret put` | HMAC key to sign cookies |
| `CONTACT_EMAIL` | Secret | `wrangler secret put` | Contact email (protected) |
| `CLOUDFLARE_API_TOKEN` | CI | GitHub Secrets | Token for CI deploy |
| `CLOUDFLARE_ACCOUNT_ID` | CI | GitHub Secrets | Account ID for CI deploy |

### Deployment

Deployment is automatic via GitHub Actions on push to `master`.

See full documentation in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

```sh
# Manual deployment (alternative)
npm run build
npx wrangler deploy
```

### Turnstile-protected routes

The Worker in `src/worker.ts` protects **only** three routes:

| Route | Method | Description |
|---|---|---|
| `/__contact-email` | GET | Page with contact email |
| `/__download-cv` | GET | CV PDF download |
| `/docs/cv-jose-carlos-gomez.pdf` | GET | CV PDF file |

The rest of the site (HTML, CSS, JS, images, fonts) is served publicly without verification.

**Flow:**
1. User accesses a protected route.
2. If no valid cookie, the Worker returns a Turnstile widget page (HTTP 403).
3. On challenge completion, the Worker validates the token against `challenges.cloudflare.com/turnstile/v0/siteverify`.
4. If validation passes, a `HttpOnly`, `Secure`, `SameSite=Lax` cookie is set for 30 days.
5. Subsequent visits with a valid cookie access the protected content directly.

### Documentation

| Document | Description |
|---|---|
| [DESIGN.md](DESIGN.md) | Design system (Google design.md format, validated with `@google/design.md lint`) |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture: Astro + Cloudflare Worker |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | CI/CD with GitHub Actions, secrets, troubleshooting |
| [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md) | Full environment variable table |
| [docs/SECURITY.md](docs/SECURITY.md) | Security model, Turnstile, HMAC cookies |
| [docs/SEO.md](docs/SEO.md) | Open Graph, JSON-LD, sitemap, robots |
| [docs/PERFORMANCE.md](docs/PERFORMANCE.md) | Image, video, font optimization |
| [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) | WCAG, ARIA, reduced-motion, focus management |
| [docs/CONTENT.md](docs/CONTENT.md) | Guide for adding projects, i18n, assets |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guide |

### License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE).

Third-party technologies (Astro, Tailwind CSS, GSAP, Wrangler, Cloudflare Turnstile) retain their own licenses. Logos and trademarks (Apple, Cisco, SENA, Python Institute, LinkedIn, GitHub, Cloudflare) belong to their respective owners and are referenced nominatively for educational and professional attribution purposes only.
