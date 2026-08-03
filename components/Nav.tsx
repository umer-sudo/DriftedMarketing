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
const SLOTS = `${availability.quarter} — ${availability.slots} slots open`;

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [clock, setClock] = useState<string | null>(null);
  const [ctaLabel, setCtaLabel] = useState(CTA_LABEL);
  const sheetRef = useRef<HTMLDivElement>(null);

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

  /* Close the sheet on navigation. */
  useEffect(() => setSheetOpen(false), [pathname]);

  /* A full-screen overlay that leaves focus behind it is a keyboard trap in reverse:
     tabbing walks invisibly through the page underneath. Escape closes, focus moves
     in and is cycled, the page behind is locked, and focus returns to the trigger. */
  useEffect(() => {
    if (!sheetOpen) return;
    const sheet = sheetRef.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        sheet?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheetOpen(false);
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
  }, [sheetOpen]);

  const current = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav className={`nav${hidden ? " hid" : ""}`} aria-label="Primary">
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
          <span className="slots">
            <i aria-hidden="true" />
            {SLOTS}
          </span>
          {clock && <span id="khi">{clock}</span>}
          <button
            className="btn sec sm menubtn"
            onClick={() => setSheetOpen(true)}
            aria-expanded={sheetOpen}
            aria-haspopup="dialog"
          >
            Menu
          </button>
          <Link
            href="/contact"
            className="btn sm navcta-alt"
            onMouseEnter={() => setCtaLabel("30 min. No deck. ↗")}
            onMouseLeave={() => setCtaLabel(CTA_LABEL)}
          >
            {ctaLabel}
          </Link>
        </div>
      </nav>

      <div
        className={`sheet${sheetOpen ? " on" : ""}`}
        ref={sheetRef}
        role="dialog"
        aria-modal={sheetOpen || undefined}
        aria-label="Menu"
        aria-hidden={!sheetOpen || undefined}
      >
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
