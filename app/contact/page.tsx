import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { site, instagram, linkedin } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Tell us the number — Drifted",
  description:
    "Thirty minutes, no deck. Bring the metric and the date; we answer within one business day, including when the answer is no. Q4 — two client slots open.",
  path: "/contact",
});

const OBJECTIONS = [
  {
    q: "What if we’re too small?",
    a: "Then we’ll say so on the call rather than after a month of retainer. We work with three clients at a time — if the number you need can’t justify the fee, that is a fast no, not a slow one.",
  },
  {
    q: "What does it cost?",
    a: "Retainers start where the work is worth doing, and they’re losable at thirty days’ notice. We’ll give you a range on the first call once we know the number and the date.",
  },
  {
    q: "Do we have to sign anything to talk?",
    a: "No. Thirty minutes, no deck, no NDA to start. You leave with a yes, a no, or a not yet — and the reason, in writing.",
  },
  {
    q: "Who’s actually on the call?",
    a: "The people who would run the account. There is no account layer here, which means there is nobody to hand you off to afterwards.",
  },
];

const NEXT = [
  "We answer within one business day. If we’re not right for it, we’ll say so in the first reply.",
  "Thirty minutes, GMT+5, with the people who’d run the account. No deck on our side.",
  "You leave with a yes, a no, or a not yet — and the reason, in writing.",
];

export default function ContactPage() {
  return (
    <>
      <section className="wrap grainy" style={{ paddingBlock: "clamp(48px,7vw,96px)" }}>
        <div className="eye">Start here</div>
        <h1 className="disp" style={{ fontSize: "clamp(44px,8.4vw,140px)", marginTop: 18 }}>
          Tell us the
          <br />
          number.
        </h1>
        <p className="body" style={{ maxWidth: "54ch", marginTop: 26, fontSize: 19 }}>
          Thirty minutes. No deck, no discovery theatre, no account manager taking notes.
          Tell us the metric and the date, and we&rsquo;ll tell you whether we can hit it —
          or who can.
        </p>
        <p className="body" style={{ maxWidth: "54ch", marginTop: 16 }}>
          Six fields. It takes about ninety seconds, and two of them are the only ones that
          really matter.
        </p>
      </section>

      <section className="wrap sect">
        <div className="two" style={{ alignItems: "start" }}>
          <div>
            <div className="eye">The brief</div>
            {/* The promise sits above the form, not beside it. A reader deciding
                whether to spend two minutes filling this in needs to know what
                happens next before they start, not after they scroll. */}
            <p className="body" style={{ marginTop: 14, maxWidth: "46ch" }}>
              We answer within one business day — including when the answer is no. There is
              no sequence, no drip, no newsletter you didn&rsquo;t ask for.
            </p>
            <ContactForm />
          </div>

          <div>
            <div className="eye">What happens next</div>
            <div style={{ marginTop: 22 }}>
              {NEXT.map((body, i) => (
                <div
                  className="step"
                  key={i}
                  style={{ gridTemplateColumns: "40px 1fr", borderTop: i === 0 ? 0 : undefined }}
                >
                  <div className="stepno" style={{ fontSize: 19, color: "var(--voltage-500)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="small">{body}</p>
                </div>
              ))}
            </div>

            <div className="held" style={{ marginTop: 28 }}>
              <div className="eye mut">Or just DM</div>
              <p className="small" style={{ marginTop: 12 }}>
                There is no inbox manager here. A DM lands with the person who would run
                your account, which is also the person who would answer for it.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                <a
                  className="btn sec sm"
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram ↗
                </a>
                <a className="btn sec sm" href={linkedin.url} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
                <a className="btn sec sm" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq items={OBJECTIONS} />
    </>
  );
}
