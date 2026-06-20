# Performance

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="espanol"></a>

## Espanol

## Estrategia

El sitio es **estatico-first**: Astro genera HTML/CSS/JS en build time. No hay JS runtime de framework. El unico JS es GSAP (ES module, tree-shakeable) y la logica de UI en el `<script>` de la pagina.

## Imagenes

| Tecnica | Implementacion |
|---|---|
| Formatos modernos | AVIF + WebP + PNG via `<picture>` con `<source>` |
| Lazy loading | `loading="lazy"` en todas las imagenes excepto el primer slide de cada carrusel y la foto del hero |
| Eager loading | Hero photo y primer slide de cada carrusel (`loading="eager"`) |
| `object-fit` | `object-contain` en capturas, `object-cover` en hero photo |

## Video

| Tecnica | Implementacion |
|---|---|
| Formatos | WebM (optimizado) primario + MP4 (compatible) fallback |
| Autoplay | `autoplay muted loop playsinline` |
| IntersectionObserver | Reproduce cuando el video entra en viewport (threshold 0.35) |
| Pointer enter | Reproduce al hover del cursor |
| Fallback | Si autoplay falla, muestra `controls` nativos |
| Preload | `preload="auto"` para el video principal |

## Fuentes

- **Sin web font cargada por CSS** — la fuente Inter se espera del sistema o se anade via `@font-face` en deploy.
- **Stack de fallback**: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`.
- En dispositivos Apple, resuelve a SF Pro. En otros, a la sans-serif del sistema.
- **No hay FOUT/FOIT** porque no hay `@font-face` con `display: swap` en el CSS actual.

## CSS

- **Tailwind CSS 4** via plugin Vite — solo se genera el CSS usado (purge automatico).
- **Design tokens** en `global.css` via CSS custom properties — sin archivos CSS adicionales.
- No hay CSS critico inline adicional — el CSS de Astro se inyecta automaticamente.

## JS

- **GSAP** es el unico paquete JS. Se importa como ES module dentro del `<script>` de la pagina.
- No hay JS de Astro runtime (`output: 'static'`).
- `prefers-reduced-motion` desactiva todas las animaciones GSAP inmediatamente.

## Caching

- Los assets estaticos se sirven desde Cloudflare Workers Assets con caching en edge.
- Las rutas protegidas usan `cache-control: no-store`.
- El CV usa `cache-control: private, max-age=0, must-revalidate`.

---

<a id="english"></a>

## English

## Strategy

The site is **static-first**: Astro generates HTML/CSS/JS at build time. There is no framework runtime JS. The only JS is GSAP (ES module, tree-shakeable) and the UI logic in the page's `<script>`.

## Images

| Technique | Implementation |
|---|---|
| Modern formats | AVIF + WebP + PNG via `<picture>` with `<source>` |
| Lazy loading | `loading="lazy"` on all images except first carousel slide and hero photo |
| Eager loading | Hero photo and first carousel slide (`loading="eager"`) |
| `object-fit` | `object-contain` on screenshots, `object-cover` on hero photo |

## Video

| Technique | Implementation |
|---|---|
| Formats | WebM (optimized) primary + MP4 (compatible) fallback |
| Autoplay | `autoplay muted loop playsinline` |
| IntersectionObserver | Plays when video enters viewport (threshold 0.35) |
| Pointer enter | Plays on cursor hover |
| Fallback | If autoplay fails, shows native `controls` |
| Preload | `preload="auto"` for main video |

## Fonts

- **No web font loaded by CSS** — Inter is expected from the system or added via `@font-face` on deploy.
- **Fallback stack**: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`.
- On Apple devices, resolves to SF Pro. On others, to the system sans-serif.
- **No FOUT/FOIT** because there is no `@font-face` with `display: swap` in the current CSS.

## CSS

- **Tailwind CSS 4** via Vite plugin — only used CSS is generated (automatic purge).
- **Design tokens** in `global.css` via CSS custom properties — no additional CSS files.
- No additional critical CSS inline — Astro injects CSS automatically.

## JS

- **GSAP** is the only JS package. Imported as an ES module inside the page's `<script>`.
- No Astro runtime JS (`output: 'static'`).
- `prefers-reduced-motion` disables all GSAP animations immediately.

## Caching

- Static assets are served from Cloudflare Workers Assets with edge caching.
- Protected routes use `cache-control: no-store`.
- CV uses `cache-control: private, max-age=0, must-revalidate`.
