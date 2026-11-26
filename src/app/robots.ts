import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Exportación estática: se genera como archivo en el build.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
