/**
 * URL pública del sitio (para metadatos, sitemap y robots).
 * - `NEXT_PUBLIC_SITE_URL` si se define (p. ej. el dominio propio).
 * - En Vercel, el dominio de producción del proyecto (variable de sistema).
 * - En local, localhost.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteName = "Mantelek Power Rentals";
export const siteTitle = "Venta y Renta de Plantas de Luz | Generadores Eléctricos - Mantelek";
export const siteDescription =
  "Mantelek Power Rentals: venta y renta de plantas de luz, generadores eléctricos y plantas de emergencia en Monterrey. Más de 30 años de trayectoria con servicio a nivel nacional.";
