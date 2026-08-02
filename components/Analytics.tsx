import Script from "next/script";

/* Cookie-free analytics — handoff gap 6.

   The brief calls for cookie-free, so this supports Plausible and Umami. Both count
   visits without cookies, without cross-site identifiers and without a consent
   banner, which is the point: a GDPR cookie prompt on a page whose whole argument is
   "no theatre" would be its own kind of theatre.

   Renders nothing until configured. Pick one:

     Plausible — NEXT_PUBLIC_PLAUSIBLE_DOMAIN=driftedmarketing.com
                 NEXT_PUBLIC_PLAUSIBLE_HOST=https://plausible.io   (self-host? change it)
     Umami     — NEXT_PUBLIC_UMAMI_WEBSITE_ID=<uuid>
                 NEXT_PUBLIC_UMAMI_HOST=https://cloud.umami.is

   Both are loaded `afterInteractive`, so analytics never blocks first paint. If both
   are set, Plausible wins — running two is double-counting, not redundancy. */

export default function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (plausibleDomain) {
    const host = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST ?? "https://plausible.io";
    return (
      <Script
        src={`${host}/js/script.js`}
        data-domain={plausibleDomain}
        strategy="afterInteractive"
      />
    );
  }

  if (umamiId) {
    const host = process.env.NEXT_PUBLIC_UMAMI_HOST ?? "https://cloud.umami.is";
    return (
      <Script
        src={`${host}/script.js`}
        data-website-id={umamiId}
        strategy="afterInteractive"
      />
    );
  }

  return null;
}
