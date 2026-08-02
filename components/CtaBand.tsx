import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { instagram, phone, availability } from "@/lib/config";

/* The CTA band — full-bleed Voltage plate, Tar text, grain at 26% multiply.
   Closes every page except /contact and /contact/thanks. */

export default function CtaBand() {
  return (
    <section className="cta">
      <div className="wrap" style={{ paddingBlock: "clamp(64px,10vw,150px)", position: "relative" }}>
        <div
          style={{
            font: "500 11px/1 var(--font-mono)",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "rgba(10,10,11,.66)",
          }}
        >
          30-minute call · no deck · no pitch theatre
        </div>

        <h2 className="disp" style={{ marginTop: 24 }}>
          Tell us the
          <br />
          number. <span className="ko">We&rsquo;ll tell</span>
          <br />
          you if we can.
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
            flexWrap: "wrap",
            marginTop: 52,
            paddingTop: 26,
            borderTop: "2px solid var(--tar)",
          }}
        >
          <p
            style={{
              /* Flex item — see the note in Footer.tsx. */
              maxWidth: "min(44ch, 100%)",
              minWidth: 0,
              font: "400 17px/1.55 var(--font-body)",
              color: "#171708",
            }}
          >
            We&rsquo;ll tell you if we can hit it. If we can&rsquo;t, we&rsquo;ll say that too — and
            point you at whoever can.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn dark">
              Book the call ↗
            </Link>
            <a
              className="btn sec"
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ boxShadow: "inset 0 0 0 1px rgba(10,10,11,.4)", color: "var(--tar)" }}
            >
              DM us instead
            </a>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 18,
              flexWrap: "wrap",
              marginTop: 26,
              width: "100%",
            }}
          >
            <span
              style={{
                font: "500 10.5px/1 var(--font-mono)",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "rgba(10,10,11,.62)",
              }}
            >
              {availability.quarter} — two slots · next call slot: this week
            </span>

            <span style={{ display: "flex", gap: 16, alignItems: "center", color: "var(--tar)" }}>
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="iconlink"
              >
                <Instagram className="lu" aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@driftedmarketing.com"
                aria-label="Email us"
                className="iconlink"
              >
                <Mail className="lu" aria-hidden="true" />
              </a>
              {/* Handoff gap 4 — no phone number supplied, so this stays decorative
                  rather than shipping a dead tel: link. */}
              {phone.number ? (
                <a
                  href={`tel:${phone.number.replace(/\s+/g, "")}`}
                  aria-label="Call us"
                  className="iconlink"
                >
                  <Phone className="lu" aria-hidden="true" />
                </a>
              ) : (
                <Phone className="lu" aria-hidden="true" />
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
