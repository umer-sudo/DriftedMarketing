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
    "Selected work: performance media, creator growth, AI product and web builds. Published numbers where they exist, pending flags where they don’t.",
  alternates: { canonical: "/work" },
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
        <p className="small" style={{ maxWidth: "78ch" }}>
          {FORJWELL_CREDIT}
        </p>
      </div>
      <CtaBand />
    </>
  );
}
