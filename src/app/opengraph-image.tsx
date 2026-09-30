import { ImageResponse } from "next/og";

export const alt = "Timeless Tiles - Digital Tiles Demo Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0C1720",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "60px 80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#E5B663",
            marginBottom: 20,
          }}
        >
          Academic Demonstration Platform
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            color: "#ffffff",
          }}
        >
          Timeless Tiles
        </div>
        <div
          style={{
            fontSize: 26,
            lineHeight: 1.4,
            color: "#D8DEE2",
            maxWidth: 800,
          }}
        >
          Digital transformation, catalogue discovery, interactive tile comparison, and room-wise recommendations.
        </div>
      </div>
    ),
    { ...size }
  );
}
