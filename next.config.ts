import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /* Redirects from the previous site.
   *
   * This site replaces one that was already live at the domain, so every URL the
   * old site had is about to start returning 404 — to visitors, to anything that
   * linked to it, and to Google, which will drop the pages rather than transfer
   * their history. A 301 moves that history to the new page; a 404 throws it away.
   *
   * Fill this in before cutover. To find the old URLs:
   *   - the old sitemap.xml, if it had one
   *   - Google Search Console → Pages, or `site:yourdomain.com` in Google
   *   - the host's access logs
   *
   * Map each one to its closest equivalent here. Anything with no equivalent is
   * better left to the 404, which offers the work index and the call.
   */
  async redirects() {
    return [
      // { source: "/services", destination: "/services/performance", permanent: true },
      // { source: "/portfolio", destination: "/work", permanent: true },
      // { source: "/get-in-touch", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
