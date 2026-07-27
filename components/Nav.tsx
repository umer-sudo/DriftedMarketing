"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "./Mark";
import { site, availability } from "@/lib/config";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services/performance", label: "Performance" },
  { href: "/services/creators", label: "Creators" },
  { href: "/services/ai-product", label: "AI product" },
  { href: "/about", label: "Studio" },
];

const SHEET_LINKS = [{ href: "/", label: "Home" }, ...LINKS, { href: "/contact", label: "Contact" }];

const CTA_LABEL = "Tell us the number";
const CTA_ALT = `${availability.quarter}: ${availability.slots} slots ↗`;

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [clock, setClock] = useState<string | null>(null);
  const [ctaLabel, setCtaLabel] = useState(CTA_LABEL);
  const hoveredRef = useRef(false);

  /* Hides on scroll down past 220px, returns immediately on scroll up. */
  useEffect(() => {
    let py = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > py + 6 && y > 220) setHidden(true);
      else if (y < py - 6) setHidden(false);
      py = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Karachi clock. Rendered null on the server so the markup matches on hydration. */
  useEffect(() => {
    const tick = () => {
      try {
        setClock(
          "KHI " +
            new Intl.DateTimeFormat("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: site.timeZone,
            }).format(new Date()),
        );
      } catch {
        setClock(null);
      }
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  /* After 45s the CTA starts alternating its label every 8s, suppressed on hover.
     Hover state is read through a ref so hovering never restarts the 45s timer. */
  useEffect(() => {
    let alt = true;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        if (hoveredRef.current) return;
        setCtaLabel(alt ? CTA_ALT : CTA_LABEL);
        alt = !alt;
      }, 8000);
    }, 45000);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, []);

  /* Close the sheet on navigation and on Escape. */
  useEffect(() => setSheetOpen(false), [pathname]);
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheetOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  const current = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav className={`nav${hidden ? " hid" : ""}`}>
        <Link href="/" className="brand" aria-label={`${site.shortName} — home`}>
          <Mark size={30} />
          <span className="wm">Drifted</span>
        </Link>

        <div className="navlinks">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {clock && <span id="khi">{clock}</span>}
          <button className="btn sec sm menubtn" onClick={() => setSheetOpen(true)}>
            Menu
          </button>
          <Link
            href="/contact"
            className="btn sm navcta-alt"
            onMouseEnter={() => {
              hoveredRef.current = true;
              setCtaLabel("30 min. No deck. ↗");
            }}
            onMouseLeave={() => {
              hoveredRef.current = false;
              setCtaLabel(CTA_LABEL);
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      </nav>

      <div className={`sheet${sheetOpen ? " on" : ""}`}>
        <button className="close" onClick={() => setSheetOpen(false)}>
          Close ✕
        </button>
        {SHEET_LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
