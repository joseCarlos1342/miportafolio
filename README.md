# Portfolio Jose Carlos

Portfolio Astro estatico desplegado en Cloudflare Workers Assets.

## Desarrollo

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Proteccion Turnstile

La pagina completa esta protegida por un Worker en `src/worker.ts`.

Flujo:

1. Las rutas HTML requieren verificacion Turnstile.
2. Los assets publicos (`/_astro/*`, CSS, JS, imagenes, fuentes, PDF, etc.) se sirven sin desafio.
3. Al completar Turnstile, el Worker valida el token contra Cloudflare `siteverify`.
4. Si la validacion pasa, se crea una cookie `HttpOnly`, `Secure`, `SameSite=Lax` por 30 dias.
5. Las visitas posteriores con cookie valida acceden directamente al portfolio.

El `site key` publico esta en `wrangler.jsonc` como `PUBLIC_TURNSTILE_SITE_KEY`.

Los valores privados deben configurarse como secretos de Cloudflare, nunca dentro del repositorio:

```sh
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put COOKIE_SECRET
```

Para `COOKIE_SECRET`, usa una cadena larga y aleatoria. Ejemplo para generarla localmente:

```sh
openssl rand -base64 48
```

## Despliegue

```sh
npm run build
npx wrangler deploy
```

En Cloudflare, asegúrate de que el Worker quede conectado al dominio `portafoliojosecarlos.com`.
