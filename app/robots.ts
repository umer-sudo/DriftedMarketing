import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

/* Handoff gap 8. */

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    /* /contact/thanks is deliberately NOT disallowed. It carries a noindex meta
       tag, and a Disallow would stop crawlers fetching the page at all — so they
       could never read the noindex. A URL blocked in robots.txt can still be
       indexed as a bare link if anything points at it; a crawlable noindex is the
       only instruction that actually removes it. */
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
