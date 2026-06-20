# Accessibility

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="espanol"></a>

## Espanol

## WCAG

El portafolio sigue las pautas WCAG 2.1 nivel AA.

### Navegacion por teclado

| Feature | Implementacion |
|---|---|
| Skip link | `.skip-link` visible al focus, saltar al contenido principal (`#main`) |
| Focus visible | `outline: 2px solid var(--primary-focus)` con `outline-offset: 4px` |
| Touch targets | Minimo 44px de altura en todos los botones (`min-h-11`) |
| Dialog | `<dialog>` nativo con focus trap automatico, Escape para cerrar, click en backdrop para cerrar |
| Carrusel | Navegacion con flechas izquierda/derecha en el lightbox |

### ARIA

| Elemento | ARIA |
|---|---|
| Nav principal | `aria-label="Navegacion principal"` (i18n: ES/EN) |
| Botones de tema/idioma | `aria-label` y `aria-pressed` |
| Dialog de preview | `aria-label` (i18n) |
| Status de copia de email | `role="status"` + `aria-live="polite"` |
| Imagenes decorativas | `alt=""` (vacio) en iconos y logos |
| Imagenes informativas | `alt` descriptivo en capturas de proyectos y foto del hero |

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- Todas las animaciones GSAP se desactivan cuando `prefers-reduced-motion: reduce`.
- Los elementos `.reveal` se muestran inmediatamente sin animacion.
- `history.scrollRestoration = "manual"` previene scroll involuntario al recargar.

### Contraste

| Par | Ratio | Resultado |
|---|---|---|
| Action Blue (#0066cc) sobre blanco | 5.97:1 | AA pass |
| Ink (#1d1d1f) sobre blanco | 16.6:1 | AAA pass |
| Body muted (#6e6e73) sobre parchment (#f5f5f7) | 4.68:1 | AA pass |
| Blanco sobre near-black (#272729) | 15.5:1 | AAA pass |

### Idioma

- `<html lang="es">` por defecto (espanol).
- El idioma se actualiza dinamicamente via `document.documentElement.lang = lang` al cambiar a ingles.
- Todos los `aria-label` tienen variantes ES/EN via `data-i18n-aria-es` / `data-i18n-aria-en`.

---

<a id="english"></a>

## English

## WCAG

The portfolio follows WCAG 2.1 level AA guidelines.

### Keyboard navigation

| Feature | Implementation |
|---|---|
| Skip link | `.skip-link` visible on focus, skips to main content (`#main`) |
| Focus visible | `outline: 2px solid var(--primary-focus)` with `outline-offset: 4px` |
| Touch targets | Minimum 44px height on all buttons (`min-h-11`) |
| Dialog | Native `<dialog>` with automatic focus trap, Escape to close, click backdrop to close |
| Carousel | Arrow left/right navigation in the lightbox |

### ARIA

| Element | ARIA |
|---|---|
| Main nav | `aria-label="Main navigation"` (i18n: ES/EN) |
| Theme/language buttons | `aria-label` and `aria-pressed` |
| Preview dialog | `aria-label` (i18n) |
| Email copy status | `role="status"` + `aria-live="polite"` |
| Decorative images | `alt=""` (empty) on icons and logos |
| Informative images | Descriptive `alt` on project screenshots and hero photo |

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- All GSAP animations are disabled when `prefers-reduced-motion: reduce`.
- `.reveal` elements are shown immediately without animation.
- `history.scrollRestoration = "manual"` prevents involuntary scroll on reload.

### Contrast

| Pair | Ratio | Result |
|---|---|---|
| Action Blue (#0066cc) on white | 5.97:1 | AA pass |
| Ink (#1d1d1f) on white | 16.6:1 | AAA pass |
| Body muted (#6e6e73) on parchment (#f5f5f7) | 4.68:1 | AA pass |
| White on near-black (#272729) | 15.5:1 | AAA pass |

### Language

- `<html lang="es">` by default (Spanish).
- Language updates dynamically via `document.documentElement.lang = lang` when switching to English.
- All `aria-label`s have ES/EN variants via `data-i18n-aria-es` / `data-i18n-aria-en`.
