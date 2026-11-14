import type { Metadata } from "next";
import { IBM_Plex_Mono, Poppins } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

// Poppins es la tipografía de mantelek.mx.
const sans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  // La itálica se usa en el título de "Generadores eléctricos industriales".
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["500"],
});

// La imagen para compartir (opengraph-image.tsx) y el ícono (icon.tsx) se
// generan en el build y Next los enlaza solos.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
