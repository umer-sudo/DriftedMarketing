import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import { FORJWELL_CREDIT } from "@/content/cases";

export const metadata: Metadata = {
  title: "We left on purpose — Drifted",
  description:
    "We left agencies where a strategy team, a creative team and a media team were separated by an account layer. Founded 2026 in Karachi. Three clients, small on purpose.",
  alternates: { canonical: "/about" },
};

const BELIEFS = [
  {
    title: "Say the number.",
    body: "Growth is not a metric. Pick one, put a date on it, write it into the contract.",
  },
  {
    title: "Retainers should be losable.",
    body: "Thirty days’ notice. If we’re not worth it, you shouldn’t be trapped.",
  },
  {
    title: "Nobody who guarantees a result is telling you the truth.",
    body: "We’ll tell you what we think we can hit, and report against it honestly — including when we miss.",
  },
  {
    title: "Software without a price is a hobby with a repo.",
    body: "Decide how it makes money before you build it, or spend the runway finding out nobody pays.",
  },
  {
    title: "Small is the product.",
    body: "Not a stage we’re growing out of. An account layer between you and the work is a different product.",
  },
  {
    title: "We’re not the cheap option.",
    body: "And we don’t pretend to be. The work is priced where it is worth doing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="wrap grainy" style={{ paddingBlock: "clamp(48px,7vw,104px)" }}>
        <div className="eye">Studio</div>
        <h1 className="disp" style={{ fontSize: "clamp(44px,8.4vw,140px)", marginTop: 20 }}>
          We left
          <br />
          on purpose.
        </h1>
        <p className="body" style={{ maxWidth: "56ch", marginTop: 28, fontSize: 19 }}>
          Drifted means departure. Not lost, not floating — a deliberate leaving of the way this is
          normally done.
        </p>
      </section>

      <section className="wrap sect">
        <div className="two">
          <div>
            <div className="eye">The name</div>
            <h2 className="disp" style={{ fontSize: "clamp(26px,3.2vw,46px)", marginTop: 14 }}>
              Same people.
              <br />
              All three
              <br />
              disciplines.
            </h2>
          </div>
          <div>
            <p className="body">
              We left how agencies are built: a strategy team that writes the deck, a creative team
              that makes something else, a media team that runs it, and an account manager who
              explains the gap to you.
            </p>
            <p className="body" style={{ marginTop: 14 }}>
              The work was fine. It was never better than fine, because nobody in the chain owned
              the outcome — they owned their part of it. So we drifted. That is why the mark is a
              letter that has slipped out of register.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap sect">
        <div className="eye">Who we are</div>
        <div className="two" style={{ marginTop: 16, alignItems: "end" }}>
          <h2 className="disp" style={{ fontSize: "clamp(26px,3.4vw,50px)" }}>
            Founded 2026.
            <br />
            Karachi.
            <br />
            Three clients.
          </h2>
          <p className="small">
            Small on purpose, and staying that way — because the moment we hire an account layer, we
            become the thing we left. Before Drifted, we ran sales and delivery on a book of clients
            across Pakistan, the US, Canada and Australia. We closed the work and we did the work,
            which is why the pitch and the delivery sound the same here.
          </p>
        </div>

        <div className="held" style={{ marginTop: 30 }}>
          <div className="eye mut">The roster, in full</div>
          <p className="small" style={{ marginTop: 12, color: "var(--text-body)" }}>
            Ehsaan · Adam Lewis (Zoller listing platform, Inventory Watch, zollerhistory.com) ·
            Noted. · The Gallery · Seyr · a four-brand social operation.
          </p>
          <p className="small" style={{ marginTop: 12 }}>
            {FORJWELL_CREDIT}
          </p>
        </div>
      </section>

      <section className="wrap sect">
        <div className="two">
          <div>
            <div className="eye">Who this isn&rsquo;t for</div>
            <h2 className="disp" style={{ fontSize: "clamp(26px,3.4vw,50px)", marginTop: 14 }}>
              We say no
              <br />
              in the first
              <br />
              thirty minutes.
            </h2>
          </div>
          <div>
            <p className="body">
              If you want the cheapest quote, we&rsquo;re not it. If you want a team that agrees
              with everything, we&rsquo;re not it either. If the number you need can&rsquo;t be hit
              by the date you need it, we&rsquo;ll tell you on the call instead of taking a month
              of retainer to arrive at the same answer.
            </p>
            <p className="body" style={{ marginTop: 14 }}>
              We&rsquo;ve turned down builds where the revenue model didn&rsquo;t hold. That
              isn&rsquo;t a policy we&rsquo;re proud of in the abstract — it&rsquo;s the only way
              &ldquo;we say the number&rdquo; survives contact with a real client.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap sect">
        <div className="eye">What we believe</div>
        <h2 className="disp" style={{ fontSize: "clamp(28px,3.6vw,54px)", marginTop: 14 }}>
          Opinions we&rsquo;d
          <br />
          defend in public.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 2,
            background: "var(--border-subtle)",
            marginTop: 30,
          }}
        >
          {BELIEFS.map((b) => (
            <div className="rv" key={b.title} style={{ background: "var(--tar)", padding: "28px 26px" }}>
              <h3 className="disp" style={{ fontSize: 20 }}>
                {b.title}
              </h3>
              <p className="small" style={{ marginTop: 10 }}>
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
