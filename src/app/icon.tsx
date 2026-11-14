import { ImageResponse } from "next/og";

// Favicon: "M" amarilla sobre el azul marino de la marca. Se genera en el build.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: 14,
          background: "#09182d",
          color: "#ffc20e",
          fontSize: 44,
          fontWeight: 700,
        }}
      >
        M
      </div>
    ),
    size,
  );
}
