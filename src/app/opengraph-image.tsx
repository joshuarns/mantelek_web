import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";

// Imagen que se ve al compartir el sitio (WhatsApp, Facebook, LinkedIn…).
// Se genera una vez en el build.
export const alt = "Mantelek Power Rentals — Generadores eléctricos industriales en Monterrey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = async (file: string, mime: string) =>
  `data:${mime};base64,${(await readFile(join(process.cwd(), "src/assets", file))).toString("base64")}`;

// Con cacheComponents, leer archivos es I/O sin caché: "use cache" permite
// generar la imagen en el build en vez de en cada petición.
async function loadAssets() {
  "use cache";
  cacheLife("max");
  return Promise.all([asset("og-fondo.jpg", "image/jpeg"), asset("og-planta.png", "image/png")]);
}

export default async function Image() {
  const [background, product] = await loadAssets();

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: "#07090d" }}>
        <img
          src={background}
          alt=""
          width={1200}
          height={674}
          style={{ position: "absolute", top: -22, left: 0, opacity: 0.55, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(5,7,11,0.94) 0%, rgba(5,7,11,0.6) 50%, rgba(5,7,11,0.25) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 150,
            display: "flex",
            background: "linear-gradient(180deg, rgba(220,222,226,0) 0%, #dfe0e3 45%, #f2f2f3 100%)",
          }}
        />
        <img src={product} alt="" width={560} height={343} style={{ position: "absolute", right: 36, bottom: 56 }} />

        <div style={{ position: "absolute", left: 64, top: 72, display: "flex", flexDirection: "column", width: 520, color: "#fff" }}>
          <div style={{ display: "flex", fontSize: 22, fontWeight: 700, letterSpacing: 5, color: "#ffc20e", textTransform: "uppercase" }}>
            Mantelek Power Rentals
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 62, fontWeight: 700, lineHeight: 1.02, textTransform: "uppercase" }}>
            Generadores eléctricos industriales
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: "rgba(255,255,255,0.85)" }}>
            Renta y venta de plantas de luz en Monterrey
          </div>
        </div>
      </div>
    ),
    size,
  );
}
