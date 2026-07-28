import type { Metadata } from "next";
import { Suspense } from "react";
import WorkGrid from "@/components/WorkGrid";
import CtaBand from "@/components/CtaBand";
import MidCta from "@/components/MidCta";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { FORJWELL_CREDIT } from "@/content/cases";

export const metadata: Metadata = {
  title: "Work, not decks — Drifted",
  description:
    "Six cases with the figures attached: 5.2–6× ROAS, 400+ hours saved, 2.2M views. Where a number isn’t measured yet, the page says pending instead of guessing.",
  alternates: {
    canonical: "/work",
    types: { "application/rss+xml": [{ url: "/work/rss.xml", title: "Drifted — Work" }] },
  },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      {/* WorkGrid reads the filter from the query string, so it needs a boundary for
          the static build. The fallback is the unfiltered grid, which is what the
          page shows anyway before hydration. */}
      <Suspense fallback={null}>
        <WorkGrid />
      </Suspense>
      {/* The work index is the highest-intent page on the site — nobody lands here
          by accident — and its first action used to sit 79% down the page, past the
          grid and the credits. */}
      <MidCta
        eyebrow="Seen enough"
        headline={["Six cases.", "One question."]}
        body={
          <>
            <p className="body" style={{ maxWidth: "46ch" }}>
              What number do you need, and by when? That is the entire brief. Everything
              above started with someone answering it on a thirty-minute call.
            </p>
            <p className="body" style={{ maxWidth: "46ch", marginTop: 14 }}>
              If we can&rsquo;t get you there, we&rsquo;ll say so on the same call and point
              you at someone who can.
            </p>
          </>
        }
        secondary={{ href: "/about", label: "Who we are first" }}
      />

      <div className="wrap" style={{ paddingTop: 34 }}>
        <p className="body" style={{ maxWidth: "62ch" }}>
          One of these you can inspect yourself rather than take our word for.{" "}
          <a href="https://seyr.shop" target="_blank" rel="noopener noreferrer">
            seyr.shop
          </a>{" "}
          is live — open it in a new tab and judge the build.
        </p>
        <p className="small" style={{ maxWidth: "78ch", marginTop: 22 }}>
          {FORJWELL_CREDIT}
        </p>
      </div>
      <CtaBand />
    </>
  );
}
