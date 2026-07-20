import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt =
  "Authentic Perspective — creative production studio, Eindhoven";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Brand-styled Open Graph image, generated at build time.
 * Replace with a real photographic OG image by deleting this file and adding
 * /src/app/opengraph-image.png (1200×630) instead.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          backgroundColor: "#0c0a08",
          backgroundImage:
            "radial-gradient(75% 55% at 72% 25%, rgba(231,117,47,0.25) 0%, transparent 60%)",
          color: "#f0eae0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.02,
            textTransform: "uppercase",
          }}
        >
          Authentic Perspective
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            color: "#aaa196",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e7752f",
          }}
        >
          Film · Photography · AI Creative · UX — Eindhoven
        </div>
      </div>
    ),
    size,
  );
}
