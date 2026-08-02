import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Users, Cpu, PhoneCall, Crosshair, Receipt } from "lucide-react";
import Orb from "@/components/Orb";
import Marquee from "@/components/Marquee";
import ShipTicker from "@/components/ShipTicker";
import ScrollJack from "@/components/ScrollJack";
import WorkTile from "@/components/WorkTile";
import CtaBand from "@/components/CtaBand";
import MidCta from "@/components/MidCta";
import ImageSlot from "@/components/ImageSlot";
import { CASES, CLIENTS } from "@/content/cases";

export const metadata: Metadata = {
  title: "Drifted — Look bigger than you are",
  description:
    "5.2–6× ROAS every campaign. 400+ hours a year saved. 2.2M views from an 811-follower account. Boutique agency, Karachi. Tell us the number and the date.",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/work/rss.xml", title: "Drifted — Work" }] },
  },
  /* The home page keeps its own OG line — shorter and sharper than the meta
     description, which has to carry the numbers for search. */
  openGraph: {
    title: "Drifted — Look bigger than you are",
    description:
      "Every agency says growth. We say the number — one metric, one date, written into the contract.",
    type: "website",
    url: "/",
    siteName: "Drifted Marketing",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drifted — Look bigger than you are",
    description:
      "Every agency says growth. We say the number — one metric, one date, written into the contract.",
  },
};

const BEATS = [
  {
    usual: "A strategist writes the deck. A creative team makes something else. A media buyer runs it.",
    ours: "The people in the pitch are the people on the work.",
  },
  {
    usual: "You get impressions, reach, engagement rate.",
    ours: "You get one metric and a date.",
  },
  {
    usual: "Twelve-month lock-in so they can survive the first bad quarter.",
    ours: "Retainers should be losable. Thirty days’ notice, always.",
  },
  {
    usual: "An app quoted at $60,000 and eighteen months, with no answer for how it earns.",
    ours: "We decide how it makes money before we build it. If it can’t, we say so.",
  },
];

const PROCESS = [
  {
    n: "01",
    Icon: PhoneCall,
    title: "The call",
    body: "Thirty minutes with the people who would run the account. No deck, no discovery theatre, no account manager taking notes.",
  },
  {
    n: "02",
    Icon: Crosshair,
    title: "The number",
    body: "Yes or no on the call, not after a month of discovery. Yes comes with a scope, a date, and a figure we report against every week.",
  },
  {
    n: "03",
    Icon: Receipt,
    title: "The receipts",
    body: "Measured against the number, not against impressions. Published figures or a pending flag — never an estimate dressed up as a result.",
  },
];


export default function Home() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="hero wrap grainy">
        <Orb />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" className="wm-logo" aria-hidden="true" />

        <div
          className="herotext"
          style={{ position: "relative", gridColumn: 1, gridRow: 1, maxWidth: "min(100%,760px)" }}
        >
          <div className="eye">Drifted Marketing · Est. 2026</div>
          <h1 className="disp" style={{ marginTop: 26 }}>
            Look <span className="fill">bigger</span>
            <br />
            <span className="ol">than</span> you are
          </h1>
          <p className="body" style={{ maxWidth: "44ch", marginTop: 34, fontSize: 19 }}>
            Three clients. Six disciplines. No account manager to explain why the number
            slipped — because the people who pitch you are the people doing the work.
            5.2–6× ROAS every campaign. 400+ hours a year off one client&rsquo;s desk.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 38, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn">
              Tell us the number ↗
            </Link>
            <Link href="/work" className="btn sec">
              See the work
            </Link>
          </div>
        </div>

        <div className="herofoot">
          <span className="cue">
            <i /> Keep going
          </span>
          <span className="eye mut">Karachi · Est. 2026</span>
        </div>
      </section>

      <Marquee />

      {/* ── The numbers ────────────────────────────────────────────────────── */}
      <section className="wrap" style={{ paddingBlock: "clamp(48px,6vw,88px)" }}>
        <div className="eye">Receipts, not adjectives</div>
        <p className="body" style={{ maxWidth: "54ch", marginTop: 14, marginBottom: 4 }}>
          Four figures we can name a client against. Everything else on this site is
          either published or says pending — there is no third category.
        </p>
        <div className="nums">
          <div className="rv">
            <div className="n acc" data-count="5.2" data-suffix="–6×">
              0×
            </div>
            <div className="small" style={{ marginTop: 14, color: "var(--text-primary)" }}>
              ROAS on every campaign
            </div>
            <div className="eye mut" style={{ marginTop: 8 }}>
              The Gallery
            </div>
          </div>
          <div className="rv">
            <div className="n" data-count="400" data-suffix="+">
              0
            </div>
            <div className="small" style={{ marginTop: 14, color: "var(--text-primary)" }}>
              Hours saved per year
            </div>
            <div className="eye mut" style={{ marginTop: 8 }}>
              Frank Zoller Authentic History
            </div>
          </div>
          <div className="rv">
            <div className="n" data-count="2.2" data-suffix="M">
              0M
            </div>
            <div className="small" style={{ marginTop: 14, color: "var(--text-primary)" }}>
              Views in 90 days, 80% organic
            </div>
            <div className="eye mut" style={{ marginTop: 8 }}>
              The Poster Project
            </div>
          </div>
          <div className="rv">
            <div className="n" data-count="3" data-suffix="K">
              0K
            </div>
            <div className="small" style={{ marginTop: 14, color: "var(--text-primary)" }}>
              New followers per month
            </div>
            <div className="eye mut" style={{ marginTop: 8, overflowWrap: "anywhere" }}>
              @theonlycanadianbacon
            </div>
          </div>
        </div>
      </section>

      {/* ── Why we left ────────────────────────────────────────────────────── */}
      <section className="wrap sect opwrap" style={{ paddingBottom: 0 }}>
        <span className="opnum" aria-hidden="true">
          01
        </span>
        <div className="eye">Why we left</div>
        <h2 className="disp" style={{ fontSize: "clamp(34px, 5.4vw, 77.8px)", marginTop: 14 }}>
          Every agency
          <br />
          says growth.
        </h2>
        <p className="body" style={{ maxWidth: "56ch", marginTop: 22 }}>
          We say the number. One metric, one date, written into the contract.
        </p>
      </section>

      <div style={{ marginTop: 44 }}>
        {BEATS.map((b) => (
          <div className="beat rv" key={b.ours}>
            <div>
              <div className="eye mut">How it usually works</div>
              <p
                className="disp"
                style={{
                  fontSize: "clamp(21px,2.4vw,34px)",
                  color: "var(--ink-300)",
                  marginTop: 16,
                }}
              >
                <span className="strike">{b.usual}</span>
              </p>
            </div>
            <div>
              <div className="eye">How we work</div>
              <p className="disp" style={{ fontSize: "clamp(21px,2.4vw,34px)", marginTop: 16 }}>
                {b.ours}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="wrap" style={{ paddingTop: 44 }}>
        <p className="disp" style={{ fontSize: "clamp(20px, 2.6vw, 37.4px)" }}>
          We&rsquo;re not the cheap option and we don&rsquo;t pretend to be.
        </p>
      </div>

      {/* ── Services ───────────────────────────────────────────────────────── */}
      <section className="wrap sect opwrap" style={{ paddingBottom: 0 }}>
        <span className="opnum" aria-hidden="true">
          02
        </span>
        <div className="eye">Three disciplines, one P&amp;L</div>
        <h2 className="disp" style={{ fontSize: "clamp(34px, 5.4vw, 77.8px)", marginTop: 14 }}>
          Pick your
          <br />
          departure.
        </h2>
      </section>

      <div className="svc" style={{ marginTop: 44 }}>
        <div className="rv" style={{ gridRow: "span 2" }}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <BarChart3 className="lu" style={{ width: 26, height: 26, color: "var(--voltage-500)" }} aria-hidden="true" />
            </div>
            <div className="svcno">01</div>
            <h3 className="disp" style={{ fontSize: "clamp(28px, 3.4vw, 49px)", marginTop: 16 }}>
              <Link href="/services/performance" className="tilelink">
                Views don&rsquo;t pay
                <br />
                invoices. Stories do.
              </Link>
            </h3>
          </div>
          <div>
            <p className="body" style={{ maxWidth: "46ch" }}>
              Paid social and search, plus the creative that feeds it. For DTC brands whose ad
              account and content have stopped speaking to each other.
            </p>
            <div className="eye" style={{ marginTop: 24 }}>
              Run the media →
            </div>
            <div className="eye" style={{ marginTop: 18 }}>
              5.2–6× ROAS — The Gallery
            </div>
          </div>
        </div>

        <div className="rv" style={{ minHeight: 200 }}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <Users className="lu" style={{ width: 26, height: 26, color: "var(--voltage-500)" }} aria-hidden="true" />
            </div>
            <div className="svcno" style={{ fontSize: "clamp(36px, 4vw, 57.6px)" }}>
              02
            </div>
            <h3 className="disp" style={{ fontSize: "clamp(22px,2.6vw,36px)", marginTop: 12 }}>
              <Link href="/services/creators" className="tilelink">
                An audience without
                <br />
                a business model
                <br />
                is a hobby
              </Link>
            </h3>
          </div>
          <div>
            <p className="small" style={{ maxWidth: "44ch" }}>
              Monetization, product, and the launch that turns attention into revenue. We built
              Noted. from a red pen and a margin table.
            </p>
            <div className="eye" style={{ marginTop: 18 }}>
              Build the business →
            </div>
            <div className="eye" style={{ marginTop: 18 }}>
              3K followers / month — Noted.
            </div>
          </div>
        </div>

        <div className="rv" style={{ minHeight: 200 }}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <Cpu className="lu" style={{ width: 26, height: 26, color: "var(--voltage-500)" }} aria-hidden="true" />
            </div>
            <div className="svcno" style={{ fontSize: "clamp(36px, 4vw, 57.6px)" }}>
              03
            </div>
            <h3 className="disp" style={{ fontSize: "clamp(22px,2.6vw,36px)", marginTop: 12 }}>
              <Link href="/services/ai-product" className="tilelink">
                Software
                <br />
                without a price
              </Link>
            </h3>
          </div>
          <div>
            <p className="small" style={{ maxWidth: "44ch" }}>
              Apps and PWAs where the revenue model is written before the first commit. Shipped
              in weeks, not quarters.
            </p>
            <div className="eye" style={{ marginTop: 18 }}>
              Ship the product →
            </div>
            <div className="eye" style={{ marginTop: 18 }}>
              400+ hours saved — Zoller
            </div>
          </div>
        </div>
      </div>

      {/* ── Client strip ───────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="eye mut" style={{ marginBottom: 16 }}>
            On the books — every one a signed engagement, not a logo wall
          </div>
          <div className="clientstrip">
            {CLIENTS.map((name) => (
              <b key={name}>{name}</b>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work preview ───────────────────────────────────────────────────── */}
      <section
        className="wrap sect opwrap"
        style={{
          paddingBottom: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <span className="opnum" aria-hidden="true">
          03
        </span>
        <div>
          <div className="eye">The receipts</div>
          <h2 className="disp" style={{ fontSize: "clamp(34px, 5.4vw, 77.8px)", marginTop: 14 }}>
            Work,
            <br />
            not decks.
          </h2>
        </div>
        <Link href="/work" className="btn sec">
          All work
        </Link>
      </section>

      <div className="work" style={{ marginTop: 40 }}>
        {CASES.slice(0, 4).map((c, i) => (
          <WorkTile key={c.slug} c={c} index={i} />
        ))}
      </div>

      {/* ACTION, mid-funnel. See components/MidCta.tsx for why it's quieter than
          the closing band. */}
      <MidCta
        eyebrow="Still here"
        headline={["You’ve seen", "the numbers."]}
        body={
          <>
            <p className="body" style={{ maxWidth: "46ch" }}>
              Most agencies would have asked for your email three scrolls ago. We’d rather
              you read the receipts first and then decide.
            </p>
            <p className="body" style={{ maxWidth: "46ch", marginTop: 14 }}>
              Thirty minutes. Bring the metric you need and the date you need it by. We’ll
              tell you on the call whether we can hit it.
            </p>
          </>
        }
        secondary={{ href: "/work", label: "Read another case" }}
      />

      {/* ── The part nobody else does ──────────────────────────────────────── */}
      <section className="appsec">
        <div className="wire" aria-hidden="true" />
        <div
          className="wrap appgrid"
          style={{ position: "relative", paddingBlock: "clamp(64px,9vw,132px)" }}
        >
          <div className="rv">
            <div className="eye" style={{ color: "var(--klein-300)" }}>
              The part nobody else does
            </div>
            <h2 className="disp" style={{ fontSize: "clamp(34px, 5.4vw, 77.8px)", marginTop: 18 }}>
              We decide
              <br />
              how it earns.
            </h2>
            <p className="body" style={{ maxWidth: "52ch", marginTop: 24 }}>
              Most agencies build the app and hand you the problem. Eighteen months, sixty thousand
              dollars, and a product with no answer for how it makes money.
            </p>
            <p className="body" style={{ maxWidth: "52ch", marginTop: 14 }}>
              We start at the revenue model. If the idea can&rsquo;t earn, we tell you before you
              spend — and we&rsquo;ve turned work down for exactly that reason.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                gap: 20,
                marginTop: 34,
              }}
            >
              <div>
                <div className="disp" style={{ fontSize: 22 }}>
                  01 Monetize
                </div>
                <div className="eye mut" style={{ marginTop: 8, lineHeight: 1.7 }}>
                  Priced and stress-tested before design starts
                </div>
              </div>
              <div>
                <div className="disp" style={{ fontSize: 22 }}>
                  02 Design
                </div>
                <div className="eye mut" style={{ marginTop: 8, lineHeight: 1.7 }}>
                  The shortest path from open to paid
                </div>
              </div>
              <div>
                <div className="disp" style={{ fontSize: 22 }}>
                  03 Ship
                </div>
                <div className="eye mut" style={{ marginTop: 8, lineHeight: 1.7 }}>
                  Weeks, not quarters
                </div>
              </div>
            </div>

            <p
              className="disp"
              style={{
                fontSize: "clamp(19px,2.2vw,30px)",
                marginTop: 32,
                color: "var(--voltage-500)",
              }}
            >
              Software without a price is a hobby with a repo.
            </p>
            <div style={{ marginTop: 26 }}>
              <Link href="/services/ai-product" className="btn sec">
                Bring us the idea ↗
              </Link>
            </div>
          </div>

          <div className="term rv">
            <div className="bar">
              <i />
              <i />
              <i />
              <span style={{ marginLeft: 8, color: "var(--ink-400)", fontSize: 11, letterSpacing: ".1em" }}>
                example · monetization.spec (illustrative)
              </span>
            </div>
            <div className="out">
              <div>
                <b>01</b> model &nbsp;→ subscription · $19/mo · annual −20%
              </div>
              <div>
                <b>02</b> wedge &nbsp;→ free plan capped at 3 / week
              </div>
              <div>
                <b>03</b> trigger → paywall on action #4 · day 6 median
              </div>
              <div>
                <b>04</b> loop &nbsp;&nbsp;→ weekly digest · D7 reactivation
              </div>
              <div>
                <b>05</b> target → 35% D30 · $19 ARPU · CAC &lt; $42
              </div>
              <div style={{ color: "var(--voltage-500)" }}>— design starts here —</div>
              <div style={{ color: "var(--ink-400)" }}>example spec · not a client result</div>
            </div>
          </div>
        </div>
      </section>

      <ScrollJack />

      {/* The five-step "No account managers" band used to sit here. It explained
          the same engagement as "Three steps. No theatre." further down, in more
          words and with weaker verbs — two process explanations on one page is one
          too many, and the reader pays for both. The strongest lines from it now
          live in the three-step band. */}

      {/* ── Proof ──────────────────────────────────────────────────────────── */}
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
            <h2 className="disp" style={{ fontSize: "clamp(28px, 4vw, 57.6px)", marginTop: 14 }}>
              Proof you can click.
            </h2>
          </div>
        </div>
        <div className="proofgrid">
          <div>
            <div className="slotframe">
              <ImageSlot placeholder="Zoller platform — 400+ hours saved" />
            </div>
          </div>
          <div>
            <div className="slotframe">
              <ImageSlot placeholder="The Gallery — 5.2–6× ROAS dashboard" />
            </div>
          </div>
          <div>
            <div className="slotframe">
              <ImageSlot placeholder="Noted. — launch or product shot" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials, held ─────────────────────────────────────────────── */}
      <section className="wrap sect">
        <div className="eye">What they say</div>
        <div className="held rv" style={{ marginTop: 26 }}>
          <div className="eye mut">Section held</div>
          <p
            className="disp"
            style={{ fontSize: "clamp(24px, 3.4vw, 49px)", marginTop: 16, color: "var(--ink-300)" }}
          >
            [Testimonials pending]
          </p>
          <p className="small" style={{ marginTop: 16, maxWidth: "52ch" }}>
            Held until real clients write them. We could fill this section in ten minutes
            and nobody would check — which is exactly why it stays empty.
          </p>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────────────────── */}
      <section className="wrap sect">
        <div className="eye">How it runs</div>
        <h2 className="disp" style={{ fontSize: "clamp(26px, 3.6vw, 51.8px)", marginTop: 14 }}>
          Three steps. No theatre.
        </h2>
        <div className="steps" style={{ marginTop: 28 }}>
          {PROCESS.map(({ n, Icon, title, body }) => (
            <div key={n}>
              <span className="sno">{n}</span>
              <Icon className="lu" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <ShipTicker />
      <CtaBand />
    </>
  );
}
