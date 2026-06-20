# Contributing

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="english"></a>

## English

Contributions are welcome. This is a personal portfolio, but improvements to documentation, accessibility, performance, and code quality are appreciated.

## How to contribute

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Make your changes following the existing code style.
4. Run `npm run build` to verify the build passes.
5. Commit with a clear message (see conventions below).
6. Open a Pull Request using the PR template.

## Commit conventions

| Prefix | Use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, no code change |
| `refactor:` | Code restructuring, no behavior change |
| `ci:` | CI/CD changes |
| `chore:` | Maintenance, dependencies |

## Code style

- TypeScript strict mode (`tsconfig.json` extends `astro/tsconfigs/strict`).
- No comments unless explicitly requested.
- Tailwind CSS 4 utility classes in markup; custom CSS only in `src/styles/global.css`.
- GSAP for animations; always gate behind `prefers-reduced-motion`.
- Bilingual: every user-facing string needs `data-es` and `data-en` attributes.

## Design system

All visual changes must be reflected in `DESIGN.md`. Validate with:

```sh
npx @google/design.md lint DESIGN.md
```

The lint must pass with 0 errors.

## Reporting issues

Use the GitHub issue templates (bug report or feature request). Include:
- Steps to reproduce (for bugs).
- Expected vs actual behavior.
- Browser and OS.

---

<a id="espanol"></a>

## Espanol

Las contribuciones son bienvenidas. Este es un portafolio personal, pero las mejoras a documentacion, accesibilidad, performance y calidad de codigo son apreciadas.

## Como contribuir

1. Haz fork del repositorio.
2. Crea una rama: `git checkout -b feature/tu-feature`.
3. Haz tus cambios siguiendo el estilo de codigo existente.
4. Ejecuta `npm run build` para verificar que el build pase.
5. Commit con un mensaje claro (ver convenciones abajo).
6. Abre un Pull Request usando la plantilla de PR.

## Convenciones de commit

| Prefijo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad |
| `fix:` | Correccion de bug |
| `docs:` | Solo documentacion |
| `style:` | Formato, sin cambio de codigo |
| `refactor:` | Reestructuracion, sin cambio de comportamiento |
| `ci:` | Cambios de CI/CD |
| `chore:` | Mantenimiento, dependencias |

## Estilo de codigo

- TypeScript strict mode (`tsconfig.json` extiende `astro/tsconfigs/strict`).
- Sin comentarios a menos que se solicite explicitamente.
- Clases de Tailwind CSS 4 en el markup; CSS custom solo en `src/styles/global.css`.
- GSAP para animaciones; siempre gated detras de `prefers-reduced-motion`.
- Bilingue: cada string visible necesita atributos `data-es` y `data-en`.

## Sistema de diseno

Todos los cambios visuales deben reflejarse en `DESIGN.md`. Valida con:

```sh
npx @google/design.md lint DESIGN.md
```

El lint debe pasar con 0 errores.

## Reportar issues

Usa las plantillas de GitHub issues (bug report o feature request). Incluye:
- Pasos para reproducir (para bugs).
- Comportamiento esperado vs actual.
- Navegador y OS.
