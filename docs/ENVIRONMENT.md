# Environment Variables

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="espanol"></a>

## Espanol

## Tabla completa

| Variable | Tipo | Origen | Obligatoria | Descripcion |
|---|---|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Publica | `wrangler.jsonc` (`vars`) | Si | Site key publica del widget Turnstile. Visible en el cliente. |
| `TURNSTILE_SECRET_KEY` | Secreto | `wrangler secret put` | Si | Secret key para validar tokens Turnstile contra el endpoint de Cloudflare. |
| `COOKIE_SECRET` | Secreto | `wrangler secret put` | Si | Clave HMAC-SHA256 para firmar y verificar la cookie de verificacion. Generar con `openssl rand -base64 48`. |
| `CONTACT_EMAIL` | Secreto | `wrangler secret put` | Si | Email de contacto que se muestra en `/__contact-email` tras verificar Turnstile. |
| `CLOUDFLARE_API_TOKEN` | CI | GitHub Secrets | Si (CI) | Token de API de Cloudflare para despliegue desde GitHub Actions. |
| `CLOUDFLARE_ACCOUNT_ID` | CI | GitHub Secrets | Si (CI) | Account ID de Cloudflare para despliegue desde GitHub Actions. |

## Configuracion local

### 1. Cloudflare Worker secrets

```sh
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put COOKIE_SECRET
npx wrangler secret put CONTACT_EMAIL
```

### 2. Generar COOKIE_SECRET

```sh
openssl rand -base64 48
```

Usa el valor generado al ejecutar `wrangler secret put COOKIE_SECRET`.

### 3. GitHub Secrets (para CI/CD)

Ve a **Settings → Secrets and variables → Actions → New repository secret** en el repositorio de GitHub y anade:

- `CLOUDFLARE_API_TOKEN` — token creado en Cloudflare con la plantilla **Edit Cloudflare Workers**.
- `CLOUDFLARE_ACCOUNT_ID` — tu Account ID de Cloudflare (visible en el dashboard).

### 4. Site key publica

La `PUBLIC_TURNSTILE_SITE_KEY` esta en `wrangler.jsonc` bajo `vars` y **no es secreta** — es visible en el HTML del cliente. Si necesitas cambiarla, edita `wrangler.jsonc` y vuelve a desplegar.

---

<a id="english"></a>

## English

## Full table

| Variable | Type | Source | Required | Description |
|---|---|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Public | `wrangler.jsonc` (`vars`) | Yes | Public site key for the Turnstile widget. Visible on the client. |
| `TURNSTILE_SECRET_KEY` | Secret | `wrangler secret put` | Yes | Secret key to validate Turnstile tokens against the Cloudflare endpoint. |
| `COOKIE_SECRET` | Secret | `wrangler secret put` | Yes | HMAC-SHA256 key to sign and verify the verification cookie. Generate with `openssl rand -base64 48`. |
| `CONTACT_EMAIL` | Secret | `wrangler secret put` | Yes | Contact email displayed at `/__contact-email` after Turnstile verification. |
| `CLOUDFLARE_API_TOKEN` | CI | GitHub Secrets | Yes (CI) | Cloudflare API token for deployment from GitHub Actions. |
| `CLOUDFLARE_ACCOUNT_ID` | CI | GitHub Secrets | Yes (CI) | Cloudflare Account ID for deployment from GitHub Actions. |

## Local setup

### 1. Cloudflare Worker secrets

```sh
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put COOKIE_SECRET
npx wrangler secret put CONTACT_EMAIL
```

### 2. Generate COOKIE_SECRET

```sh
openssl rand -base64 48
```

Use the generated value when running `wrangler secret put COOKIE_SECRET`.

### 3. GitHub Secrets (for CI/CD)

Go to **Settings → Secrets and variables → Actions → New repository secret** on the GitHub repository and add:

- `CLOUDFLARE_API_TOKEN` — token created in Cloudflare using the **Edit Cloudflare Workers** template.
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare Account ID (visible in the dashboard).

### 4. Public site key

The `PUBLIC_TURNSTILE_SITE_KEY` is in `wrangler.jsonc` under `vars` and **is not secret** — it is visible in the client HTML. To change it, edit `wrangler.jsonc` and redeploy.
