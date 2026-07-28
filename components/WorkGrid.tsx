"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import WorkTile from "./WorkTile";
import { CASES, FILTERS, countFor, type CaseCategory } from "@/content/cases";

/* The work index grid.

   Filtering re-deals the visible tiles rather than showing and hiding them: each
   surviving tile replays `tilein` staggered 45ms per card. Skipped under reduced
   motion, where the grid simply updates.

   The active filter lives in the URL (?filter=performance) rather than in component
   state alone, so a filtered view is shareable, survives reload, and the browser
   back button steps through filters the way people expect. `scroll: false` keeps the
   viewport still — re-deal is the feedback, a jump to the top would fight it. */

const isCategory = (v: string | null): v is CaseCategory =>
  v === "performance" || v === "creators" || v === "product" || v === "web";

export default function WorkGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const raw = params.get("filter");
  const filter: "all" | CaseCategory = isCategory(raw) ? raw : "all";

  const setFilter = (next: "all" | CaseCategory) => {
    const qs = next === "all" ? "" : `?filter=${next}`;
    router.replace(`${pathname}${qs}`, { scroll: false });
  };

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

      {visible.length > 0 ? (
        <div className="work" ref={gridRef}>
          {visible.map((c) => (
            <WorkTile key={c.slug} c={c} index={CASES.indexOf(c)} />
          ))}
        </div>
      ) : (
        /* Unreachable with the current six cases — every filter has at least one.
           It exists so adding a category without work doesn't render a blank band. */
        <div className="wrap" style={{ paddingBlock: 64 }}>
          <div className="held">
            <div className="eye mut">Nothing here yet</div>
            <p className="body" style={{ marginTop: 12, maxWidth: "48ch" }}>
              No published work in this discipline yet. The other filters have receipts.
            </p>
            <button className="btn sec" style={{ marginTop: 20 }} onClick={() => setFilter("all")}>
              Show all work
            </button>
          </div>
        </div>
      )}
    </>
  );
}
