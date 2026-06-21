---
version: alpha
name: jose-carlos-portfolio
description: A bilingual (ES/EN) full-stack developer portfolio with an Apple-inspired minimal aesthetic. Alternating light parchment and near-black canvas sections frame a terminal-style hero card, project case studies with image carousels, a skills grid, an education board, and a Turnstile-gated contact panel. A single Action Blue accent carries every interactive signal; Inter at weight 600 with negative letter-spacing handles every headline; one soft product shadow gives imagery weight; GSAP powers reveal, magnetic and 3D-tilt micro-interactions.

colors:
  primary: "#0066cc"
  primary-focus: "#0071e3"
  primary-on-dark: "#2997ff"
  ink: "#1d1d1f"
  body-muted: "#6e6e73"
  canvas: "#ffffff"
  canvas-parchment: "#f5f5f7"
  surface: "#fafafc"
  surface-raised: "#ffffff"
  surface-dark: "#272729"
  surface-frame: "#07080d"
  surface-void: "#050508"
  on-primary: "#ffffff"
  on-dark: "#ffffff"

typography:
  hero-display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 107.2px
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: -0.055em
  display-lg:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 60px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.045em
  display-md:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.04em
  lead:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 24px
    fontWeight: 300
    lineHeight: 1.67
    letterSpacing: -0.03em
  body-lg:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.78
    letterSpacing: -0.025em
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  eyebrow:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.22em
  nav-link:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: -0.02em
  button:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  button-sm:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  mono-display:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace"
    fontSize: 30px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: -0.04em
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  none: 0px
  xs: 12px
  sm: 16px
  md: 20px
  lg: 24px
  xl: 32px
  pill: 9999px

spacing:
  xxs: 8px
  xs: 12px
  sm: 16px
  md: 20px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px
  container: 1280px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-primary-focus:
    backgroundColor: "{colors.primary-focus}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-ghost:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-ghost-on-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
  nav-toggle:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.pill}"
    padding: 10px 16px
  global-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
  hero-photo-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 20px
  terminal-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.mono-display}"
    rounded: "{rounded.lg}"
    padding: 20px
  skill-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
    padding: 24px
  tech-pill:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 12px
  project-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-md}"
    rounded: "{rounded.xl}"
    padding: 40px
  preview-panel:
    backgroundColor: "{colors.surface-frame}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    padding: 8px
  carousel-control:
    backgroundColor: "{colors.surface-frame}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    size: 36px
  education-feature:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    rounded: 28px
    padding: 24px
  education-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: 21.6px
    padding: 20px
  education-stat:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    rounded: 17.6px
    padding: 16px
  contact-shell:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.xl}"
    padding: 48px
  contact-panel:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.lg}"
    padding: 24px
  contact-action:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 14px
  contact-action-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 14px
  preview-dialog:
    backgroundColor: "{colors.surface-void}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    padding: 0px
  about-tile:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 96px 32px
  projects-section:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 96px 32px
  skills-section:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 96px 32px
  footer:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.body-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: 32px
  text-link:
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  text-link-on-dark:
    textColor: "{colors.primary-on-dark}"
    typography: "{typography.body}"
---

## Overview

Jose Carlos Gomez R.'s portfolio is a single-page bilingual (Spanish / English) site built with Astro and deployed to Cloudflare Workers. The design language is **Apple-inspired minimalism adapted for a developer case study**: alternating full-bleed canvas sections — light parchment and near-black — act as both rhythm and divider, with no decorative borders between them. A single Action Blue (`{colors.primary}` — #0066cc) carries every interactive signal. Inter at weight 600 with negative letter-spacing produces the signature tight headline cadence. Exactly one drop-shadow exists in the entire system, reserved for product imagery and preview panels. GSAP powers three micro-interaction families — reveal-on-scroll, magnetic buttons, and 3D tilt on project cards — all gated behind `prefers-reduced-motion`.

The page is structured as six stacked sections: a **hero** with a terminal-style code card, an **about** tile on parchment, a **skills** grid of four category cards, a **projects** band on near-black with image carousels and a gameplay video, an **education** board with feature + card layout, and a **contact** shell gated by Cloudflare Turnstile. A fixed frosted nav bar (64px, backdrop-blur, 82% canvas opacity) persists across all sections with theme and language toggles. The entire experience is static-first (Astro `output: 'static'`) with a Cloudflare Worker intercepting only three protected routes.

**Key Characteristics:**
- Alternating full-bleed sections: white / parchment ↔ near-black — the surface change IS the divider; no decorative borders between sections.
- Single blue accent (`{colors.primary}` — #0066cc) for every interactive element: primary CTAs, text links, focus rings. No second brand color.
- Three button grammars: blue pill CTAs (`{rounded.pill}`), ghost pills with hairline border, and dark-on-dark ghost pills for project cards.
- Inter (variable, via system stack fallback) at weight 600 for all headlines with negative letter-spacing (`-0.04 → -0.055em`).
- Weight 300 is rare and deliberate — reserved for the hero subtitle and large leads.
- One drop-shadow (`rgba(0, 0, 0, 0.22) 3px 5px 30px`) for product imagery and preview panels; never on cards, buttons, or text.
- GSAP micro-interactions: reveal-on-scroll (opacity + y), magnetic buttons (pointer-follow with elastic return), 3D tilt on project preview panels (rotateX/rotateY with perspective 900).
- Bilingual ES/EN via `data-es` / `data-en` attributes toggled client-side; no i18n library.
- Dark mode via `.dark` class on `<html>` swapping all CSS custom properties; persisted in `localStorage`.

## Colors

> **Theme model:** the portfolio ships both light and dark themes via CSS custom properties on `:root` and `:root.dark`. The tokens below are the **light theme** (canonical). Dark theme counterparts are documented in the Dark Mode section.

### Brand & Accent
- **Action Blue** (`{colors.primary}` — #0066cc): The single brand-level interactive color. All primary pill CTAs ("Ver proyectos"), text links on light surfaces, and the focus ring root. In dark theme this swaps to `{colors.primary-on-dark}` (#2997ff).
- **Focus Blue** (`{colors.primary-focus}` — #0071e3): A marginally brighter sibling used for the keyboard focus outline on buttons (`outline: 2px solid`). Referenced by `{component.button-primary-focus}`.
- **Sky Link Blue** (`{colors.primary-on-dark}` — #2997ff): The dark-surface variant of Action Blue. Used for text links and inline callouts on near-black tiles where #0066cc would disappear. In dark theme this becomes the primary accent.

### Surface
- **Pure White** (`{colors.canvas}` — #ffffff): The dominant light canvas. Used for the hero, skills section, contact action buttons, and nav bar background.
- **Parchment** (`{colors.canvas-parchment}` — #f5f5f7): The signature off-white. Used for the about tile, education section, contact shell, and footer. Just different enough from white to create section rhythm.
- **Pearl** (`{colors.surface}` — #fafafc): A near-white used as the fill for the hero photo card — lighter than parchment so the card reads as a card against the white hero canvas.
- **Raised White** (`{colors.surface-raised}` — #ffffff): Semantically distinct from canvas; used for skill cards, tech pills, education cards, and the contact panel — cards that sit on a parchment or dark surface and need to read as elevated.
- **Near-Black Tile** (`{colors.surface-dark}` — #272729): The dark band for the projects section, the terminal card, and dark ghost buttons. In dark theme this deepens to #000000.
- **Frame Black** (`{colors.surface-frame}` — #07080d): The inner frame of project preview panels — a near-black slightly darker than the project card surface, creating a subtle inset for screenshots and video.
- **Void Black** (`{colors.surface-void}` — #050508): The preview dialog (lightbox) background — the darkest surface in the system, reserved for the fullscreen media viewer.

### Text
- **Near-Black Ink** (`{colors.ink}` — #1d1d1f): Every headline and body paragraph on light surfaces. Chosen over pure black to keep the page feeling photographic.
- **Body Muted** (`{colors.body-muted}` — #6e6e73): Secondary copy, footer text, and muted descriptions. Sits at 4.68:1 contrast on parchment — passes WCAG AA.
- **On Primary** (`{colors.on-primary}` — #ffffff): Text on Action Blue buttons.
- **On Dark** (`{colors.on-dark}` — #ffffff): All text on near-black tiles, the terminal card, project cards, and the preview dialog.

### Hairlines & Borders (not tokenized — documented in prose)
The portfolio uses CSS custom property `--hairline` for 1px borders on cards, pills, and section dividers. In light theme: `rgba(0, 0, 0, 0.09)`. In dark theme: `rgba(255, 255, 255, 0.12)`. These are border-only values with no bg/text semantics, so they are not defined as color tokens; they live as CSS variables in `global.css`.

### Product Shadow (not tokenized — documented in prose)
A single drop-shadow `rgba(0, 0, 0, 0.22) 3px 5px 30px 0` (light) / `rgba(0, 0, 0, 0.55) 3px 5px 30px 0` (dark) applied to the hero photo card, preview panels, and contact shell. Not a color token — it is a shadow expression.

## Typography

### Font Family
- **Primary stack**: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`. Inter is the designed-for font; the system stack is the fallback (on Apple devices it resolves to SF Pro).
- **Mono stack**: `ui-monospace, SFMono-Regular, Menlo, Monaco, monospace` — used only inside the terminal-style hero card for the `build() / deploy() / scale()` code block.
- **No web font is loaded** — Inter is expected to be available via the system or a `@font-face` declaration added per deployment. The CSS references it by name; if absent, the system stack carries the entire site with no layout shift.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 107.2px | 600 | 0.98 | -0.055em | Hero h1 ("Jose Carlos / Gomez R.") — the tightest tracking in the system |
| `{typography.display-lg}` | 60px | 600 | 1.05 | -0.045em | Section h2 titles (About, Skills, Projects, Education, Contact) |
| `{typography.display-md}` | 48px | 600 | 1.05 | -0.04em | Project h3 titles inside project cards |
| `{typography.lead}` | 24px | 300 | 1.67 | -0.03em | Hero subtitle, section lead paragraphs — the rare weight 300 |
| `{typography.body-lg}` | 18px | 400 | 1.78 | -0.025em | Project descriptions, about body copy, education descriptions |
| `{typography.body}` | 16px | 400 | 1.5 | 0 | Default body, tech pill labels, text links |
| `{typography.body-strong}` | 16px | 600 | 1.5 | 0 | Skill card titles ("Frontend", "Backend"), education card titles |
| `{typography.eyebrow}` | 14px | 600 | 1.4 | 0.22em | Uppercase section eyebrows ("Proyectos destacados"), project stack labels |
| `{typography.nav-link}` | 14px | 500 | 1.0 | -0.02em | Nav links (Proyectos, Stack, Contacto), nav brand "JCG" |
| `{typography.button}` | 16px | 500 | 1.0 | 0 | Primary and secondary button labels |
| `{typography.button-sm}` | 14px | 500 | 1.0 | 0 | Nav toggle buttons (theme, language), dark ghost buttons |
| `{typography.mono-display}` | 30px | 400 | 1.6 | -0.04em | Terminal card code block (`build(secureProducts)` etc.) |
| `{typography.caption}` | 14px | 400 | 1.5 | 0 | Contact panel secondary text, footer copyright, dialog labels |

### Principles
- **Negative letter-spacing at display sizes.** Every headline at 18px and up carries a tracking tighten (`-0.025 → -0.055em`). The hero h1 is the tightest at `-0.055em`. Never used on body (16px) or below.
- **Weight 300 is rare and deliberate.** Used only on `{typography.lead}` (24px) for the hero subtitle and section leads — a light-atmosphere cue. Never used for buttons or UI labels.
- **Weight 600, not 700, for headlines.** All display tokens sit at 600. Weight 700 is absent from the system.
- **Weight 500 for buttons and nav.** Buttons and nav links use 500 — the system-wide "interactive label" weight. Body copy is 400; strong inline is 600.
- **Uppercase eyebrows with wide tracking.** `{typography.eyebrow}` at 14px / 600 / uppercase / `0.22em` tracking — the widest tracking in the system, used for section labels and project stack tags.
- **Mono is decorative, not structural.** The monospace stack appears only in the terminal hero card as a visual metaphor for "developer." It never carries body copy or navigation.

## Layout

### Spacing System
- **Base unit:** 8px. All spacing snaps to multiples of 4 or 8.
- **Tokens:** `{spacing.xxs}` 8px · `{spacing.xs}` 12px · `{spacing.sm}` 16px · `{spacing.md}` 20px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px · `{spacing.container}` 1280px.
- **Section vertical padding:** `{spacing.section}` (96px) on every section — applied as `py-24` in Tailwind. On mobile, horizontal padding is 20px (`px-5`); on `sm` and up, 32px (`px-8`).
- **Container max width:** `{spacing.container}` (1280px) via `max-w-7xl` — all section content is centered within this.
- **Card padding:** `{spacing.lg}` (24px) inside skill cards; 20px inside education cards; 40px inside project cards.
- **Button padding:** 12px vertical × 24px horizontal for primary/secondary; 10px × 16px for nav toggles.

### Grid & Container
- **Hero:** 2-column grid (`lg:grid-cols-[1.05fr_0.95fr]`) — text left, terminal photo card right. Collapses to single column below `lg`.
- **Skills:** 4-column grid (`xl:grid-cols-4`) of category cards. Collapses to 2 columns on `md`, 1 on mobile.
- **Projects:** vertical stack of full-width project cards. Each card is a 2-column grid (`lg:grid-cols-[1.05fr_0.95fr]`) alternating image-left / image-right.
- **Education:** 2-column grid (`lg:grid-cols-[0.82fr_1.18fr]`) — title block left, education board right.
- **Contact:** 2-column grid (`lg:grid-cols-[1.05fr_0.95fr]`) inside the shell — copy left, action panel right.

### Whitespace Philosophy
Whitespace is the pedestal for content. Every section begins with 96px of vertical air. Headlines have 24–40px of space below before body copy begins. Project cards maintain 40px internal padding. The contact shell uses `clamp(1.4rem, 4vw, 3rem)` fluid padding — the only place a `clamp()` appears, allowing the contact panel to breathe on desktop without crushing on mobile.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Full-bleed section tiles, body sections |
| Hairline | 1px `var(--hairline)` border | Skill cards, tech pills, education cards, contact actions, nav toggles |
| Backdrop blur | `backdrop-filter: blur(N)` on canvas 82% | Global nav bar (frosted glass) |
| Backdrop blur | `backdrop-filter: blur(18px)` on raised 90% | Education feature card, contact panel |
| Product shadow | `rgba(0, 0, 0, 0.22) 3px 5px 30px 0` | Hero photo card, preview panels, contact shell |

**Shadow philosophy.** Exactly one drop-shadow expression exists, applied to product imagery and preview panels — never to cards, buttons, or text. Elevation in the UI comes from (a) surface-color change (light tile ↔ dark tile), (b) backdrop-blur on the nav and raised cards, and (c) hairline borders. The single shadow gives imagery weight, not UI hierarchy.

### 3D Tilt (GSAP)
Project preview panels respond to pointer movement with a 3D tilt: `rotateY: px * 7, rotateX: py * -7` with `transformPerspective: 900`. On pointer leave, the panel springs back with `elastic.out(1, 0.5)`. This is the only 3D transform in the system and is disabled under `prefers-reduced-motion`.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed section tiles (about, projects, skills, footer) — tiles touch edges |
| `{rounded.xs}` | 12px | Tech logo icons inside tech pills |
| `{rounded.sm}` | 16px | Tech pills, inner image rounding inside preview panels, terminal card inner content |
| `{rounded.md}` | 20px | Skill category cards |
| `{rounded.lg}` | 24px | Preview panels, contact panel, terminal card, preview dialog |
| `{rounded.xl}` | 32px | Project cards, hero photo card, contact shell |
| `{rounded.pill}` | 9999px | All buttons, nav toggles, carousel controls, contact actions — the signature pill |

### Photography Geometry
- **Hero photo:** full-width inside the photo card, `h-[22rem]` (352px) tall, `object-cover` with `object-position: 50% 30%` to frame the subject. Wrapped in two nested rounded containers (32px outer, 23.2px inner).
- **Project screenshots:** `aspect-video` (16:9) inside the preview panel, `object-contain` on a `{colors.surface-frame}` background. Served as AVIF / WebP / PNG via `<picture>` with lazy-loading.
- **Project video:** `aspect-video` with `autoplay muted loop playsinline` — WebM (optimized) primary, MP4 (compatible) fallback. Plays on intersection via `IntersectionObserver` at 0.35 threshold.
- **Education logos:** 3.45rem (55.2px) square, `{rounded.xs}` (12px) internal, `object-fit: contain` at 86% fill.
- **Tech logos:** 2.5rem (40px) square, `{rounded.xs}` (12px), `object-fit: contain`.

## Components

### Global Navigation
**`global-nav`** — Fixed, frosted nav bar pinned to the top. Background `{colors.canvas}` at 82% opacity with `backdrop-filter: blur(N)`, height 64px. Content: brand "JCG" left (`{typography.nav-link}` 14px / 500 / -0.02em), inline links center (hidden on mobile, shown on `md`), toggle cluster right. Text `{colors.ink}`. Bottom hairline border.

**`nav-toggle`** — Pill-shaped toggle buttons for theme and language. Background `{colors.canvas}`, text `{colors.ink}` in `{typography.button-sm}` (14px / 500), rounded `{rounded.pill}`, padding 10px × 16px, min-height 44px. Active state: `scale(0.95)`. Both toggles are magnetic (GSAP pointer-follow).

### Buttons
**`button-primary`** — The signature action. Background `{colors.primary}` (Action Blue #0066cc), text `{colors.on-primary}` in `{typography.button}` (16px / 500), rounded `{rounded.pill}`, padding 12px × 24px, min-height 44px. Used for "Ver proyectos" and the contact LinkedIn button. Active state: `transform: scale(0.95)`. Magnetic.
- Focus state: `{component.button-primary-focus}` — 2px solid `{colors.primary-focus}` outline at 4px offset.

**`button-secondary`** — Ghost pill CTA paired with primary on the hero ("LinkedIn"). Background `{colors.canvas}`, text `{colors.primary}` (Action Blue), rounded `{rounded.pill}`, padding 12px × 24px. Reads as a "blue ghost pill."

**`button-ghost`** — Tertiary pill on light surfaces ("Descargar CV"). Background `{colors.canvas}`, text `{colors.ink}`, rounded `{rounded.pill}`, padding 12px × 24px. Hairline border.

**`button-ghost-on-dark`** — Tertiary pill on dark project cards ("Ver en GitHub"). Background `{colors.surface-dark}`, text `{colors.on-dark}` in `{typography.button-sm}` (14px / 500), rounded `{rounded.pill}`, padding 12px × 20px. Translucent white border (`border-white/18`). Hover: border + text shift toward `{colors.primary-on-dark}`.

**`text-link`** — Inline body links in `{colors.primary}`. No underline by default.

**`text-link-on-dark`** — Inline links on dark tiles in `{colors.primary-on-dark}` (Sky Link Blue #2997ff).

### Hero
**`hero-photo-card`** — The hero right-column card. Background `{colors.surface}` (pearl) with a radial gradient overlay mixing `{colors.primary}` at 26%, rounded `{rounded.xl}` (32px), padding 20px. Contains a nested image container (23.2px radius) with the profile photo and a `{component.terminal-card}` below it.

**`terminal-card`** — A macOS-terminal metaphor inside the hero card. Background `{colors.surface-dark}` (#272729), text `{colors.on-dark}` in `{typography.mono-display}` (30px monospace), rounded `{rounded.lg}` (24px), padding 20px. Top: three traffic-light dots (#ff5f57, #ffbd2e, #28c840). Below: `~/portfolio` path in white/58, then three colored code lines (`build(secureProducts)` in #7dd3fc, `deploy(fastExperiences)` in #86efac, `scale(realTimeSystems)` in #f0abfc). Bottom: 3-column stat grid (PWA / RLS / RTC) in white/64 on white/8 chips.

### Skills
**`skill-card`** — Category card in the skills grid. Background `{colors.surface-raised}`, text `{colors.ink}` in `{typography.body-strong}` (16px / 600), rounded `{rounded.md}` (20px), padding 24px. Hairline border. Contains a vertical stack of `{component.tech-pill}` entries.

**`tech-pill`** — Individual technology row inside a skill card. Background `{colors.surface-raised}`, text `{colors.ink}` in `{typography.body}`, rounded `{rounded.sm}` (16px), padding 12px. Hairline border. Left: tech logo (40px, 12px radius). Each pill has a per-tech `--tech-color` CSS variable driving a radial-gradient glow (`::after` at 22% opacity). Hover: GSAP lift +4px, scale 1.025, logo rotate -6deg.

### Projects
**`project-card`** — Full-width card in the projects band. Background `{colors.surface-dark}` at 4.5% white overlay, text `{colors.on-dark}` in `{typography.display-md}` (48px / 600), rounded `{rounded.xl}` (32px), padding 40px. Translucent white border (10%). Two-column grid alternating image-left / image-right. Contains an eyebrow stack label, h3 title, description in 18px / 68% white, a `{component.button-ghost-on-dark}` CTA, and a `{component.preview-panel}`.

**`preview-panel`** — The media frame inside a project card. Background `{colors.surface-frame}` (#07080d), rounded `{rounded.lg}` (24px), padding 8px. Product shadow applied. Contains either an image carousel (`<picture>` with AVIF/WebP/PNG) or a looping video. 3D tilt on pointer move (GSAP rotateX/rotateY, perspective 900).

**`carousel-control`** — Prev/next round buttons for image carousels. Background `{colors.surface-frame}`, text `{colors.on-dark}`, rounded `{rounded.pill}`, size 36px. Translucent white border. Hover: border + bg shift toward `{colors.primary-on-dark}`.

### Education
**`education-feature`** — The primary education card (university). Background `{colors.surface-raised}` with backdrop-blur 18px, text `{colors.ink}` in `{typography.display-md}`, rounded 28px, padding 24px. Sits on a gradient board (`::before` with primary at 14-16%). Contains a logo icon (55.2px), an eyebrow, an h3, and a description.

**`education-card`** — Secondary education cards (Cisco, SENA, English). Background `{colors.surface-raised}`, text `{colors.ink}` in `{typography.body-strong}`, rounded 21.6px, padding 20px. Hairline border. Hover: translateY -4px, border shifts toward primary, bg tints primary 4%.

**`education-stat`** — Small stat tile (4 tracks, B2 English, IT focus). Background `{colors.surface-raised}`, text `{colors.ink}` in `{typography.display-md}`, rounded 17.6px, padding 16px. Strong number above a muted label.

### Contact
**`contact-shell`** — The outer contact container. Background `{colors.canvas-parchment}` with a gradient overlay (primary at 12%), text `{colors.ink}` in `{typography.display-lg}`, rounded `{rounded.xl}` (32px), padding `clamp(1.4rem, 4vw, 3rem)` (fluid). Product shadow applied. 2-column grid on desktop.

**`contact-panel`** — The inner action panel. Background `{colors.surface-raised}` at 82% with backdrop-blur 18px, text `{colors.ink}` in `{typography.caption}`, rounded `{rounded.lg}` (24px), padding 24px. Contains a label, a muted description, and a 2-column grid of `{component.contact-action}` entries.

**`contact-action`** — Pill-shaped contact channel button. Background `{colors.canvas}`, text `{colors.ink}` in `{typography.button}`, rounded `{rounded.pill}`, padding 12px × 14px, min-height 47px. Hairline border. A shimmer sweep (`::before` gradient translateX) animates on hover. Magnetic.

**`contact-action-primary`** — The LinkedIn primary contact button. Background `{colors.primary}`, text `{colors.on-primary}`, rounded `{rounded.pill}`, padding 12px × 14px. Primary shadow glow. Same shimmer sweep on hover.

### Preview Dialog (Lightbox)
**`preview-dialog`** — A `<dialog>` element for fullscreen media viewing. Background `{colors.surface-void}` (#050508), text `{colors.on-dark}`, rounded `{rounded.lg}` (24px), padding 0. Max size: `min(96vw, 86rem)` × `min(92vh, 58rem)`. Backdrop: black 78% with blur 10px. Top bar: title left, prev/next/count/close controls right. Supports both image galleries and video. Keyboard: ArrowLeft/ArrowRight to navigate, click backdrop to close.

### Footer
**`footer`** — Background `{colors.canvas-parchment}`, text `{colors.body-muted}` in `{typography.caption}` (14px / 400), rounded `{rounded.none}`, padding 32px. Top hairline border. Centered copyright line.

## Do's and Don'ts

### Do
- Use `{colors.primary}` (Action Blue #0066cc) for every interactive element on light surfaces — primary CTAs, text links, focus rings — and nothing else.
- Use `{colors.primary-on-dark}` (Sky Link Blue #2997ff) for interactive elements on dark surfaces and in dark theme.
- Set headlines in `{typography.hero-display}` or `{typography.display-lg}` with negative letter-spacing to get the signature tight cadence.
- Run hero subtitles and section leads in `{typography.lead}` (24px / 300) — the rare weight 300 is the light-atmosphere cue.
- Alternate `{colors.canvas}` / `{colors.canvas-parchment}` and `{colors.surface-dark}` for full-bleed section rhythm. The color change IS the divider.
- Reserve `{rounded.pill}` for buttons and carousel controls; use `{rounded.xl}` (32px) for major cards; `{rounded.lg}` (24px) for panels; `{rounded.md}` (20px) for skill cards.
- Apply the single product-shadow only to imagery and preview panels — never on cards, buttons, or text.
- Use `transform: scale(0.95)` as the active/press state on every button — the system-wide micro-interaction.
- Gate all GSAP animations behind `!reduceMotion` and add `.is-visible` immediately under `prefers-reduced-motion: reduce`.
- Keep the nav bar frosted (backdrop-blur, 82% opacity) — it's the only fixed chrome element.

### Don't
- Don't introduce a second accent color; every "click me" signal is Action Blue (or Sky Link Blue on dark).
- Don't add shadows to cards, buttons, or text — shadow is reserved for imagery and preview panels.
- Don't use gradients as decorative section backgrounds; atmosphere comes from the radial primary glow (10%) used sparingly behind hero and contact sections.
- Don't set body copy at weight 500 or 700 — the ladder is 300 / 400 / 500 / 600. Body is 400; strong is 600; buttons/nav are 500; leads are 300.
- Don't round full-bleed section tiles — they are rectangular and edge-to-edge; the color change is the divider.
- Don't mix radii within a single component group — pills for actions, 32px for cards, 24px for panels, 20px for skill cards, 16px for pills-internal.
- Don't use `{colors.primary-on-dark}` on light surfaces — it's the dark-surface-only variant. Action Blue is for light surfaces.
- Don't add hover states to the design tokens — hover is expressed via GSAP transforms (magnetic, lift, tilt) and CSS color shifts, documented in prose, not as token variants.
- Don't load a web font without a system fallback — the stack must degrade to `system-ui` / `-apple-system` gracefully.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | ≤ 639px | Single-column all sections; nav links hidden (toggles only); hero h1 drops to 48px; section padding 96px vertical / 20px horizontal; contact actions 1-column |
| `sm` | 640–1023px | Hero h1 to 72px; section h2 to 60px; 2-column contact shell; horizontal padding 32px |
| `md` | 768–1023px | Skills grid 2-column; nav links visible |
| `lg` | 1024–1279px | Hero 2-column (text + card); project cards 2-column (image + copy); education 2-column |
| `xl` | ≥ 1280px | Skills grid 4-column; full layout; content locked at 1280px, margins absorb extra width |

The structural breakpoints: 1280px (container lock), 1024px (2-column grids engage), 768px (nav links appear), 640px (sm typography step), 520px (contact actions stack to 1-column, overflow-wrap anywhere).

### Touch Targets
- Minimum 44 × 44px. All buttons enforce `min-h-11` (44px). Nav toggles at 44px. Contact actions at 47px.
- Carousel controls are 36px — they sit inside a dark preview panel and are precision controls, not primary actions.

### Collapsing Strategy
- **Global nav**: brand + toggles on mobile; inline links (Proyectos, Stack, Contacto) appear at `md`.
- **Hero**: 2-column → 1-column below `lg`; terminal card moves below text.
- **Skills**: 4-column → 2-column (`md`) → 1-column (mobile).
- **Projects**: 2-column card → 1-column below `lg`; image stacks above/below copy.
- **Contact**: 2-column shell → 1-column below `lg`; action grid 2-column → 1-column at 520px.

### Image Behavior
- All project imagery uses `<picture>` with AVIF / WebP / PNG sources and `loading="lazy"` (first slide eager).
- Hero photo loads eagerly; education logos and tech icons are lazy.
- Project video: WebM primary (optimized), MP4 fallback (compatible); autoplay muted loop playsinline; plays on `IntersectionObserver` at 0.35 threshold and on pointer enter.

## Dark Mode

The portfolio ships a complete dark theme via a `.dark` class on `<html>`, toggled by the `{component.nav-toggle}` theme button and persisted in `localStorage` under `theme`. The toggle runs before first paint (inline `<head>` script) to prevent FOUC. All color custom properties swap:

| Light token | Light value | Dark value |
|---|---|---|
| `--primary` | #0066cc | #2997ff |
| `--primary-focus` | #0071e3 | #6ab7ff |
| `--ink` | #1d1d1f | #f5f5f7 |
| `--body-muted` | #6e6e73 | #c8c8cf |
| `--canvas` | #ffffff | #050505 |
| `--canvas-parchment` | #f5f5f7 | #111113 |
| `--surface` | #fafafc | #1b1b1f |
| `--surface-raised` | #ffffff | #202024 |
| `--surface-dark` | #272729 | #000000 |
| `--hairline` | rgba(0,0,0,0.09) | rgba(255,255,255,0.12) |
| `--shadow-product` | rgba(0,0,0,0.22) | rgba(0,0,0,0.55) |

The design tokens in this file document the **light theme** as canonical. In dark theme, the visual relationships are preserved: Action Blue brightens to Sky Link Blue, ink inverts to near-white, canvas deepens to near-black. The `color-scheme` CSS property switches to `dark` to align native form controls and scrollbars.

## Iteration Guide

1. Focus on ONE component at a time. Reference its YAML key directly (`{component.project-card}`, `{component.contact-action}`).
2. Variants (`-focus`, `-on-dark`, `-primary`) live as separate entries in `components:`.
3. Use `{token.refs}` everywhere in component YAML — never inline hex in tokens.
4. Never document hover as a token. Hover is expressed via GSAP transforms (magnetic, lift, tilt) and CSS color transitions, described in prose.
5. Display headlines stay Inter 600 with negative letter-spacing. Body stays Inter 400 at 16px. The boundary is unbreakable.
6. The single product-shadow is reserved for imagery and preview panels only.
7. When in doubt about emphasis: alternate surface (light → dark tile) before adding chrome.
8. When adding a new section: choose `{colors.canvas}`, `{colors.canvas-parchment}`, or `{colors.surface-dark}` as the full-bleed background — never a gradient. The section padding is always `{spacing.section}` (96px).

## Known Gaps

- The exact `backdrop-filter` blur radius on `{component.global-nav}` is platform-dependent; production CSS uses `backdrop-blur-xl` (Tailwind, ~24px). The value is not formalized as a token.
- The `{component.terminal-card}` uses three hardcoded syntax-highlight colors (#7dd3fc, #86efac, #f0abfc) for the code lines. These are decorative, not part of the color token system.
- The `{component.tech-pill}` per-tech `--tech-color` values (e.g., #f7df1e for JavaScript, #3178c6 for TypeScript) are data attributes, not design tokens — they identify the technology, not the brand.
- Form validation and error states are not surfaced in the portfolio (the only form is the Turnstile challenge page rendered by the Worker, which has its own isolated design system).
- The Turnstile challenge page and the email reveal page (rendered by `src/worker.ts`) use a separate, self-contained inline CSS design system that does not share tokens with the main portfolio. This is intentional: those pages are minimal security gates, not brand surfaces.
- The `clamp()` fluid padding on `{component.contact-shell}` is the only fluid value in the system; all other spacing is fixed.
