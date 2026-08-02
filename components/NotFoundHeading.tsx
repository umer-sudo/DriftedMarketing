"use client";

import { useEffect, useRef } from "react";

/* The one place on the site where misregistration is applied to type, and it is
   deliberate: the colour plates track the cursor so the headline can never
   re-register. Disabled under reduced motion, where it renders as plain type. */

export default function NotFoundHeading() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.textShadow =
        `${8 + x * 14}px ${6 + y * 10}px 0 var(--voltage-500), ` +
        `${-6 - x * 14}px ${-4 - y * 10}px 0 var(--siren-500)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <h1
      className="disp"
      ref={ref}
      style={{ fontSize: "clamp(40px,7.6vw,124px)", marginTop: 20 }}
    >
      This one
      <br />
      drifted too far.
    </h1>
  );
}
