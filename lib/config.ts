/* Site-level configuration.

   Handoff gap 7 asks for the Zoller launch date to be a config value rather than a
   literal, so it lives here. Gaps 3 and 4 (Instagram handle, phone number) are
   unconfirmed — they are marked below and must be verified before launch. */

export const site = {
  name: "Drifted Marketing",
  shortName: "Drifted",
  /* Update to the real production origin before launch — this feeds canonical URLs,
     the sitemap and Open Graph tags. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://driftedmarketing.com",
  email: "hello@driftedmarketing.com",
  locale: "en",
  founded: 2026,
  city: "Karachi",
  timeZone: "Asia/Karachi",
  description:
    "A boutique agency for brands that need to look bigger than they are. Paid media, creator brands, AI-built product — monetization designed before line one.",
  ogDescription:
    "Performance media, creator monetization and AI product — from Karachi, for brands that need to punch three weight classes up. Tell us the number.",
} as const;

/* UNCONFIRMED — handoff gap 3. The prototype guessed this handle; it has never been
   verified. Confirm before launch or remove the DM buttons. */
export const instagram = {
  handle: "drifted.marketing",
  url: "https://instagram.com/drifted.marketing",
  confirmed: false,
} as const;

/* UNCONFIRMED — handoff gap 4. No number was supplied, so the phone icon in the CTA
   band stays decorative and is marked aria-hidden. Set `number` to wire a tel: link. */
export const phone = {
  number: null as string | null,
  confirmed: false,
} as const;

export const linkedin = {
  url: "https://www.linkedin.com/company/drifted-marketing",
  confirmed: false,
} as const;

/* Handoff gap 7 — verify this date with the client. Asia/Karachi is UTC+05:00. */
export const zollerLaunch = {
  iso: "2026-08-16T00:00:00+05:00",
  label: "16 August 2026",
} as const;

export const availability = {
  quarter: "Q4",
  slots: 2,
} as const;
