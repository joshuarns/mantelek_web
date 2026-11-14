import { ImageResponse } from "next/og";

// Ícono para "Agregar a pantalla de inicio" en iPhone (iOS redondea las esquinas).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#09182d",
          color: "#ffc20e",
          fontSize: 124,
          fontWeight: 700,
        }}
      >
        M
      </div>
    ),
    size,
  );
}
