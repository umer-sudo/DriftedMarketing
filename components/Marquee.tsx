import { MARQUEE } from "@/content/cases";

/* Full-bleed Voltage strip, Tar text, linear loop, paused on hover. The list is
   doubled so translateX(-50%) wraps seamlessly; every 4th span renders outline-only
   via nth-child(4n+1) in CSS. */

export default function Marquee() {
  const once = MARQUEE.flatMap((name) => [name, "·"]);
  const items = [...once, ...once];

  return (
    <div className="marq" aria-hidden="true">
      <div>
        {items.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
