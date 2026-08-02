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
      const travel = Math.max(r.scrollWidth - window.innerWidth + 80, 0);
      r.style.transform = `translateX(${-p * travel}px)`;
      if (prog.current) prog.current.style.width = p * 100 + "%";
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", tick);
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", tick);
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
