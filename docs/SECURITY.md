# Security

> Bilingual: [Espanol](#espanol) | [English](#english)

<a id="espanol"></a>

## Espanol

## Modelo de amenazas

El portafolio protege dos activos:
1. **Email de contacto** — prevenir scraping automatizado para reducir spam.
2. **CV en PDF** — prevenir descarga masiva automatizada.

El contenido publico (HTML, CSS, JS, imagenes) no requiere proteccion.

## Cloudflare Turnstile

Turnstile es un challenge anti-bot que no requiere interaccion del usuario en la mayoria de los casos. Reemplaza a reCAPTCHA sin tracking ni cookies de terceros.

### Flujo de verificacion

1. El usuario accede a una ruta protegida (`/__contact-email`, `/__download-cv`, `/docs/cv-jose-carlos-gomez.pdf`).
2. El Worker verifica si existe una cookie `portfolio_turnstile_verified` valida.
3. Si no existe, devuelve una pagina HTML con el widget Turnstile (HTTP 403).
4. El widget genera un token en el cliente y lo envia via POST a `/__turnstile-verify`.
5. El Worker valida el token contra `https://challenges.cloudflare.com/turnstile/v0/siteverify` enviando el `secret` y el `token`.
6. Si la validacion pasa, el Worker firma un timestamp con HMAC-SHA256 usando `COOKIE_SECRET` y establece una cookie por 30 dias.
7. Las visitas posteriores con cookie valida acceden directamente al contenido.

### Cookie de verificacion

| Propiedad | Valor |
|---|---|
| Nombre | `portfolio_turnstile_verified` |
| Formato | `{timestamp}.{hmac-signature}` (base64url) |
| Max-Age | 30 dias (2,592,000 segundos) |
| Path | `/` |
| HttpOnly | Si — no accesible via JavaScript |
| Secure | Si — solo HTTPS |
| SameSite | Lax — proteccion CSRF |

### Validacion de cookie

Al recibir una peticion a una ruta protegida, el Worker:
1. Extrae la cookie `portfolio_turnstile_verified`.
2. Separa `{timestamp}.{signature}`.
3. Verifica que el timestamp no haya expirado (30 dias).
4. Recalcula el HMAC-SHA256 del timestamp con `COOKIE_SECRET`.
5. Compara la firma con `timingSafeEqual` (comparacion de tiempo constante para prevenir timing attacks).

### Sanitizacion de redirects

El parametro `redirect` del formulario Turnstile se sanitiza:
- Debe comenzar con `/` (path relativo).
- No puede comenzar con `//` (evitar open redirect a dominios externos).
- Se parsea como URL y se reconstruye solo con pathname + search + hash.

## Secrets

Los secrets nunca se commitean al repositorio. Se configuran via:

```sh
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put COOKIE_SECRET
npx wrangler secret put CONTACT_EMAIL
```

Ver [`docs/ENVIRONMENT.md`](ENVIRONMENT.md) para detalles.

## Reporte de vulnerabilidades

Si encuentras una vulnerabilidad, por favor reportala privadamente via GitHub Security Advisories o contacta directamente. No abras un issue publico.

---

<a id="english"></a>

## English

## Threat model

The portfolio protects two assets:
1. **Contact email** — prevent automated scraping to reduce spam.
2. **CV PDF** — prevent automated mass downloads.

Public content (HTML, CSS, JS, images) does not require protection.

## Cloudflare Turnstile

Turnstile is an anti-bot challenge that requires no user interaction in most cases. It replaces reCAPTCHA without tracking or third-party cookies.

### Verification flow

1. User accesses a protected route (`/__contact-email`, `/__download-cv`, `/docs/cv-jose-carlos-gomez.pdf`).
2. The Worker checks for a valid `portfolio_turnstile_verified` cookie.
3. If absent, it returns an HTML page with the Turnstile widget (HTTP 403).
4. The widget generates a token on the client and submits it via POST to `/__turnstile-verify`.
5. The Worker validates the token against `https://challenges.cloudflare.com/turnstile/v0/siteverify` sending the `secret` and `token`.
6. If validation passes, the Worker signs a timestamp with HMAC-SHA256 using `COOKIE_SECRET` and sets a 30-day cookie.
7. Subsequent visits with a valid cookie access the content directly.

### Verification cookie

| Property | Value |
|---|---|
| Name | `portfolio_turnstile_verified` |
| Format | `{timestamp}.{hmac-signature}` (base64url) |
| Max-Age | 30 days (2,592,000 seconds) |
| Path | `/` |
| HttpOnly | Yes — not accessible via JavaScript |
| Secure | Yes — HTTPS only |
| SameSite | Lax — CSRF protection |

### Cookie validation

On receiving a request to a protected route, the Worker:
1. Extracts the `portfolio_turnstile_verified` cookie.
2. Splits `{timestamp}.{signature}`.
3. Verifies the timestamp has not expired (30 days).
4. Recomputes HMAC-SHA256 of the timestamp with `COOKIE_SECRET`.
5. Compares the signature using `timingSafeEqual` (constant-time comparison to prevent timing attacks).

### Redirect sanitization

The Turnstile form's `redirect` parameter is sanitized:
- Must start with `/` (relative path).
- Cannot start with `//` (prevents open redirect to external domains).
- Parsed as URL and reconstructed with pathname + search + hash only.

## Secrets

Secrets are never committed to the repository. They are configured via:

```sh
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put COOKIE_SECRET
npx wrangler secret put CONTACT_EMAIL
```

See [`docs/ENVIRONMENT.md`](ENVIRONMENT.md) for details.

## Vulnerability reporting

If you find a vulnerability, please report it privately via GitHub Security Advisories or contact directly. Do not open a public issue.
