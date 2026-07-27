import Link from "next/link";
import ImageSlot from "./ImageSlot";
import type { CaseStudy } from "@/content/cases";

/* A work tile. The whole card is one link — the prototype made the meta block a
   div with role="link" and a keydown handler; a real anchor gets the same keyboard
   behaviour for free and is correct for assistive tech. */

export default function WorkTile({ c, index }: { c: CaseStudy; index: number }) {
  const span = c.span ? ` ${c.span}` : "";
  return (
    <div className={`item${span}`} data-cat={c.category}>
      <div className="shot">
        <div className="img" style={{ background: c.bg }}>
          <ImageSlot placeholder={`${c.client} visual`} background={c.bg} />
        </div>
        <div className="veil" />
        <span className="tno" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="go" aria-hidden="true">
          {c.slug === "seyr" ? "Visit seyr.shop ↗" : "View case ↗"}
        </div>
        <div className="glare" aria-hidden="true" />
      </div>

      <div className="meta">
        <h3 className="disp" style={{ fontSize: "clamp(22px,2.4vw,34px)" }}>
          <Link href={`/work/${c.slug}`} className="tilelink">
            {c.client}
            <span className="sr-only"> — read the case study</span>
          </Link>
        </h3>

        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {c.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className={`res${c.craft ? " craft" : ""}`}>{c.result}</div>

        {c.externalUrl && (
          <div style={{ marginTop: 12, position: "relative", zIndex: 2 }}>
            <a
              href={c.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                font: "500 11px/1 var(--font-mono)",
                letterSpacing: ".16em",
                textTransform: "uppercase",
              }}
            >
              Open seyr.shop ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
