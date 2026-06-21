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
miportafolio/
├── src/
│   └── worker/                          # Worker Cloudflare (modular)
│       ├── index.ts                     # Entry point + re-exports para tests
│       ├── types.ts                     # Env + constantes
│       ├── lib/                         # Helpers puros
│       │   ├── cookie.ts
│       │   ├── crypto.ts                # HMAC, base64url, timingSafeEqual
│       │   ├── sanitize-redirect.ts
│       │   ├── escape-html.ts
│       │   ├── challenge-redirect.ts
│       │   ├── challenge-styles.ts
│       │   ├── verification-cookie.ts
│       │   └── is-protected-path.ts
│       ├── routes/                      # Handlers HTTP
│       │   ├── turnstile-verify.ts
│       │   └── protected.ts
│       └── pages/                       # Renderers HTML
│           ├── challenge.ts
│           └── email.ts
├── tests/
│   ├── unit/
│   │   ├── worker/
│   │   │   ├── helpers.test.ts          # Unit tests de helpers puros
│   │   │   └── routes.test.ts           # Integration tests via worker.fetch
│   │   └── data/                        # Tests de data shape (reservado)
│   ├── e2e/
│   │   ├── meta.spec.ts                 # Meta tags, OG, JSON-LD, title, lang
│   │   ├── i18n.spec.ts                 # Toggle ES/EN, persistencia, aria-labels
│   │   ├── theme.spec.ts                # Toggle claro/oscuro, persistencia, aria-pressed
│   │   ├── sections.spec.ts             # Secciones, navegación por anclas, skip link
│   │   ├── projects.spec.ts             # Carrusel, lightbox, enlaces a GitHub
│   │   ├── contact.spec.ts              # Canales de contacto, rutas protegidas
│   │   └── accessibility.spec.ts        # Reduced-motion, alt text, aria-labels, skip link
│   └── fixtures/                        # JSON fixtures
├── vitest.config.ts                     # Pool-workers + gate de cobertura 100% en src/worker/**/*.ts
└── playwright.config.ts                 # testDir: ./tests/e2e, webServer (build + preview), 3 proyectos
```

## Comandos

```sh
# Unit + integración (Worker runtime)
npm test                    # vitest run
npm run test:watch          # vitest en modo watch
npm run test:coverage       # vitest run --coverage (gate 100% en src/worker/**/*.ts)

# E2E (UI pública)
npm run test:e2e            # playwright test (chromium + firefox + mobile-chrome)
npm run test:e2e:ui         # playwright test --ui (modo interactivo)

# Typecheck
npx astro check             # typecheck de .astro y .ts
```

## Cobertura

`vitest.config.ts` configura un **gate de 100%** sobre `src/worker/**/*.ts`:

- `perFile: true` — cada archivo del Worker debe llegar al 100%.
- Métricas: `lines`, `functions`, `branches`, `statements` todas al 100%.
- Si un archivo nuevo del Worker queda sin cubrir, CI falla y bloquea el deploy.

## Tests del Worker

Los tests en `tests/unit/worker/` se ejecutan dentro del **runtime real de Cloudflare Workers** (no Node), vía `@cloudflare/vitest-pool-workers`. Esto garantiza que `crypto.subtle`, `fetch` y los bindings se comportan como en producción.

**Patrón típico para tests de rutas:**

```ts
import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import worker, { type Env } from "../../../src/worker";

const env: Env = {
  ASSETS: { fetch: vi.fn() } as unknown as Env["ASSETS"],
  PUBLIC_TURNSTILE_SITE_KEY: "0xSITEKEY",
  TURNSTILE_SECRET_KEY: "turnstile-secret",
  COOKIE_SECRET: "cookie-secret",
  CONTACT_EMAIL: "contact@example.test",
};

const ctx = createExecutionContext();
const response = await worker.fetch(request, env, ctx);
await waitOnExecutionContext(ctx);
```

**Para tests de Turnstile** mockear `globalThis.fetch` con `vi.stubGlobal("fetch", mockFn)`.

**Para tests de helpers puros** importarlos directamente desde `src/worker` (la API se re-exporta desde `index.ts`).

## Tests E2E

Los tests E2E apuntan a la UI pública servida por `astro preview` en `http://localhost:4321/`. **No ejercitan rutas protegidas por el Worker** (el preview no corre el Worker); esas rutas se cubren en los tests de integración del Worker.

Áreas cubiertas:

- **Meta tags** (`meta.spec.ts`): title, description, OG, Twitter, JSON-LD, hreflang, `lang="es"`.
- **i18n** (`i18n.spec.ts`): toggle ES/EN, persistencia en `localStorage`, `aria-label` actualizado.
- **Theme** (`theme.spec.ts`): toggle claro/oscuro, persistencia, `aria-pressed`.
- **Sections** (`sections.spec.ts`): presencia de secciones, navegación por anclas, skip link.
- **Projects** (`projects.spec.ts`): carrusel de imágenes, lightbox, enlaces externos a GitHub.
- **Contact** (`contact.spec.ts`): canales visibles, rutas `__download-cv` y `__contact-email` accesibles vía UI.
- **Accessibility** (`accessibility.spec.ts`): `prefers-reduced-motion`, alt text, aria-labels, skip link.

## CI

`.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run test:coverage` — corre Vitest y aplica el gate 100% sobre el Worker.
3. `npx playwright install --with-deps chromium firefox`
4. `npx playwright test` — corre E2E.
5. Sube `coverage/` y `playwright-report/` como artifacts.
6. Si los tests pasan, `npm run build` y deploy con `cloudflare/wrangler-action@v3`.

## Troubleshooting

| Problema | Causa probable | Solución |
|---|---|---|
| `Failed to load native binding` en Vitest | Versión incompatible de `@cloudflare/vitest-pool-workers` | Confirmar que coincide con `vitest` y `wrangler` |
| `Type 'Fetcher' is not assignable...` | Falta `@cloudflare/workers-types` | Ya está en `tsconfig.json` (`types: ["@cloudflare/workers-types"]`) |
| `Module not found: ~/*` | Alias no configurado | Alias ya está en `vitest.config.ts` y `tsconfig.json` |
| E2E falla con `net::ERR_CONNECTION_REFUSED` | El webServer no termino de arrancar | Aumentar `timeout` en `playwright.config.ts` (ya está en 120s) |
| Coverage gate falla tras refactor | Una rama nueva no testeada | Añadir test en `tests/unit/worker/` que cubra la rama |
| `astro check` reporta `Cannot find module 'src/data/...'` desde un `.astro` | Path relativo mal escrito | Usar paths relativos desde el archivo `.astro` o alias `~/*` |
