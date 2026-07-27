"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* Screen-reader live region announcing route changes. Client-side navigation does
   not move focus or re-announce the page, so without this a screen-reader user gets
   no signal that the route changed. Reads document.title after paint. */

export default function RouteAnnouncer() {
  const pathname = usePathname();
  const [label, setLabel] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => setLabel(document.title), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}
    >
      {label}
    </div>
  );
}
