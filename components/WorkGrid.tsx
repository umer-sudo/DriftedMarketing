"use client";

import { useEffect, useRef, useState } from "react";
import WorkTile from "./WorkTile";
import { CASES, FILTERS, countFor, type CaseCategory } from "@/content/cases";

/* The work index grid.

   Filtering re-deals the visible tiles rather than showing and hiding them: each
   surviving tile replays `tilein` staggered 45ms per card. Skipped under reduced
   motion, where the grid simply updates. */

export default function WorkGrid() {
  const [filter, setFilter] = useState<"all" | CaseCategory>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const visible = CASES.filter((c) => filter === "all" || c.category === filter);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = gridRef.current?.querySelectorAll<HTMLElement>(".item");
    tiles?.forEach((tile, i) => {
      tile.style.animation = "none";
      void tile.offsetWidth;
      tile.style.animation = `tilein 360ms var(--ease-expo) ${(i + 1) * 45}ms backwards`;
    });
  }, [filter]);

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "clamp(48px,7vw,96px)" }}>
        <div className="eye">Selected work</div>
        <h1 className="disp" style={{ fontSize: "clamp(44px,8.4vw,140px)", marginTop: 18 }}>
          Work,
          <br />
          not decks.
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
            marginTop: 30,
          }}
        >
          <p className="body" style={{ maxWidth: "48ch" }}>
            Three clients. Everything below shipped or ships this year. Some have a figure
            attached, some are still measuring — we show which is which.
          </p>
          <span className="eye mut" aria-live="polite">
            Showing {visible.length} of {CASES.length}
          </span>
        </div>

        <div className="filters" role="group" aria-label="Filter work by discipline">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filt${filter === f.key ? " on" : ""}`}
              data-n={countFor(f.key)}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <div className="work" ref={gridRef}>
        {visible.map((c) => (
          <WorkTile key={c.slug} c={c} index={CASES.indexOf(c)} />
        ))}
      </div>
    </>
  );
}
