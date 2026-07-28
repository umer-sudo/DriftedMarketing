import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";

export const metadata: Metadata = {
  title: "Booked — Drifted",
  description:
    "Your brief is in. Check your inbox for the invite, and bring two things to the call: the number you need to hit, and the date you need it by.",
  alternates: { canonical: "/contact/thanks" },
  robots: { index: false, follow: true },
};

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

      <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
        <Link href="/work" className="btn">
          See the work while you wait
        </Link>
        <Link href="/" className="btn sec">
          Back to home
        </Link>
      </div>
    </section>
  );
}
