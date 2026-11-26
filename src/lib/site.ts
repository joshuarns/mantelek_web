/**
 * URL pública del sitio (para metadatos, sitemap y robots). Como el sitio es
 * estático, queda fija en el HTML al compilar:
 * - `NEXT_PUBLIC_SITE_URL` si se define al compilar (otro dominio o un subdominio de prueba).
 * - En Vercel, el dominio de producción del proyecto (variable de sistema).
 * - Si no, el dominio de Mantelek.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://mantelek.mx")
).replace(/\/$/, "");

export const siteName = "Mantelek Power Rentals";
export const siteTitle = "Venta y Renta de Plantas de Luz | Generadores Eléctricos - Mantelek";
export const siteDescription =
  "Mantelek Power Rentals: venta y renta de plantas de luz, generadores eléctricos y plantas de emergencia en Monterrey. Más de 30 años de trayectoria con servicio a nivel nacional.";
