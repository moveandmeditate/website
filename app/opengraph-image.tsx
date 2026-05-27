import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const runtime = "nodejs";
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, #f6f1ea 0%, #efe8de 55%, #eae2d4 100%)",
          color: "#1a1a1a",
          fontFamily: "serif",
          padding: 80,
          position: "relative",
        }}
      >
        {/* Stamp emblem */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 200 200"
          style={{ marginBottom: 28 }}
        >
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
          />
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="1.5"
          />
          <circle cx="100" cy="78" r="3" fill="#1a1a1a" />
          <path
            d="M 70 132 L 90 92 L 100 108 L 110 92 L 130 132"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="3"
            strokeLinejoin="miter"
            strokeLinecap="round"
          />
          <path
            d="M 68 142 C 80 148 120 148 132 142"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: 1,
          }}
        >
          <div
            style={{
              fontSize: 96,
              letterSpacing: 18,
              textIndent: 18,
            }}
          >
            MOVE
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              margin: "16px 0",
              fontStyle: "italic",
              fontSize: 22,
              letterSpacing: 8,
              color: "#2b2b2b",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 80,
                height: 1,
                background: "#1a1a1a",
              }}
            />
            <span>AND</span>
            <div
              style={{
                display: "flex",
                width: 80,
                height: 1,
                background: "#1a1a1a",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 116,
              letterSpacing: 16,
              textIndent: 16,
            }}
          >
            MEDITATE
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            letterSpacing: 8,
            color: "#2b2b2b",
            fontFamily: "sans-serif",
            fontWeight: 500,
          }}
        >
          MOVEMENT IS MEDICINE · STILLNESS IS POWER
        </div>
      </div>
    ),
    size
  );
}
