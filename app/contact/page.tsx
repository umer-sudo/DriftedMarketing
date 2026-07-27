import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site, instagram, linkedin } from "@/lib/config";

export const metadata: Metadata = {
  title: "Tell us the number — Drifted",
  description:
    "Thirty minutes. No deck, no discovery theatre. Tell us the metric and the date, and we’ll tell you whether we can hit it — or who can.",
  alternates: { canonical: "/contact" },
};

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
          Thirty minutes. No deck, no discovery theatre. Tell us the metric and the date, and
          we&rsquo;ll tell you whether we can hit it — or who can.
        </p>
      </section>

      <section className="wrap sect">
        <div className="two" style={{ alignItems: "start" }}>
          <div>
            <div className="eye">The brief</div>
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
                There is no inbox manager. A DM lands with the person who would run your account.
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
    </>
  );
}
