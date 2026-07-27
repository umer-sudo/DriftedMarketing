import Link from "next/link";
import { Mark } from "./Mark";
import { site, instagram, linkedin } from "@/lib/config";

export default function Footer() {
  return (
    <>
      <footer className="wrap foot">
        {/* min(…,100%) because this is a flex item: a bare ch max-width resolves
            wider than the column at small viewports and pushes the page sideways. */}
        <div style={{ maxWidth: "min(34ch, 100%)", minWidth: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Mark size={40} />
            <span className="wm" style={{ fontSize: 26 }}>
              Drifted
            </span>
          </span>

          <div className="clipmark" aria-hidden="true">
            <span>Drifted</span>
          </div>

          <p className="small" style={{ marginTop: 16 }}>
            Departure, by design. Founded {site.founded} in {site.city}. Three clients, small on
            purpose.
          </p>

          <div className="eye mut" style={{ marginTop: 16 }}>
            <button
              type="button"
              data-copy-email={site.email}
              title="Click to copy"
              style={{
                background: "none",
                border: 0,
                padding: 0,
                cursor: "pointer",
                font: "inherit",
                letterSpacing: "inherit",
                textTransform: "inherit",
                color: "inherit",
              }}
            >
              {site.email}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          <div>
            <div className="eye mut">Services</div>
            <div className="footlinks">
              <Link href="/services/performance">Performance media</Link>
              <Link href="/services/creators">Creator growth</Link>
              <Link href="/services/ai-product">AI product</Link>
            </div>
          </div>

          <div>
            <div className="eye mut">Studio</div>
            <div className="footlinks">
              <Link href="/work">Work</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div className="eye mut">Social</div>
            <div className="footlinks">
              <a href={instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </a>
              <a href={linkedin.url} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div
        className="wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
          paddingBottom: 40,
        }}
      >
        <span className="eye mut">
          © {site.founded} {site.name} · {site.city}
        </span>
        <span className="eye mut">Departure, by design</span>
      </div>
    </>
  );
}
