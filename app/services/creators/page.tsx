import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ImageSlot from "@/components/ImageSlot";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

/* Creator growth — the light sibling. Its hero runs in the Newsprint scope; the rest
   of the page returns to dark, exactly as the prototype does. */

export const metadata: Metadata = {
  title: "Creator growth — Drifted",
  description:
    "Monetization, product, and the launch that converts followers into revenue. Noted.: 3,000 new followers a month, sustained.",
  alternates: { canonical: "/services/creators" },
};

const METHOD = [
  {
    n: "01",
    title: "Margin first",
    body: "Before a product exists, we build the pricing and margin table. If the numbers don’t work, we change the product.",
  },
  {
    n: "02",
    title: "A brand, not a logo on a shirt",
    body: "Noted. was a full identity built on a red-pen annotation concept — an idea, not a print file.",
  },
  {
    n: "03",
    title: "Production that survives volume",
    body: "Printful and Tapstitch hybrid, so quality and turnaround both hold.",
  },
  { n: "04", title: "We run it", body: "Flat monthly retainer. You keep making things." },
];

const FAQ = [
  {
    q: "Do I need a certain following?",
    a: "No. We need an audience that trusts you and a product they’d actually buy. We’ll tell you honestly if we don’t see one.",
  },
  { q: "Who owns the brand?", a: "You do, in full, on final payment." },
];

export default function CreatorsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Creator growth",
            description:
              "Monetization, product, and the launch that converts followers into revenue.",
            path: "/services/creators",
          }),
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Creator growth", path: "/services/creators" },
          ]),
        ]}
      />

      <section className="wrap paper drift-paper" style={{ paddingBlock: "clamp(48px,7vw,104px)" }}>
        <div className="eye" style={{ color: "var(--siren-500)" }}>
          02 — Creator growth
        </div>
        <h1
          className="disp"
          style={{
            fontSize: "clamp(40px,7.2vw,120px)",
            marginTop: 20,
            lineHeight: 0.86,
            color: "var(--tar)",
          }}
        >
          An audience is
          <br />
          not a business.
        </h1>
        <p
          style={{
            maxWidth: "54ch",
            marginTop: 26,
            font: "400 19px/1.6 var(--font-body)",
            color: "#26262C",
          }}
        >
          Monetization, product, and the launch that converts followers into revenue.
        </p>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 30, flexWrap: "wrap" }}>
          <Link href="/contact" className="btn dark">
            Build the business ↗
          </Link>
          <span style={{ font: "400 15px/1.6 var(--font-body)", color: "#4A4A52" }}>
            3,000 new followers a month, sustained
          </span>
        </div>
      </section>

      <section className="wrap sect">
        <div className="two">
          <div>
            <div className="eye mut">The problem</div>
            <h2 className="disp" style={{ fontSize: "clamp(26px,3.4vw,50px)", marginTop: 14 }}>
              You have the
              <br />
              audience. It just
              <br />
              doesn&rsquo;t pay yet.
            </h2>
          </div>
          <div>
            <p className="body">
              The brand deals are inconsistent, the platform pays badly, and everyone tells you to
              launch merch without telling you what it costs to make, what it sells for, or
              what&rsquo;s left.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap sect">
        <div className="eye">What we do differently</div>
        <div style={{ marginTop: 26 }}>
          {METHOD.map((s) => (
            <div className="step rv" key={s.n}>
              <div className="stepno">{s.n}</div>
              <h3 className="disp" style={{ fontSize: 20 }}>
                {s.title}
              </h3>
              <p className="small" style={{ maxWidth: "58ch" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sect">
        <div className="two">
          <div>
            <div className="eye">The number we hit</div>
            <h2
              className="disp"
              style={{ fontSize: "clamp(30px,4.4vw,70px)", marginTop: 14, color: "var(--voltage-500)" }}
            >
              3K / month
            </h2>
          </div>
          <div>
            <p className="body">
              New followers a month, sustained — and a merch brand built from nothing while it grew.
              Noted.: 115K followers, seven months of consistent monthly revenue, one eight-product
              line built from zero.
            </p>
            <div style={{ marginTop: 22 }}>
              <Link href="/work/noted" className="btn sec">
                Read the case ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sect">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="eye">Receipts</div>
            <h2 className="disp" style={{ fontSize: "clamp(24px,3.2vw,46px)", marginTop: 14 }}>
              Noted., on screen.
            </h2>
          </div>
        </div>
        <div className="proofgrid two">
          <div>
            <div className="slotframe">
              <ImageSlot placeholder="Merch product shot" />
            </div>
          </div>
          <div>
            <div className="slotframe">
              <ImageSlot placeholder="Launch post or story" />
            </div>
          </div>
        </div>
      </section>

      <Faq items={FAQ} />
      <CtaBand />
    </>
  );
}
