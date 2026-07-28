/* JSON-LD — the remainder of handoff gap 8 (sitemap and robots already shipped).

   Deliberately conservative. Schema.org lets you assert a great deal about an
   organisation; the brand brief forbids claiming anything unpublished, and that rule
   does not stop applying because the audience is a crawler. So: no aggregateRating,
   no review markup, no employee count, no founder name that hasn't been published,
   and no numbers that aren't already on the page. */

import { site, instagram, linkedin } from "./config";
import type { CaseStudy } from "@/content/cases";

const abs = (path: string) => new URL(path, site.url).toString();

export function organizationSchema() {
  /* Only include social profiles that have actually been confirmed — sameAs is an
     identity claim, and the Instagram handle is still a guess (gap 3). */
  const sameAs = [
    instagram.confirmed ? instagram.url : null,
    linkedin.confirmed ? linkedin.url : null,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": abs("/#organization"),
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    description: site.description,
    logo: abs("/logo.svg"),
    email: site.email,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "PK",
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: site.url,
    name: site.name,
    publisher: { "@id": abs("/#organization") },
    inLanguage: "en",
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { "@id": abs("/#organization") },
    areaServed: "Worldwide",
  };
}

/* Case studies are CreativeWork, not Article — they are portfolio pieces, not
   journalism, and marking them as Article invites rich results they shouldn't get. */
export function caseSchema(c: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${c.client} — ${c.hero.join(" ")}`,
    headline: c.hero.join(" "),
    description: c.sub,
    url: abs(`/work/${c.slug}`),
    creator: { "@id": abs("/#organization") },
    about: c.tags.join(", "),
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
