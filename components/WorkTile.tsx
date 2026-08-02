import Link from "next/link";
import ImageSlot from "./ImageSlot";
import type { CaseStudy } from "@/content/cases";

/* A work tile. The whole card is one link — the prototype made the meta block a
   div with role="link" and a keydown handler; a real anchor gets the same keyboard
   behaviour for free and is correct for assistive tech. */

export default function WorkTile({
  c,
  index,
  /* On the home page the grid sits under a section h2, so the tiles are h3s. On
     the work index the page h1 is the only heading above them, and an h3 there
     skips a level. The caller knows which it is; the tile doesn't. */
  headingLevel = 3,
}: {
  c: CaseStudy;
  index: number;
  headingLevel?: 2 | 3;
}) {
  const span = c.span ? ` ${c.span}` : "";
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className={`item${span}`} data-cat={c.category}>
      <div className="shot">
        <div className="img" style={{ background: c.bg }}>
          <ImageSlot
            placeholder={`${c.client} visual`}
            src={c.gallery?.[0]?.src}
            alt={c.gallery?.[0]?.alt}
            background={c.bg}
            sizes="(max-width: 1000px) 100vw, 50vw"
          />
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
        <H className="disp" style={{ fontSize: "clamp(22px,2.4vw,34px)" }}>
          <Link href={`/work/${c.slug}`} className="tilelink">
            {c.client}
            <span className="sr-only"> — read the case study</span>
          </Link>
        </H>

        {/* The case page carries the date its figures were last confirmed; the index
            did not, so a scanner comparing tiles had no way to tell a figure checked
            last month from one that could be five years old. Same signal, same
            source, one line. */}
        <p className="tileverified">
          Figures confirmed{" "}
          <time dateTime={c.verified}>
            {new Date(c.verified).toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {/* Craft cases carry no headline metric by design. Saying so on the tile
              stops the absence of a number reading as an omission. */}
          {c.craft && <span className="tag craft">Craft</span>}
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
