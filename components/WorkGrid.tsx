"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import WorkTile from "./WorkTile";
import { CASES, FILTERS, countFor, type CaseCategory } from "@/content/cases";

/* The work index grid.

   Filtering re-deals the visible tiles rather than showing and hiding them: each
   surviving tile replays `tilein` staggered 45ms per card. Skipped under reduced
   motion, where the grid simply updates.

   The active filter lives in the URL (?filter=performance) rather than in component
   state alone, so a filtered view is shareable, survives reload, and the browser
   back button steps through filters the way people expect.

   It is read from `location.search` on mount rather than through `useSearchParams`
   on purpose. `useSearchParams` opts the whole subtree out of prerendering — which
   on this page meant the h1, the intro and all six tiles were missing from the
   served HTML, on the one page nobody reaches by accident. Reading the URL in an
   effect renders the unfiltered grid on the server, then narrows it once mounted. */

const isCategory = (v: string | null): v is CaseCategory =>
  v === "performance" || v === "creators" || v === "product" || v === "web";

const fromLocation = (): "all" | CaseCategory => {
  const v = new URLSearchParams(window.location.search).get("filter");
  return isCategory(v) ? v : "all";
};

export default function WorkGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const [filter, setFilterState] = useState<"all" | CaseCategory>("all");

  /* Mount: adopt whatever the URL asks for. popstate: follow the back button. */
  useEffect(() => {
    const sync = () => setFilterState(fromLocation());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const setFilter = useCallback((next: "all" | CaseCategory) => {
    setFilterState(next);
    /* replaceState rather than a router navigation — the re-deal is the feedback,
       and a scroll restoration on top of it would fight the animation. */
    window.history.replaceState(
      null,
      "",
      next === "all" ? window.location.pathname : `${window.location.pathname}?filter=${next}`,
    );
  }, []);

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
            Client work and craft, current and earlier. Some carry a figure, some are
            still measuring, and one or two were led before Drifted — we show which is
            which rather than blurring the line.
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
            <WorkTile key={c.slug} c={c} index={CASES.indexOf(c)} headingLevel={2} />
          ))}
        </div>
      ) : (
        /* Unreachable with the current case set — every filter has at least one.
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
