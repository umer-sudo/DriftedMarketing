import type { Metadata } from "next";
import { Suspense } from "react";
import WorkGrid from "@/components/WorkGrid";
import CtaBand from "@/components/CtaBand";
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
