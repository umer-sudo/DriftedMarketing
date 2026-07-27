"use client";

import { useEffect, useRef } from "react";

/* Hero orb: three concentric hairline rings, a bobbing Voltage ball, and a dashed
   orbit ring at 26s linear. Parallaxes to the cursor at 18px / 12px. Both the
   parallax and the animations are dropped under reduced motion. */

export default function Orb() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const onMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (ref.current) ref.current.style.transform = `translate(${mx * 18}px,${my * 12}px)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="orb" ref={ref} aria-hidden="true">
      <div className="ring" />
      <div className="ring" />
      <div className="ring" />
      <div className="ball" />
      <div className="orbring" />
    </div>
  );
}
