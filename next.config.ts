import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio estático para cPanel: `next build` genera HTML/CSS/JS en `out/`,
  // que Apache sirve directo desde public_html (no hace falta Node en el servidor).
  output: "export",
  // El optimizador de imágenes de Next necesita servidor; en estático se sirven tal cual.
  images: { unoptimized: true },
  // Sin cacheComponents ni partialPrefetching: son funciones de servidor que en un
  // sitio estático no aportan y chocan con robots/sitemap estáticos.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
