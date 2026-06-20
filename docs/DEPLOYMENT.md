# Deployment

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="espanol"></a>

## Espanol

## CI/CD con GitHub Actions

El despliegue es automatico. Al hacer push a la rama `master`, el workflow `.github/workflows/deploy.yml` ejecuta:

1. **Checkout** del repositorio.
2. **Setup Node.js 22** con cache de npm.
3. **`npm ci`** — instalacion limpia desde `package-lock.json`.
4. **`npm run build`** — build de Astro, output en `dist/`.
5. **`cloudflare/wrangler-action@v3`** — ejecuta `wrangler deploy` con los secrets de GitHub.

### Secrets necesarios en GitHub

| Secret | Descripcion |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token de Cloudflare (plantilla "Edit Cloudflare Workers") |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID de Cloudflare |

Ver [`docs/ENVIRONMENT.md`](ENVIRONMENT.md) para instrucciones de configuracion.

### Despliegue manual

```sh
npm run build
npx wrangler deploy
```

Requiere estar autenticado con `npx wrangler login` o tener `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` en el entorno.

## Troubleshooting

### Error: "In a non-interactive environment, it's necessary to set a CLOUDFLARE_API_TOKEN"

**Causa:** El secret `CLOUDFLARE_API_TOKEN` no esta configurado en GitHub o esta vacio.

**Solucion:**
1. Ve a https://dash.cloudflare.com/profile/api-tokens
2. Crea un token con la plantilla **Edit Cloudflare Workers**.
3. Anadelo en GitHub: **Settings → Secrets → Actions → New repository secret** con nombre `CLOUDFLARE_API_TOKEN`.

### Error: "No account id found"

**Causa:** Falta `CLOUDFLARE_ACCOUNT_ID` en GitHub Secrets o en `wrangler.jsonc`.

**Solucion:** Anade `CLOUDFLARE_ACCOUNT_ID` en GitHub Secrets. Alternativamente, anade `"account_id": "tu-account-id"` en `wrangler.jsonc`.

### Error: "wrangler deploy" falla localmente pero el CI pasa

**Causa:** Falta autenticacion local.

**Solucion:** Ejecuta `npx wrangler login` o exporta las variables:
```sh
export CLOUDFLARE_API_TOKEN="tu-token"
export CLOUDFLARE_ACCOUNT_ID="tu-account-id"
```

### El build falla con error de Node.js

**Causa:** Version de Node incompatible. El proyecto requiere Node >= 22.12.0.

**Solucion:** Usa `nvm` o `fnm` para instalar Node 22:
```sh
nvm install 22
nvm use 22
```

---

<a id="english"></a>

## English

## CI/CD with GitHub Actions

Deployment is automatic. On push to the `master` branch, the workflow `.github/workflows/deploy.yml` runs:

1. **Checkout** the repository.
2. **Setup Node.js 22** with npm cache.
3. **`npm ci`** — clean install from `package-lock.json`.
4. **`npm run build`** — Astro build, output in `dist/`.
5. **`cloudflare/wrangler-action@v3`** — runs `wrangler deploy` with GitHub secrets.

### Required GitHub secrets

| Secret | Description |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare token ("Edit Cloudflare Workers" template) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |

See [`docs/ENVIRONMENT.md`](ENVIRONMENT.md) for setup instructions.

### Manual deployment

```sh
npm run build
npx wrangler deploy
```

Requires authentication via `npx wrangler login` or having `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment.

## Troubleshooting

### Error: "In a non-interactive environment, it's necessary to set a CLOUDFLARE_API_TOKEN"

**Cause:** The `CLOUDFLARE_API_TOKEN` secret is not configured in GitHub or is empty.

**Solution:**
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Create a token using the **Edit Cloudflare Workers** template.
3. Add it in GitHub: **Settings → Secrets → Actions → New repository secret** named `CLOUDFLARE_API_TOKEN`.

### Error: "No account id found"

**Cause:** Missing `CLOUDFLARE_ACCOUNT_ID` in GitHub Secrets or `wrangler.jsonc`.

**Solution:** Add `CLOUDFLARE_ACCOUNT_ID` to GitHub Secrets. Alternatively, add `"account_id": "your-account-id"` to `wrangler.jsonc`.

### "wrangler deploy" fails locally but CI passes

**Cause:** Missing local authentication.

**Solution:** Run `npx wrangler login` or export the variables:
```sh
export CLOUDFLARE_API_TOKEN="your-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
```

### Build fails with Node.js error

**Cause:** Incompatible Node version. The project requires Node >= 22.12.0.

**Solution:** Use `nvm` or `fnm` to install Node 22:
```sh
nvm install 22
nvm use 22
```
