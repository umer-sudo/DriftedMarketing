"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { availability } from "@/lib/config";

/* Global behaviour + fixed UI layer.

   This mirrors how the prototype's site.js works: one delegated listener set rather
   than a client component per effect, so pages stay server-rendered and the motion
   is pure progressive enhancement. Markup ships settled; `data-motion="on"` goes on
   <html> only once this mounts, which is what arms the entrance states in CSS. If
   JS never runs, everything is simply visible.

   Two prototype behaviours are deliberately absent. The preloader and the route wipe
   both exist to make a single-file hash-routed document feel like a site; the handoff
   spec's "Global chrome" list contains neither, and it explicitly says to replace the
   hash cross-fade with real routes. Real routes are what we have.

   Reduced motion is honoured throughout: entrances settle instantly, and the cursor,
   magnetics, tilt, scramble, velocity coupling and pulse never attach at all. */

const GLYPHS = "DRIFTX/\\↗#01";

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isTouch = () => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

export default function Chrome() {
  const pathname = usePathname();
  const [popOpen, setPopOpen] = useState(false);
  const [slotsOn, setSlotsOn] = useState(false);
  const [slotsDismissed, setSlotsDismissed] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);
  const popRef = useRef<HTMLDivElement>(null);

  /* Arm the entrance states only once JS is live. */
  useEffect(() => {
    document.documentElement.setAttribute("data-motion", "on");
  }, []);

  /* ── entrances: slam, decode, count-up ───────────────────────────────────── */
  useEffect(() => {
    const reduced = prefersReduced();

    /* Display headings enter with the slam; anything already wrapped in .rv keeps
       its own reveal. */
    document.querySelectorAll<HTMLElement>("h1.disp, h2.disp").forEach((el) => {
      if (el.closest(".rv") || el.dataset.rv2) return;
      el.dataset.rv2 = "1";
      el.classList.add("rv2");
    });

    const scramble = (el: HTMLElement) => {
      if (el.dataset.scr || reduced) return;
      el.dataset.scr = "1";
      const txt = el.textContent ?? "";
      let f = 0;
      const total = Math.min(txt.length * 2, 26);
      const step = () => {
        f++;
        el.textContent = txt
          .split("")
          .map((ch, i) =>
            ch === " " || i < (f / total) * txt.length
              ? ch
              : GLYPHS[(Math.random() * GLYPHS.length) | 0],
          )
          .join("");
        if (f < total) requestAnimationFrame(step);
        else el.textContent = txt;
      };
      requestAnimationFrame(step);
    };

    const count = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count ?? "0");
      const suf = el.dataset.suffix ?? "";
      const dec = (el.dataset.count?.split(".")[1] ?? "").length;
      if (reduced) {
        el.textContent = target.toFixed(dec) + suf;
        return;
      }
      let t0: number | null = null;
      const step = (t: number) => {
        if (t0 === null) t0 = t;
        const p = Math.min((t - t0) / 900, 1);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = (target * e).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.classList.contains("eye")) scramble(el);
          const n = el.matches("[data-count]")
            ? el
            : el.querySelector<HTMLElement>("[data-count]");
          if (n && !n.dataset.counted) {
            n.dataset.counted = "1";
            count(n);
            /* Land, then flash Voltage — 950ms after entering. */
            window.setTimeout(() => n.classList.add("done"), 950);
          }
          io.unobserve(el);
        }),
      { threshold: 0.25 },
    );

    document
      .querySelectorAll<HTMLElement>(".rv:not(.in), .rv2:not(.in), .eye:not([data-scr])")
      .forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  /* ── scroll: progress bar, back-to-top, velocity coupling, overprint parallax ─ */
  useEffect(() => {
    const reduced = prefersReduced();
    const bar = document.getElementById("prog");
    const top = document.getElementById("top");
    let ticking = false;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let velTimer: number | undefined;

    let heads: HTMLElement[] = [];
    let nums: HTMLElement[] = [];
    const cache = () => {
      heads = Array.from(document.querySelectorAll<HTMLElement>("h1.disp, h2.disp")).slice(0, 12);
      nums = Array.from(document.querySelectorAll<HTMLElement>(".opnum"));
    };
    cache();

    const frame = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;

      if (bar) bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
      if (top) top.classList.toggle("on", window.scrollY > window.innerHeight * 2);

      /* Availability banner: home, work and case only, past 55% depth. */
      const onEligible =
        pathname === "/" || pathname === "/work" || pathname.startsWith("/work/");
      setSlotsOn(onEligible && max > 0 && window.scrollY / max > 0.55);

      if (reduced) return;

      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const dt = Math.max(now - lastT, 1);
      const v = Math.min(dy / dt, 2.4) / 2.4;
      lastY = window.scrollY;
      lastT = now;

      for (const h of heads) {
        h.classList.add("vel");
        h.style.letterSpacing = -0.045 - 0.05 * v + "em";
      }
      for (const n of nums) {
        const r = n.parentElement?.getBoundingClientRect();
        if (r) n.style.transform = `translateY(${(window.innerHeight - r.top) * 0.1}px)`;
      }
      window.clearTimeout(velTimer);
      velTimer = window.setTimeout(() => {
        for (const h of heads) h.style.letterSpacing = "";
      }, 150);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    frame();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(velTimer);
    };
  }, [pathname]);

  /* ── cursor: 8px square, 52px with a label over targets ──────────────────── */
  useEffect(() => {
    if (isTouch() || prefersReduced()) return;
    /* Built lazily on first movement rather than on mount — a device that never
       moves a pointer (and every prerender) then pays nothing for it. */
    let dot: HTMLDivElement | null = null;
    let lbl: HTMLSpanElement | null = null;

    const build = () => {
      if (dot) return;
      dot = document.createElement("div");
      dot.className = "dot";
      lbl = document.createElement("span");
      dot.appendChild(lbl);
      document.body.appendChild(dot);
    };

    const move = (e: MouseEvent) => {
      build();
      if (!dot || !lbl) return;
      dot.classList.add("on");
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      const t = (e.target as Element | null)?.closest?.(
        "[data-case], .item, .svc>div, button, summary, a",
      );
      if (!t) {
        dot.classList.remove("big");
        return;
      }
      dot.classList.add("big");
      lbl.textContent = t.matches(".item, [data-case]")
        ? "View"
        : t.matches("summary")
          ? "Open"
          : "Go";
    };
    const leave = () => dot?.classList.remove("on");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      dot?.remove();
    };
  }, []);

  /* ── magnetic buttons + work-card tilt, attached lazily on first hover ───── */
  useEffect(() => {
    if (isTouch() || prefersReduced()) return;

    type Magnetic = HTMLElement & { _mag?: boolean; _tilt?: boolean };

    const onOverBtn = (e: MouseEvent) => {
      const b = (e.target as Element | null)?.closest?.(".btn") as Magnetic | null;
      if (!b || b._mag) return;
      b._mag = true;
      b.addEventListener("mousemove", (ev) => {
        const r = b.getBoundingClientRect();
        const x = (ev.clientX - r.left - r.width / 2) * 0.18;
        const y = (ev.clientY - r.top - r.height / 2) * 0.3;
        b.style.transform = `translate(${x}px,${y}px)`;
      });
      b.addEventListener("mouseleave", () => {
        b.style.transform = "";
      });
    };

    const onOverCard = (e: MouseEvent) => {
      const it = (e.target as Element | null)?.closest?.(".item") as Magnetic | null;
      if (!it || it._tilt) return;
      it._tilt = true;
      const sh = it.querySelector<HTMLElement>(".shot");
      if (!sh) return;
      it.addEventListener("mousemove", (ev) => {
        const r = it.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        sh.style.transform = `rotateX(${-y * 5}deg) rotateY(${x * 6}deg)`;
      });
      it.addEventListener("mouseleave", () => {
        sh.style.transform = "";
      });
    };

    document.addEventListener("mouseover", onOverBtn);
    document.addEventListener("mouseover", onOverCard);
    return () => {
      document.removeEventListener("mouseover", onOverBtn);
      document.removeEventListener("mouseover", onOverCard);
    };
  }, []);

  /* ── click-to-copy email ─────────────────────────────────────────────────── */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-copy-email]");
      if (!t) return;
      const email = t.getAttribute("data-copy-email") ?? "";
      navigator.clipboard?.writeText(email).then(() => showToast("Email copied"));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* ── easter egg: type d-r-i-f-t and the plates slip ──────────────────────── */
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.matches("input, textarea, select")) return;
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf === "drift" && !prefersReduced()) {
        document.body.classList.add("slip");
        showToast("The plates slipped. On purpose.");
        window.setTimeout(() => document.body.classList.remove("slip"), 1100);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* ── exit-intent popup: once per session, on mouseleave or after 26s ─────── */
  useEffect(() => {
    if (sessionStorage.getItem("drifted-pop")) return;
    /* Exit intent is a pointer concept. Without one, mouseleave never fires and the
       26s timer would just ambush someone mid-read, so the popup doesn't run at all
       on touch. Same for reduced motion, where an unrequested modal is hostile. */
    if (isTouch() || prefersReduced()) return;
    const show = () => {
      if (sessionStorage.getItem("drifted-pop")) return;
      setPopOpen(true);
    };
    const timer = window.setTimeout(show, 26000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(timer);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!popOpen) return;
    const box = popRef.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(box?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePop();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [popOpen]);

  /* ── availability banner dismissal persists for the session ──────────────── */
  useEffect(() => {
    setSlotsDismissed(Boolean(sessionStorage.getItem("drifted-slots")));
  }, []);

  /* WCAG 2.2.2 — the marquee and the ticker start on their own and run far longer
     than five seconds, so there has to be a way to stop them. Hover-pause doesn't
     count: it isn't available to keyboard or touch users. The preference persists
     for the session and is applied on <html> so the CSS can reach every animation. */
  useEffect(() => {
    const stored = localStorage.getItem("drifted-motion") === "paused";
    setPaused(stored);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-motion-paused", paused);
    if (paused) localStorage.setItem("drifted-motion", "paused");
    else localStorage.removeItem("drifted-motion");
  }, [paused]);

  function closePop() {
    setPopOpen(false);
    sessionStorage.setItem("drifted-pop", "1");
  }

  function dismissSlots() {
    setSlotsDismissed(true);
    sessionStorage.setItem("drifted-slots", "1");
  }

  function showToast(msg: string) {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1600);
  }

  return (
    <>
      <div id="prog" aria-hidden="true" />

      <button
        id="motionpause"
        aria-pressed={paused}
        onClick={() => setPaused((v) => !v)}
        title={paused ? "Resume the marquee and ticker" : "Pause the marquee and ticker"}
      >
        <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
        <span className="sr-only">
          {paused ? "Resume moving content" : "Pause moving content"}
        </span>
      </button>

      <button
        id="top"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" })
        }
      >
        <i />
      </button>

      {/* Availability banner — Siren, bottom-pinned, home/work/case past 55% depth. */}
      <div id="slotsbar" className={slotsOn && !slotsDismissed ? "on" : undefined}>
        <span>
          {availability.quarter} —{" "}
          <b style={{ color: "var(--news)" }}>
            {availability.slots === 2 ? "two" : availability.slots} client slots open
          </b>
        </span>
        <Link href="/contact" className="bk" onClick={dismissSlots}>
          Book the call ↗
        </Link>
        <button className="xx" aria-label="Dismiss" onClick={dismissSlots}>
          ×
        </button>
      </div>

      {/* Exit-intent popup */}
      <div
        id="pop"
        className={popOpen ? "on" : undefined}
        onClick={(e) => {
          if (e.target === e.currentTarget) closePop();
        }}
        role={popOpen ? "dialog" : undefined}
        aria-modal={popOpen || undefined}
        aria-label="Book the call"
      >
        <div className="box" ref={popRef}>
          <button className="x" aria-label="Close" onClick={closePop}>
            ×
          </button>
          <div
            style={{
              font: "500 10px/1 var(--font-mono)",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#1A1A08",
              marginBottom: 16,
            }}
          >
            A door, not a gate
          </div>
          <h3>Still scrolling?</h3>
          <p>
            That’s usually the sign. Bring us the number you need to hit — the call is 30
            minutes, there’s no deck, and if we can’t get you there we’ll say so.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn dark" onClick={closePop}>
              Book the call ↗
            </Link>
            <button
              className="btn sec"
              onClick={closePop}
              style={{ boxShadow: "inset 0 0 0 1px rgba(10,10,11,.4)", color: "var(--tar)" }}
            >
              Keep scrolling
            </button>
          </div>
        </div>
      </div>

      <div id="ftoast" className={toast ? "on" : undefined} aria-hidden="true">
        {toast}
      </div>
    </>
  );
}
