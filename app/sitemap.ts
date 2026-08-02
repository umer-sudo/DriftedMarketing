import type { MetadataRoute } from "next";
import { CASES } from "@/content/cases";
import { site } from "@/lib/config";

/* Handoff gap 8. /contact/thanks is excluded — it is a post-submit confirmation and
   carries noindex.

   `lastModified` is the only hint in this file Google actually uses; it ignores
   changefreq and priority outright. They are kept because Bing still reads them and
   they cost nothing, but the dates are the part that does work.

   A case study's date is the day its figures were last confirmed with the client,
   which is genuinely when the page last changed in a way worth recrawling. The
   static pages take the most recent of those — the marketing copy quotes the case
   figures, so it is stale exactly when they are. Nothing here is `new Date()`: a
   sitemap that claims every page changed at build time is a sitemap crawlers learn
   to ignore. */

export const dynamic = "force-static";

const lastCaseUpdate = CASES.map((c) => c.verified).sort().at(-1)!;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/services/performance", priority: 0.8 },
    { path: "/services/creators", priority: 0.8 },
    { path: "/services/ai-product", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
  ];

  return [
    ...routes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: lastCaseUpdate,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...CASES.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      lastModified: c.verified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
