import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import MidCta from "@/components/MidCta";
import ImageSlot from "@/components/ImageSlot";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

/* Performance media — the dark sibling with Voltage plates. The three service pages
   are identical in structure and choreography and differ only in surface treatment. */

export const metadata: Metadata = pageMetadata({
  title: "Performance media — Drifted",
  description:
    "The Gallery returned 5.2–6× on every campaign we ran — not an average across a good quarter. Paid media and the creative that feeds it, run by the same people.",
  path: "/services/performance",
});

const METHOD = [
  { n: "01", title: "One team, both jobs", body: "The creative is built for the account it runs in." },
  {
    n: "02",
    title: "Story, then conversion",
    body: "Content that only chases the algorithm burns out in a quarter.",
  },
  { n: "03", title: "One metric", body: "Agreed before we start, reported against every week." },
  {
    n: "04",
    title: "DM-native where it fits",
    body: "Not every market checks out on a website. The Gallery sells through Instagram DMs and the campaign was built for that.",
  },
];

const FAQ = [
  {
    q: "Do you guarantee results?",
    a: "No. Nobody who guarantees a number is telling you the truth. We tell you what we think we can hit, and we write it down.",
  },
  {
    q: "Who pays for ad spend?",
    a: "You do, on your own card. Our fee and your media budget never touch, and we never mark up a third-party invoice.",
  },
  { q: "Minimum term?", a: "Three months to see anything real. Thirty days’ notice after that." },
];

export default function PerformancePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Performance media",
            description:
              "Paid media and the creative that feeds it, run by the same people.",
            path: "/services/performance",
          }),
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Performance media", path: "/services/performance" },
          ]),
        ]}
      />

      <section
        className="wrap grainy"
        style={{ paddingBlock: "clamp(48px,7vw,104px)", position: "relative", overflow: "hidden" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(107deg,transparent 0 58%,var(--voltage-500) 58%)",
            opacity: 0.14,
          }}
        />
        <div style={{ position: "relative", maxWidth: 1100 }}>
          <div className="eye">01 — Performance media</div>
          <h1
            className="disp"
            style={{ fontSize: "clamp(42px,7.6vw,128px)", marginTop: 20, lineHeight: 0.84 }}
          >
            Views don&rsquo;t
            <br />
            pay invoices.
          </h1>
          <p className="body" style={{ maxWidth: "54ch", marginTop: 28, fontSize: 19 }}>
            Paid media and the creative that feeds it, run by the same people.
          </p>
          <div
            style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 32, flexWrap: "wrap" }}
          >
            <Link href="/contact" className="btn">
              Tell us the number ↗
            </Link>
            <span className="small">The Gallery: 5.2–6× ROAS on every campaign we ran</span>
          </div>
        </div>
      </section>

      <section className="wrap sect">
        <div className="two">
          <div>
            <div className="eye mut">The problem</div>
            <h2 className="disp" style={{ fontSize: "clamp(26px,3.4vw,50px)", marginTop: 14 }}>
              Two reports
              <br />
              that never
              <br />
              agree.
            </h2>
          </div>
          <div>
            <p className="body">
              Your agency sends a monthly report full of reach and engagement rate. Your Shopify
              dashboard tells a different story. Nobody connects the two because the person buying
              the media has never spoken to the person making the ad.
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
              5.2–6×
            </h2>
          </div>
          <div>
            <p className="body">
              ROAS on every campaign we ran for The Gallery. Not an average across a good quarter —
              every campaign.
            </p>
            <p className="body" style={{ marginTop: 14 }}>
              What you get: full account management across Meta and Google · creative production,
              static and video · weekly reporting against the agreed number · landing page and
              funnel work where it&rsquo;s the bottleneck · a monthly call that isn&rsquo;t a status
              update.
            </p>
            <div style={{ marginTop: 22 }}>
              <Link href="/work/gallery" className="btn sec">
                Read the case ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sect">
        <div className="two">
          <div>
            <div className="eye">Investment</div>
            <h2 className="disp" style={{ fontSize: "clamp(24px,3.2vw,44px)", marginTop: 14 }}>
              We&rsquo;re not the
              <br />
              cheap option.
            </h2>
          </div>
          <div>
            <p className="body">
              Retainers start where the work is worth doing, and they&rsquo;re losable at thirty
              days. If the budget is not there yet we will say so on the first call and point you
              somewhere sensible.
            </p>
          </div>
        </div>
      </section>

      {/* The proof figure above is this page's peak. Until now the next available
          action was past the receipts grid and the FAQ. */}
      <MidCta
        eyebrow="The Gallery did it"
        headline={["5.2–6× is", "the floor we", "work from."]}
        body={
          <>
            <p className="body" style={{ maxWidth: "46ch" }}>
              That number came from ten creatives and a campaign built for where the sale
              actually closes. Yours will come from somewhere else — which is what the
              call is for.
            </p>
            <p className="body" style={{ maxWidth: "46ch", marginTop: 14 }}>
              Bring the return you need and the date. If your budget can&rsquo;t reach it,
              we&rsquo;ll say so before you spend a month finding out.
            </p>
          </>
        }
        secondary={{ href: "/work/gallery", label: "Read The Gallery case" }}
      />

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
              The Gallery, on screen.
            </h2>
          </div>
        </div>
        <div className="proofgrid two">
          <div>
            <div className="slotframe">
              <ImageSlot placeholder="Campaign creative" />
            </div>
          </div>
          <div>
            <div className="slotframe">
              <ImageSlot placeholder="DM conversation or order" />
            </div>
          </div>
        </div>
      </section>

      <Faq items={FAQ} />
      <CtaBand />
    </>
  );
}
