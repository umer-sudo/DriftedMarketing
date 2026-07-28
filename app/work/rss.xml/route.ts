import { CASES } from "@/content/cases";
import { site } from "@/lib/config";

/* 83 — RSS for the work index.

   Not nostalgia: a feed is how agency work reaches the people who syndicate it —
   newsletter curators, Slack RSS bots, Feedly. It costs one route and means
   publishing a new case notifies an audience automatically.

   Descriptions carry the sub only. Pulling the stat grid in would mean restating
   figures outside content/cases.ts, which is the one place they are allowed to live. */

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = CASES.map(
    (c) => `    <item>
      <title>${esc(`${c.client} — ${c.hero.join(" ")}`)}</title>
      <link>${site.url}/work/${c.slug}</link>
      <guid isPermaLink="true">${site.url}/work/${c.slug}</guid>
      <description>${esc(c.sub)}</description>
      <category>${esc(c.category)}</category>
    </item>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Work</title>
    <link>${site.url}/work</link>
    <atom:link href="${site.url}/work/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${esc("Case studies with the figures attached. Published numbers, or a pending flag.")}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
