# SEO

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="espanol"></a>

## Espanol

## Meta tags

| Tag | Valor | Ubicacion |
|---|---|---|
| `<title>` | Jose Carlos Gomez R. \| Ingeniero de Software Full-Stack | `index.astro` |
| `meta[name=description]` | Descripcion profesional del autor | `index.astro` |
| `meta[name=keywords]` | Jose Carlos Gomez, ingeniero, React, Next.js, Astro, etc. | `index.astro` |
| `meta[name=robots]` | `index, follow, max-image-preview:large` | `index.astro` |
| `meta[name=author]` | Jose Carlos Gomez R. | `index.astro` |
| `meta[name=theme-color]` | `#ffffff` (light) / `#000000` (dark) via `prefers-color-scheme` | `index.astro` |
| `link[rel=canonical]` | `https://portafoliojosecarlos.com/` | `index.astro` |

## Open Graph

| Propiedad | Valor |
|---|---|
| `og:locale` | `es_CO` |
| `og:site_name` | Portafolio Jose Carlos Gomez R. |
| `og:type` | `website` |
| `og:title` | Titulo del sitio |
| `og:description` | Descripcion social |
| `og:image` | `https://portafoliojosecarlos.com/og-image.png?v=2` (1200x630) |
| `og:image:type` | `image/png` |
| `og:image:width` | 1200 |
| `og:image:height` | 630 |

## Twitter Card

| Propiedad | Valor |
|---|---|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Titulo del sitio |
| `twitter:description` | Descripcion social |
| `twitter:image` | OG image (1200x630) |

## JSON-LD (Structured Data)

El sitio incluye dos entidades Schema.org en `@graph`:

1. **Person** (`@type: Person`) — nombre, jobTitle, url, image, description, sameAs (LinkedIn, GitHub), knowsAbout (stack tecnologico).
2. **WebSite** (`@type: WebSite`) — url, name, description, inLanguage (`es-CO`), publisher (ref a Person).

## Sitemap y robots

- **`robots.txt`** — permite todos los user-agents, apunta a `https://portafoliojosecarlos.com/sitemap.xml`.
- **`sitemap.xml`** — lista la URL principal del portafolio.

## Rutas noindex

Las paginas renderizadas por el Worker (challenge Turnstile, email) incluyen `<meta name="robots" content="noindex" />` para evitar indexacion.

---

<a id="english"></a>

## English

## Meta tags

| Tag | Value | Location |
|---|---|---|
| `<title>` | Jose Carlos Gomez R. \| Full-Stack Software Engineer | `index.astro` |
| `meta[name=description]` | Professional description | `index.astro` |
| `meta[name=keywords]` | Jose Carlos Gomez, engineer, React, Next.js, Astro, etc. | `index.astro` |
| `meta[name=robots]` | `index, follow, max-image-preview:large` | `index.astro` |
| `meta[name=author]` | Jose Carlos Gomez R. | `index.astro` |
| `meta[name=theme-color]` | `#ffffff` (light) / `#000000` (dark) via `prefers-color-scheme` | `index.astro` |
| `link[rel=canonical]` | `https://portafoliojosecarlos.com/` | `index.astro` |

## Open Graph

| Property | Value |
|---|---|
| `og:locale` | `es_CO` |
| `og:site_name` | Portfolio Jose Carlos Gomez R. |
| `og:type` | `website` |
| `og:title` | Site title |
| `og:description` | Social description |
| `og:image` | `https://portafoliojosecarlos.com/og-image.png?v=2` (1200x630) |
| `og:image:type` | `image/png` |
| `og:image:width` | 1200 |
| `og:image:height` | 630 |

## Twitter Card

| Property | Value |
|---|---|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Site title |
| `twitter:description` | Social description |
| `twitter:image` | OG image (1200x630) |

## JSON-LD (Structured Data)

The site includes two Schema.org entities in a `@graph`:

1. **Person** (`@type: Person`) — name, jobTitle, url, image, description, sameAs (LinkedIn, GitHub), knowsAbout (tech stack).
2. **WebSite** (`@type: WebSite`) — url, name, description, inLanguage (`es-CO`), publisher (ref to Person).

## Sitemap and robots

- **`robots.txt`** — allows all user-agents, points to `https://portafoliojosecarlos.com/sitemap.xml`.
- **`sitemap.xml`** — lists the main portfolio URL.

## noindex routes

Worker-rendered pages (Turnstile challenge, email) include `<meta name="robots" content="noindex" />` to prevent indexing.
