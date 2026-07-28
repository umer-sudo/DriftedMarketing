import type { MetadataRoute } from "next";
import { CASES } from "@/content/cases";
import { site } from "@/lib/config";

/* Handoff gap 8. /contact/thanks is excluded — it is a post-submit confirmation and
   carries noindex. */

export const dynamic = "force-static";

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
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...CASES.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
