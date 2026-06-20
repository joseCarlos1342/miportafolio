# Testing

Estrategia de pruebas del portafolio: tests unitarios + de integración para el Cloudflare Worker (Vitest + `@cloudflare/vitest-pool-workers`) y tests E2E para la UI pública (Playwright).

## Tabla de contenidos

- [Stack](#stack)
- [Estructura](#estructura)
- [Comandos](#comandos)
- [Cobertura](#cobertura)
- [Tests del Worker](#tests-del-worker)
- [Tests E2E](#tests-e2e)
- [CI](#ci)
- [Troubleshooting](#troubleshooting)

## Stack

| Herramienta | Version | Uso |
|---|---|---|
| [Vitest](https://vitest.dev) | ^4.1.9 | Runner de tests unitarios e integración |
| [`@cloudflare/vitest-pool-workers`](https://developers.cloudflare.com/workers/testing/vitest-integration/) | ^0.16.18 | Ejecuta tests dentro del runtime de Workers |
| [`@vitest/coverage-istanbul`](https://vitest.dev/guide/coverage) | ^4.1.9 | Cobertura (Istanbul, compatible con pool-workers) |
| [Playwright](https://playwright.dev) | ^1.61.0 | Tests E2E en Chromium, Firefox y móvil |
| [`@cloudflare/workers-types`](https://www.npmjs.com/package/@cloudflare/workers-types) | latest | Tipos TypeScript para el Worker |

## Estructura

```
agreeable-altitude/
├── src/
│   └── worker.ts                  # Exporta helpers puros para testing
├── test/
│   └── worker/
│       ├── helpers.test.ts        # Unit tests de helpers (sanitizeRedirect, escapeHtml, HMAC, etc.)
│       └── routes.test.ts         # Integration tests vía worker.fetch (rutas, Turnstile, cookies)
├── e2e/
│   ├── meta.spec.ts               # Meta tags, OG, JSON-LD, title, lang
│   ├── i18n.spec.ts               # Toggle ES/EN, persistencia localStorage, aria-labels
│   ├── theme.spec.ts              # Toggle claro/oscuro, persistencia, aria-pressed
│   ├── sections.spec.ts           # Secciones, navegación por anclas, skip link
│   ├── projects.spec.ts           # Carrusel, lightbox, enlaces a GitHub
│   ├── contact.spec.ts            # Canales de contacto, rutas protegidas
│   └── accessibility.spec.ts      # Reduced-motion, alt text, aria-labels, skip link
├── vitest.config.ts               # Pool-workers + gate de cobertura 100% en worker.ts
└── playwright.config.ts           # webServer (build + preview), 3 proyectos
```

## Comandos

```sh
# Unit + integración (Worker runtime)
npm test                    # vitest run
npm run test:watch          # vitest en modo watch
npm run test:coverage       # vitest run --coverage (gate 100% en src/worker.ts)

# E2E (UI pública)
npm run test:e2e            # playwright test (chromium + firefox + mobile-chrome)
npm run test:e2e:ui         # playwright test --ui (modo interactivo)

# Typecheck
npx astro check             # typecheck de .astro y .ts
```

## Cobertura

`vitest.config.ts` impone **100% de líneas, funciones, ramas y sentencias** en `src/worker.ts`.

```
-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
 worker.ts |     100 |      100 |     100 |     100 |                   
-----------|---------|----------|---------|---------|-------------------
```

Si una modificación al Worker baja la cobertura del 100%, el job `test` del CI falla y bloquea el despliegue.

### Por qué Istanbul y no v8

`@vitest/coverage-v8` usa `node:inspector/promises`, un módulo de Node.js que no existe en el runtime de Cloudflare Workers. El pool-workers ejecuta los tests dentro del Workers runtime, por lo que v8 no puede instrumentar el código. Istanbul instrumenta a nivel de source code antes de la ejecución, por lo que funciona en cualquier runtime.

## Tests del Worker

Los tests del Worker se ejecutan dentro del runtime de Cloudflare Workers (no en Node.js puro), gracias a `@cloudflare/vitest-pool-workers`.

### Helpers puros (`test/worker/helpers.test.ts`)

Las funciones internas de `src/worker.ts` están exportadas para permitir unit tests directos:

- `sanitizeRedirect` — prevención de open redirect (`//`, URLs absolutas, parámetros turnstile)
- `escapeHtml` — prevención de XSS en las páginas renderizadas
- `getCookie` — parseo de cookies con `decodeURIComponent`
- `isProtectedPath` — las 3 rutas protegidas
- `base64UrlEncode` — codificación URL-safe sin padding
- `timingSafeEqual` — comparación resistente a timing attacks
- `signValue` — HMAC-SHA256 para firmar cookies
- `hasValidVerificationCookie` — validación de cookie firmada (ausente, malformada, caducada, firma incorrecta)
- `renderChallengePage` / `renderEmailPage` — HTML con escaping
- `withTurnstileReason` / `challengeRedirect` — redirección con reason

### Integración (`test/worker/routes.test.ts`)

Tests vía `worker.fetch(request, mockEnv, ctx)` con:

- `env.ASSETS` mockeado como un `Fetcher` con `vi.fn()`
- `globalThis.fetch` mockeado para interceptar la llamada a Turnstile siteverify
- Cookie firmada generada con el `COOKIE_SECRET` de test

Cobertura de flujos:

| Flujo | Tests |
|---|---|
| Ruta pública → ASSETS | ✓ |
| Ruta protegida sin cookie → 403 + challenge | ✓ (3 rutas) |
| Ruta protegida con cookie válida → contenido | ✓ (email + CV) |
| POST verify sin token → missing-token | ✓ |
| POST verify con token válido → set-cookie | ✓ |
| POST verify con token inválido → verification-failed | ✓ |
| POST verify con CF-Connecting-IP → remoteip | ✓ |
| POST verify sin redirect → default `/` | ✓ |
| Open redirect sanitization en verify | ✓ |

## Tests E2E

Playwright lanza `npm run build && npm run preview` (puerto 4321) y ejecuta tests contra la UI pública.

**Importante:** `astro preview` no ejecuta el Worker, así que las rutas protegidas por Turnstile (`/__contact-email`, `/__download-cv`) NO se testean con E2E. Esas rutas están al 100% cubiertas por los integration tests del Worker. Los E2E verifican que los enlaces apuntan a las rutas correctas, pero no el flujo Turnstile completo.

### Navegadores

| Proyecto | Dispositivo | Notas |
|---|---|---|
| `chromium` | Desktop Chrome | Cobertura principal |
| `firefox` | Desktop Firefox | Diversidad de motor |
| `mobile-chrome` | Pixel 7 | Responsive, nav móvil |

WebKit (Safari) no está incluido en la config local porque requiere dependencias de sistema (`libicu74`) que pueden no estar disponibles. Se puede añadir en CI instalando las deps con `npx playwright install --with-deps webkit`.

### Qué se testea

- **Meta**: title, lang, description, robots, canonical, OG, Twitter cards, JSON-LD, favicon, manifest, theme-color
- **i18n**: toggle ES↔EN, persistencia en localStorage, restauración tras reload, aria-labels, skip link (excluido del i18n por diseño)
- **Theme**: toggle claro/oscuro, persistencia, restauración tras reload, aria-pressed
- **Secciones**: hero, about, skills (4 categorías), projects (3), education, contact, footer, nav por anclas, skip link
- **Proyectos**: carrusel (next/prev/wrap), lightbox (abrir/cerrar/navegar), enlaces a GitHub
- **Contacto**: LinkedIn, GitHub, CV (ruta protegida), email (ruta protegida), `role="status"` aria-live
- **Accesibilidad**: skip link focus/scroll, aria-pressed, aria-labels, alt text, `prefers-reduced-motion` (revela contenido inmediatamente)

## CI

El workflow `.github/workflows/deploy.yml` tiene dos jobs:

1. **`test`** — se ejecuta en cada push a `master`:
   - `npm ci`
   - `npm run test:coverage` (gate 100% en `worker.ts`)
   - `npx playwright install --with-deps chromium firefox`
   - `npx playwright test`
   - Sube reportes de cobertura y Playwright como artifacts
2. **`deploy`** — depende de `test` (`needs: test`), solo ejecuta si los tests pasan:
   - `npm ci` + `npm run build` + `wrangler deploy`

## Troubleshooting

### `No such module "node:inspector/promises"` al correr coverage

Estás usando `@vitest/coverage-v8` en vez de `@vitest/coverage-istanbul`. Cambia el provider en `vitest.config.ts`:

```ts
coverage: { provider: "istanbul" }
```

### `Executable doesn't exist at .../firefox-XXXX/firefox/firefox`

Falta el binario de Firefox para tu versión de Playwright:

```sh
npx playwright install firefox
```

### `Host system is missing dependencies to run browsers` (WebKit)

WebKit necesita libs de sistema. En Ubuntu:

```sh
sudo npx playwright install-deps webkit
```

Si no tienes sudo, usa chromium + firefox (ya en la config por defecto).

### Los tests E2E fallan tras reload (i18n/theme)

`page.addInitScript(() => localStorage.clear())` se ejecuta en cada navegación, incluyendo reloads, borrando la persistencia. Para tests de persistencia, limpia localStorage con `page.evaluate()` antes del `goto` inicial, no con `addInitScript`.
