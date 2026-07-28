import { ImageResponse } from "next/og";
import { CASES, caseBySlug } from "@/content/cases";

/* Per-case OG cards. A shared card for six different cases wastes the strongest
   asset each one has — its headline figure. Satori resolves neither CSS custom
   properties nor the case `bg` gradients, so the palette is inlined and the field
   is a flat Voltage wedge rather than the page's die-cut treatment.

   The accent stat is pulled from the case's own data, so these can never drift out
   of sync with the page or invent a number: if a case has no accent stat, the card
   simply omits the figure. */

export const alt = "Drifted case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

const TAR = "#0A0A0B";
const NEWSPRINT = "#F2F0EA";
const VOLTAGE = "#AFE304";
const INK = "#7C7C86";

const PLATE =
  "M14 10 H48 C74 10 88 26 88 50 C88 74 74 90 48 90 H14 Z M46 40 H54 C64 40 70 47 70 58 C70 69 64 76 54 76 H46 Z";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  const headline = c ? c.hero.join(" ") : "Work, not decks.";
  const client = c?.client ?? "Drifted";
  const stat = c?.stats.find((s) => s.accent && !s.pending);

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
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* Die-cut wedge, flattened to a rotated block Satori can render. */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -220,
            width: 520,
            height: 900,
            background: VOLTAGE,
            opacity: 0.12,
            transform: "rotate(17deg)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 100 100">
            <g transform="rotate(-3.5 50 50) translate(-9 -7.8)">
              <path fillRule="evenodd" d={PLATE} fill={VOLTAGE} />
            </g>
            <path fillRule="evenodd" d={PLATE} fill={NEWSPRINT} />
          </svg>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: INK,
            }}
          >
            {client}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: headline.length > 34 ? 74 : 96,
            lineHeight: 1.0,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            color: NEWSPRINT,
            maxWidth: 900,
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `2px solid ${VOLTAGE}`,
            paddingTop: 26,
          }}
        >
          {stat ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: "-0.04em", color: VOLTAGE }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase", color: INK }}>
                {stat.label}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", color: VOLTAGE }}>
              Every agency says growth. We say the number.
            </div>
          )}
          <div style={{ fontSize: 18, letterSpacing: "0.18em", textTransform: "uppercase", color: INK }}>
            Drifted · Karachi
          </div>
        </div>
      </div>
    ),
    size,
  );
}
