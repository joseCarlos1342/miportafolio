# Content Guide

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="espanol"></a>

## Espanol

## Agregar un proyecto

1. **Capturas:** crea una carpeta `public/projects/{slug}/` con imagenes en 3 formatos:
   - `preview-1.avif`, `preview-1.webp`, `preview-1.png`
   - Hasta 7 capturas por proyecto.
   - Para video: `demo-optimized.webm` + `demo-compatible.mp4`.

2. **En `index.astro`:** anade un `<article class="project-card">` en la seccion `#projects`. Usa el patron existente:
   ```astro
   const projectScreens = createScreens("{slug}");
   ```
   Y referencia `projectLinks.{slug}` con la URL del repositorio.

3. **i18n:** cada texto traducible lleva `data-es="..."` y `data-en="..."`.

## Sistema i18n (ES/EN)

El i18n funciona sin libreria. Usa atributos `data-*`:

| Atributo | Uso |
|---|---|
| `data-es` | Texto en espanol |
| `data-en` | Texto en ingles |
| `data-i18n-aria-es` | `aria-label` en espanol |
| `data-i18n-aria-en` | `aria-label` en ingles |

El toggle esta en el boton `#languageToggle`. La funcion `setText(lang)` actualiza todos los elementos. El idioma se persiste en `localStorage` bajo `lang`.

## Iconos de tecnologia

1. Coloca el SVG en `public/tech/{name}.svg`.
2. En la seccion `#skills`, anade un `<div class="tech-pill">` con `style="--tech-color: #hex"`.
3. El color `--tech-color` controla el glow radial del pill.

## Favicon y PWA

- **Scripts:** `scripts/generate-icons.cjs` genera `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` desde `public/favicon.svg`.
- **`scripts/generate-ico.cjs`** genera `favicon.ico`.
- **Manifest:** `public/site.webmanifest`.

## Open Graph

- `public/og-image.png` (1200x630) — imagen para redes sociales.
- `public/og-image.svg` — version vectorial.

---

<a id="english"></a>

## English

## Adding a project

1. **Screenshots:** create a folder `public/projects/{slug}/` with images in 3 formats:
   - `preview-1.avif`, `preview-1.webp`, `preview-1.png`
   - Up to 7 screenshots per project.
   - For video: `demo-optimized.webm` + `demo-compatible.mp4`.

2. **In `index.astro`:** add an `<article class="project-card">` in the `#projects` section. Use the existing pattern:
   ```astro
   const projectScreens = createScreens("{slug}");
   ```
   And reference `projectLinks.{slug}` with the repository URL.

3. **i18n:** each translatable text carries `data-es="..."` and `data-en="..."`.

## i18n system (ES/EN)

The i18n works without a library. It uses `data-*` attributes:

| Attribute | Use |
|---|---|
| `data-es` | Spanish text |
| `data-en` | English text |
| `data-i18n-aria-es` | `aria-label` in Spanish |
| `data-i18n-aria-en` | `aria-label` in English |

The toggle is in the `#languageToggle` button. The `setText(lang)` function updates all elements. The language is persisted in `localStorage` under `lang`.

## Technology icons

1. Place the SVG in `public/tech/{name}.svg`.
2. In the `#skills` section, add a `<div class="tech-pill">` with `style="--tech-color: #hex"`.
3. The `--tech-color` controls the pill's radial glow.

## Favicon and PWA

- **Scripts:** `scripts/generate-icons.cjs` generates `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` from `public/favicon.svg`.
- **`scripts/generate-ico.cjs`** generates `favicon.ico`.
- **Manifest:** `public/site.webmanifest`.

## Open Graph

- `public/og-image.png` (1200x630) — social media image.
- `public/og-image.svg` — vector version.
