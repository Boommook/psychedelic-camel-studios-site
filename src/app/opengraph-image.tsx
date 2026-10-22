import { ImageResponse } from "next/og";
import { site } from "@/config/site";
export const dynamic = "force-static";
export const alt = "Student game project — Psychedelic Camel Studios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0c0c10",
        color: "#f1eff6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#bea2da",
          fontSize: 20,
          letterSpacing: 4,
          marginBottom: 50,
        }}
      >
        {site.studio.toUpperCase()}
      </div>
      <div style={{ fontSize: 120, letterSpacing: -6, display: "flex" }}>
        {site.title}.
      </div>
      <div style={{ fontSize: 32, color: "#b5a9c4", marginTop: 24 }}>
        {site.tagline}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 16,
          color: "#b5a9c4",
          marginTop: 70,
          letterSpacing: 3,
        }}
      >
        {site.status.toUpperCase()} / WPI STUDENT GAME PROJECT
      </div>
    </div>,
    size,
  );
}
