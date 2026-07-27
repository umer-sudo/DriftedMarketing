import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

/* Handoff gap 8. */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/contact/thanks" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
