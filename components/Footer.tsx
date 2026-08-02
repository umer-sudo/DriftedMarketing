"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "./Mark";
import { site, instagram, linkedin } from "@/lib/config";

export default function Footer() {
  const pathname = usePathname();
  /* Footer links duplicate the nav, so without aria-current a screen-reader user
     tabbing the footer gets no signal about where they already are. */
  const current = (href: string) => (pathname === href ? ("page" as const) : undefined);

  return (
    <>
      {/* Three link groups, each a navigation region. Left unlabelled they announce
          as three identical "navigation" landmarks with no way to tell them apart. */}
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
              className="copyemail"
            >
              {site.email}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          <div>
            <div className="eye mut" id="foot-services">Services</div>
            <nav className="footlinks" aria-labelledby="foot-services">
              <Link href="/services/performance" aria-current={current("/services/performance")}>Performance media</Link>
              <Link href="/services/creators" aria-current={current("/services/creators")}>Creator growth</Link>
              <Link href="/services/ai-product" aria-current={current("/services/ai-product")}>AI product</Link>
            </nav>
          </div>

          <div>
            <div className="eye mut" id="foot-studio">Studio</div>
            <nav className="footlinks" aria-labelledby="foot-studio">
              <Link href="/work" aria-current={current("/work")}>Work</Link>
              <Link href="/about" aria-current={current("/about")}>About</Link>
              <Link href="/contact" aria-current={current("/contact")}>Contact</Link>
            </nav>
          </div>

          <div>
            <div className="eye mut" id="foot-social">Social</div>
            <nav className="footlinks" aria-labelledby="foot-social">
              <a href={instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </a>
              <a href={linkedin.url} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </nav>
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
