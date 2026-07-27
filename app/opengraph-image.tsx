import { ImageResponse } from "next/og";

/* Handoff gap 2: OG meta tags were in place but no 1200×630 asset existed. This
   generates one from the brand tokens rather than shipping a stock placeholder —
   Tar ground, the Voltage plate offset behind the Newsprint plate at the mark's
   -3.5deg, and the positioning line set in the display face.

   Values are inlined as literals because Satori resolves neither CSS custom
   properties nor external stylesheets. */

export const alt = "Drifted Marketing — Look bigger than you are";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAR = "#0A0A0B";
const NEWSPRINT = "#F2F0EA";
const VOLTAGE = "#AFE304";

const PLATE_PATH =
  "M14 10 H48 C74 10 88 26 88 50 C88 74 74 90 48 90 H14 Z M46 40 H54 C64 40 70 47 70 58 C70 69 64 76 54 76 H46 Z";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: TAR,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 100 100">
            <g transform="rotate(-3.5 50 50) translate(-9 -7.8)">
              <path fillRule="evenodd" d={PLATE_PATH} fill={VOLTAGE} />
            </g>
            <path fillRule="evenodd" d={PLATE_PATH} fill={NEWSPRINT} />
          </svg>
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: NEWSPRINT,
            }}
          >
            Drifted
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              lineHeight: 0.86,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              color: NEWSPRINT,
            }}
          >
            Look bigger
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              lineHeight: 0.9,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              color: NEWSPRINT,
            }}
          >
            than you are
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${VOLTAGE}`,
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase", color: VOLTAGE }}>
            Every agency says growth. We say the number.
          </div>
          <div style={{ fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7C7C86" }}>
            Karachi · Est. 2026
          </div>
        </div>
      </div>
    ),
    size,
  );
}
