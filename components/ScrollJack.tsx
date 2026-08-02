"use client";

import { useEffect, useRef } from "react";

/* Pinned horizontal scroll-jack for the AI-product pitch.

   The rail translates in proportion to how far the pinned zone has scrolled. Below
   1000px the CSS unpins it into a normal vertical stack and the transform is never
   applied, so touch users get an ordinary column. */

const PANELS = [
  {
    n: "01",
    title: "Monetize",
    body: "The business model, priced and stress-tested, before design starts. If it can’t earn, the build does not happen.",
  },
  {
    n: "02",
    title: "Design",
    body: "The shortest path from open to paid. Every screen carries a revenue hypothesis you can read.",
  },
  {
    n: "03",
    title: "Ship",
    body: "Weeks, not quarters. Instrumented from the first commit, so week one of live data answers questions instead of raising them.",
  },
];

export default function ScrollJack() {
  const zone = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const prog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const travelFor = (r: HTMLDivElement) =>
      Math.max(r.scrollWidth - window.innerWidth, 0);

    /* How tall the pinned zone needs to be.

       It used to be a flat 240vh in CSS, whatever the rail actually had to cover.
       On a wide screen the rail has less distance to travel, so the last panel
       settled a quarter of the way in and the remaining three-quarters of the
       scroll moved nothing — a thousand pixels of dead scrolling. Deriving the
       height from the travel keeps a constant relationship between how far you
       scroll and how far the rail moves, at any width.

       The dwell is deliberate: without it the final panel arrives at the exact
       moment the section releases, which is what made it feel like the page
       skipped past it. */
    const resize = () => {
      const z = zone.current;
      const r = rail.current;
      if (!z || !r) return;
      if (window.innerWidth <= 1000) {
        z.style.height = "";
        r.style.transform = "";
        return;
      }
      const pinH = window.innerHeight - 70;
      const travel = travelFor(r);
      const dwell = travel > 0 ? pinH * 0.45 : 0;
      z.style.height = `${Math.round(pinH + travel + dwell)}px`;
      tick();
    };

    const tick = () => {
      ticking = false;
      const z = zone.current;
      const r = rail.current;
      if (!z || !r) return;
      if (window.innerWidth <= 1000 || !z.offsetParent) {
        r.style.transform = "";
        return;
      }
      const rect = z.getBoundingClientRect();
      const pinH = window.innerHeight - 70;
      const total = Math.max(rect.height - pinH, 1);
      const p = Math.min(Math.max((70 - rect.top) / total, 0), 1);
      const travel = travelFor(r);
      /* Finish the travel before the zone does, so the last panel is readable for
         the dwell rather than for an instant. */
      const span = travel > 0 ? Math.min(p / 0.8, 1) : 0;
      r.style.transform = `translateX(${-span * travel}px)`;
      if (prog.current) prog.current.style.width = p * 100 + "%";
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    /* Fonts land after first paint and change the rail's width. */
    document.fonts?.ready.then(resize).catch(() => {});
    resize();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="appsec jack" ref={zone}>
      <div className="wire" aria-hidden="true" />
      <div className="pin">
        <div className="rail" ref={rail}>
          {PANELS.map((p) => (
            <div key={p.n}>
              <div className="jn" aria-hidden="true">
                {p.n}
              </div>
              <h3 className="disp" style={{ fontSize: "clamp(26px,3.2vw,44px)", marginTop: 18 }}>
                {p.title}
              </h3>
              <p className="body" style={{ marginTop: 14 }}>
                {p.body}
              </p>
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <div className="eye" style={{ color: "var(--klein-300)" }}>
                Then
              </div>
              <p
                className="disp"
                style={{
                  fontSize: "clamp(24px,3vw,42px)",
                  marginTop: 14,
                  color: "var(--voltage-500)",
                }}
              >
                Software without a price
                <br />
                is a hobby with a repo.
              </p>
              <div style={{ marginTop: 24 }}>
                <a className="btn sec" href="/services/ai-product">
                  Bring us the idea ↗
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="prog" ref={prog} aria-hidden="true" />
      </div>
    </section>
  );
}
