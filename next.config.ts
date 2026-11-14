import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // La imagen para compartir lee estos archivos; se incluyen explícitamente en el despliegue.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/assets/**"],
  },
  partialPrefetching: true,
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
