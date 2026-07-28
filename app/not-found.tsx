import Link from "next/link";
import NotFoundHeading from "@/components/NotFoundHeading";

/* Next renders not-found.tsx inside the root layout, so nav, footer and chrome all
   come along. Metadata for this route is set below; the title matches the handoff. */

export const metadata = {
  title: "This one drifted too far — Drifted",
};

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(56px,9vw,140px)", minHeight: "70vh" }}>
      <div className="eye">Error 404</div>
      <NotFoundHeading />
      <p className="body" style={{ maxWidth: "48ch", marginTop: 24, fontSize: 19 }}>
        The page left. Everything else is still here — six cases with the numbers attached,
        and a thirty-minute call that costs you nothing.
      </p>
      <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
        <Link href="/work" className="btn">
          See the work
        </Link>
        <Link href="/contact" className="btn sec">
          Tell us the number ↗
        </Link>
      </div>
    </section>
  );
}
