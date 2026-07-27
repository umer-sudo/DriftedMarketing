import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ImageSlot from "@/components/ImageSlot";
import Faq from "@/components/Faq";

/* AI product — dark, with Klein as its single rare accent moment. Klein is graphic
   only and never carries text at 2.3:1; here it appears as the eyebrow tint drawn
   from the 300 step, which clears contrast, and nowhere in body copy. */

export const metadata: Metadata = {
  title: "AI product — Drifted",
  description:
    "Apps and PWAs where the revenue model is written before the first commit. The Zoller platform: 400+ hours saved a year.",
  alternates: { canonical: "/services/ai-product" },
};

const METHOD = [
  {
    n: "01",
    title: "Monetization is step one",
    body: "Priced and stress-tested before design starts.",
  },
  {
    n: "02",
    title: "We turn work down",
    body: "If the model doesn’t hold, we say so before you spend.",
  },
  {
    n: "03",
    title: "Weeks, not quarters",
    body: "Ehsaan reached first build in twenty-three prompts. The Zoller platform was scoped, built and tested against a live auction date — and takes 400+ hours a year off the client’s desk.",
  },
  {
    n: "04",
    title: "Real data from day one",
    body: "We ingested a 32,000-item corpus so the product was useful on launch day, not after six months of use.",
  },
];

const FAQ = [
  {
    q: "What if you decide it can’t make money?",
    a: "We tell you, we don’t take the build, and you keep the model we produced.",
  },
  { q: "Do I own the code?", a: "Yes, on full payment. We retain our own frameworks and libraries." },
  {
    q: "How fast, really?",
    a: "Depends on scope. We’ll give you a date in the first call and we don’t move it.",
  },
];

export default function AiProductPage() {
  return (
    <>
      <section className="appsec" style={{ borderTop: 0 }}>
        <div className="wire" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative", paddingBlock: "clamp(48px,7vw,104px)" }}>
          <div className="eye" style={{ color: "var(--klein-300)" }}>
            03 — AI product
          </div>
          <h1
            className="disp"
            style={{ fontSize: "clamp(40px,7.2vw,120px)", marginTop: 20, lineHeight: 0.86 }}
          >
            Software
            <br />
            without a price.
          </h1>
          <p className="body" style={{ maxWidth: "56ch", marginTop: 26, fontSize: 19 }}>
            Apps and PWAs where the revenue model is written before the first commit.
          </p>
          <div
            style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 30, flexWrap: "wrap" }}
          >
            <Link href="/contact" className="btn">
              Bring us the idea ↗
            </Link>
            <span className="small">
              Zoller platform: 400+ hours saved a year, live August 2026
            </span>
          </div>
        </div>
      </section>

      <section className="wrap sect">
        <div className="two">
          <div>
            <div className="eye mut">The problem</div>
            <h2 className="disp" style={{ fontSize: "clamp(26px,3.4vw,50px)", marginTop: 14 }}>
              A repo you
              <br />
              pay to host.
            </h2>
          </div>
          <div>
            <p className="body">
              An agency quotes eighteen months and sixty thousand dollars. You get an app, a
              handover call, and a question nobody answered: how does this make money? By then the
              runway is gone.
            </p>
            <p className="body" style={{ marginTop: 14 }}>
              The expensive part of software is not writing it. It is writing the wrong thing
              carefully.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap sect">
        <div className="two" style={{ alignItems: "start" }}>
          <div>
            <div className="eye">What we do differently</div>
            <div style={{ marginTop: 22 }}>
              {METHOD.map((s) => (
                <div className="step rv" key={s.n} style={{ gridTemplateColumns: "60px 1fr" }}>
                  <div className="stepno">{s.n}</div>
                  <div>
                    <h3 className="disp" style={{ fontSize: 19 }}>
                      {s.title}
                    </h3>
                    <p className="small" style={{ marginTop: 8, maxWidth: "50ch" }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="term rv">
            <div className="bar">
              <i />
              <i />
              <i />
              <span
                style={{ marginLeft: 8, color: "var(--ink-400)", fontSize: 11, letterSpacing: ".1em" }}
              >
                example · monetization.spec (illustrative)
              </span>
            </div>
            <div className="out">
              <div>
                <b>01</b> model &nbsp;&nbsp;→ subscription · $19/mo · annual −20%
              </div>
              <div>
                <b>02</b> wedge &nbsp;&nbsp;→ free plan capped at 3 / week
              </div>
              <div>
                <b>03</b> trigger → paywall on action #4 · day 6 median
              </div>
              <div>
                <b>04</b> loop &nbsp;&nbsp;&nbsp;→ weekly digest · D7 reactivation
              </div>
              <div>
                <b>05</b> target &nbsp;→ 35% D30 · $19 ARPU · CAC &lt; $42
              </div>
              <div>
                <b>06</b> stack &nbsp;&nbsp;→ PWA · Stripe · Postgres · one repo
              </div>
              <div style={{ color: "var(--voltage-500)" }}>— design starts here —</div>
              <div style={{ color: "var(--ink-400)" }}>example spec · not a client result</div>
            </div>
          </div>
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
              400+ hrs
            </h2>
          </div>
          <div>
            <p className="body">
              Saved every year on the Frank Zoller listing platform — roughly 1,250 lots per auction
              that no longer get typed by hand.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              <Link href="/work/zoller" className="btn sec">
                Zoller platform ↗
              </Link>
              <Link href="/work/ehsaan" className="btn sec">
                Ehsaan ↗
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
              Zoller platform, on screen.
            </h2>
          </div>
        </div>
        <div className="proofgrid two">
          <div>
            <div className="slotframe">
              <ImageSlot placeholder="Platform UI screen" />
            </div>
          </div>
          <div>
            <div className="slotframe">
              <ImageSlot placeholder="Upload template filled" />
            </div>
          </div>
        </div>
      </section>

      <Faq items={FAQ} />
      <CtaBand />
    </>
  );
}
