import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import MidCta from "@/components/MidCta";
import ImageSlot from "@/components/ImageSlot";
import CaseGallery from "@/components/CaseGallery";
import JsonLd from "@/components/JsonLd";
import { caseSchema, breadcrumbSchema } from "@/lib/structured-data";
import { CASES, caseBySlug } from "@/content/cases";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) return { title: "Case study — Drifted" };
  /* `sub` alone runs short on some cases — a 60-character snippet wastes the half
     of a search result that actually sells the click. Leading with the outcome and
     the discipline fills it with the two things a reader is scanning for. */
  /* Some `result` strings are authored with a full stop, some without. */
  const result = c.result.replace(/[.]+$/, "");
  const description = `${result}. ${c.sub} ${c.tags.join(" · ")}, Drifted Marketing.`;
  const title = `${c.client} — ${result} — Drifted`;
  return pageMetadata({
    title,
    description,
    path: `/work/${c.slug}`,
    type: "article",
    /* Each case generates its own card from its own numbers. */
    ownOgImage: true,
  });
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) notFound();
  /* Traversal runs in array order, not off the authored `next` field.

     That field doesn't form a ring: zoller→ehsaan→zoller and noted→gallery→noted
     are two-cycles, so a reader clicking "next" repeatedly ping-pongs between a
     pair and never reaches the other four cases. Index order guarantees all six
     are reachable in both directions. The authored `next` is left in the data as
     the editorial "read this one after" hint, but it no longer drives navigation. */
  const i = CASES.indexOf(c);
  const prev = CASES[(i - 1 + CASES.length) % CASES.length]!;
  const next = CASES[(i + 1) % CASES.length]!;

  return (
    <>
      <JsonLd
        data={[
          caseSchema(c),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: c.client, path: `/work/${c.slug}` },
          ]),
        ]}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="grainy"
        style={{
          position: "relative",
          height: "min(58vh,520px)",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: c.bg }}>
          <ImageSlot
            placeholder="Hero visual — product screen, campaign still, platform UI"
            background={c.bg}
            priority
            sizes="100vw"
          />
        </div>
        <div
          style={{ position: "absolute", inset: 0, background: "var(--scrim-bottom)", pointerEvents: "none" }}
          aria-hidden="true"
        />
        <div className="wrap" style={{ position: "relative", width: "100%", paddingBottom: 44 }}>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Drifted</Link>
            <span aria-hidden="true">/</span>
            <Link href="/work">Work</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c.client}</span>
          </nav>
          <div className="eye" style={{ marginTop: 18 }}>
            {c.client}
          </div>
          <h1 className="disp" style={{ fontSize: "clamp(36px,7vw,116px)", marginTop: 16 }}>
            {c.hero[0]}
            <br />
            {c.hero[1]}
          </h1>
          <p className="body" style={{ maxWidth: "52ch", marginTop: 18, fontSize: 18 }}>
            {c.sub}
          </p>
        </div>
      </section>

      {/* ── Meta bar ───────────────────────────────────────────────────────── */}
      <div className="metabar">
        {c.meta.map(([k, v], i) => (
          <div key={k}>
            <span className="eye mut">{k}</span>
            <b style={i === 3 ? { color: "var(--voltage-500)" } : undefined}>{v}</b>
          </div>
        ))}
      </div>

      {/* ── The challenge ──────────────────────────────────────────────────── */}
      <section className="wrap sect" style={{ borderTop: 0 }}>
        <div className="two">
          <div>
            <div className="eye">The challenge</div>
            <h2 className="disp" style={{ fontSize: "clamp(24px,3.2vw,46px)", marginTop: 14 }}>
              {c.challengeTitle.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < c.challengeTitle.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
          <div>
            {c.challenge.map((p, i) => (
              <p className="body" key={i} style={i ? { marginTop: 14 } : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we did ────────────────────────────────────────────────────── */}
      <section className="wrap sect">
        <div className="eye">What we did</div>
        <h2 className="disp" style={{ fontSize: "clamp(26px,3.6vw,54px)", marginTop: 14 }}>
          {c.phases.length} phases.
        </h2>
        <div style={{ marginTop: 26 }}>
          {c.phases.map((p, i) => (
            <div className="phase rv" key={p.title}>
              <div className="phaseno">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="disp" style={{ fontSize: 22 }}>
                  {p.title}
                </h3>
                <p className="body" style={{ marginTop: 10, maxWidth: "60ch" }}>
                  {p.body}
                </p>
                <div
                  className="shotbox"
                  style={{ height: "clamp(190px,26vw,340px)", padding: 0, overflow: "hidden" }}
                >
                  <ImageSlot placeholder={`Still from phase ${String(i + 1).padStart(2, "0")}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What we found ──────────────────────────────────────────────────── */}
      {c.found && (
        <section className="wrap sect">
          <div className="eye">What we found</div>
          <p className="body" style={{ maxWidth: "62ch", marginTop: 14, fontSize: 19 }}>
            {c.found}
          </p>
        </section>
      )}

      {/* ── The numbers ────────────────────────────────────────────────────── */}
      <section className="sect" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="eye">Results</div>
          <h2 className="disp" style={{ fontSize: "clamp(26px,3.6vw,54px)", marginTop: 14 }}>
            The numbers.
          </h2>
          <p className="body" style={{ maxWidth: "60ch", marginTop: 14 }}>
            Every figure here is published or pending. Nothing is estimated in advance.
          </p>
          <p className="caseupdated" style={{ marginTop: 16 }}>
            Figures last confirmed with the client{" "}
            <time dateTime={c.verified}>
              {new Date(c.verified).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
        </div>
        <div className="nums" style={{ gridTemplateColumns: "repeat(3,minmax(0,1fr))", marginTop: 30 }}>
          {c.stats.map((s) => (
            <div className="rv" key={s.label}>
              <div
                className={`n${s.accent ? " acc" : ""}`}
                style={
                  s.pending
                    ? { color: "var(--ink-400)", fontSize: "clamp(20px,2.2vw,30px)" }
                    : undefined
                }
              >
                {s.value}
              </div>
              <div className="small" style={{ marginTop: 12, color: "var(--text-primary)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* A case page's warmest moment is the instant after the stat grid. Until now
          the next thing a convinced reader could do was scroll past the proof grid,
          a held quote and two nav cards to reach the closing band. */}
      <MidCta
        eyebrow="Want one of these"
        headline={["Your number,", "on a page", "like this one."]}
        body={
          <>
            <p className="body" style={{ maxWidth: "46ch" }}>
              Every figure above traces to something we can show you. That is the whole
              offer: pick a metric, pick a date, and we&rsquo;ll tell you on the call
              whether it&rsquo;s reachable.
            </p>
            <p className="body" style={{ maxWidth: "46ch", marginTop: 14 }}>
              If it isn&rsquo;t, you get that answer in thirty minutes instead of a
              quarter.
            </p>
          </>
        }
        secondary={{ href: "/work", label: "See all six cases" }}
      />

      {/* ── Receipts ───────────────────────────────────────────────────────── */}
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
            <h2 className="disp" style={{ fontSize: "clamp(26px,3.6vw,54px)", marginTop: 14 }}>
              Screens, not claims.
            </h2>
          </div>
        </div>
        <CaseGallery images={c.gallery} />
      </section>

      {/* ── Quote, held ────────────────────────────────────────────────────── */}
      <section className="wrap sect">
        <div className="held">
          <div className="eye mut">Section held</div>
          <p
            className="disp"
            style={{ fontSize: "clamp(22px,3vw,44px)", marginTop: 14, color: "var(--ink-300)" }}
          >
            [Client quote pending]
          </p>
          <p className="small" style={{ marginTop: 14, maxWidth: "52ch" }}>
            The quote goes up when the client writes one, and not before. Every agency
            site has this section full. Ask yourself how many of those were written by
            the client.
          </p>
        </div>
      </section>

      {/* ── Case navigation, both directions ──────────────────────────────── */}
      <nav className="casenav" aria-label="More case studies">
        <Link href={`/work/${prev.slug}`} className="prev">
          <span className="eye mut">← Previous</span>
          <h2 className="disp" style={{ fontSize: "clamp(22px,3vw,40px)", marginTop: 12 }}>
            {prev.client}
          </h2>
          <p className="small" style={{ marginTop: 8 }}>
            {prev.result}
          </p>
        </Link>
        <Link href={`/work/${next.slug}`} className="next">
          <span className="eye mut">Next →</span>
          <h2 className="disp" style={{ fontSize: "clamp(22px,3vw,40px)", marginTop: 12 }}>
            {next.client}
          </h2>
          <p className="small" style={{ marginTop: 8 }}>
            {next.result}
          </p>
        </Link>
      </nav>

      <CtaBand />
    </>
  );
}
