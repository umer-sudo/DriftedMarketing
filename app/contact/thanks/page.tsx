import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { CASES } from "@/content/cases";
import { Mark } from "@/components/Mark";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Booked — Drifted",
    description:
      "Your brief is in. Check your inbox for the invite, and bring two things to the call: the number you need to hit, and the date you need it by.",
    path: "/contact/thanks",
  }),
  /* Crawlable so this noindex can actually be read — see app/robots.ts. */
  robots: { index: false, follow: true },
};

/* The case with a measured headline figure, which is the one worth handing someone
   who has just asked us to hit a number. Falls back to the first case if none is
   flagged accented. */
const LEAD_CASE = CASES.find((c) => c.stats.some((s) => s.accent && !s.pending)) ?? CASES[0]!;

export default function ThanksPage() {
  return (
    <section className="wrap grainy" style={{ paddingBlock: "clamp(56px,9vw,140px)", minHeight: "70vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Mark size={46} />
        <span className="eye">Booked</span>
      </div>

      <h1 className="disp" style={{ fontSize: "clamp(44px,8.4vw,140px)", marginTop: 24 }}>
        Booked.
        <br />
        Now bring
        <br />
        the number.
      </h1>

      <p className="body" style={{ maxWidth: "54ch", marginTop: 26, fontSize: 19 }}>
        We answer within one business day — including when the answer is no. Before the call,
        have two things ready: the metric you care about, and the date you want it by.
        That&rsquo;s the whole agenda. There is no deck on our side.
      </p>

      <p className="small" style={{ maxWidth: "54ch", marginTop: 18 }}>
        The reply comes from a person, not a queue — answer it directly and it reaches
        the same people who would run the work.
      </p>

      <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
        {/* "See the work" sent people back to an index they had almost certainly
            just come from. A named case is a thing to actually read. */}
        <Link href={`/work/${LEAD_CASE.slug}`} className="btn">
          Read the {LEAD_CASE.client} case
        </Link>
        <Link href="/work" className="btn sec">
          All work
        </Link>
      </div>
    </section>
  );
}
