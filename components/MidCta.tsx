import Link from "next/link";

/* Mid-funnel call to action.

   Every page had the same shape: one CTA in the nav, one in the closing band, and
   nothing in between — so the moment a reader is warmest (just after the proof)
   was also the moment they had nothing to act on.

   Deliberately quieter than the closing Voltage plate. Two full-strength CTA bands
   on one page reads as a second ending and makes the real one land softer. */

type Props = {
  eyebrow: string;
  /** Rendered as separate display lines. */
  headline: string[];
  body: React.ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export default function MidCta({
  eyebrow,
  headline,
  body,
  primary = { href: "/contact", label: "Tell us the number ↗" },
  secondary,
}: Props) {
  return (
    <section className="wrap sect midcta">
      <div className="two" style={{ alignItems: "center" }}>
        <div>
          <div className="eye">{eyebrow}</div>
          <h2 className="disp" style={{ fontSize: "clamp(28px, 4.2vw, 60.5px)", marginTop: 14 }}>
            {headline.map((line, i) => (
              <span key={i}>
                {line}
                {i < headline.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>
        <div>
          {body}
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <Link href={primary.href} className="btn">
              {primary.label}
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn sec">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
