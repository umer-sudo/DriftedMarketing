import path from "node:path";
import type { NextConfig } from "next";

/* STATIC=1 switches to a static export for hosts that can't run Node — GoDaddy
   shared hosting, GitHub Pages, any FTP target. The Node build stays the default
   because it is strictly better: the contact form runs as a Server Action with
   server-side validation, rate limiting and no exposed endpoint.
     npm run build          → Node build (default)
     npm run build:static   → ./out, upload anywhere
   See docs/DEPLOY.md. */
const STATIC = process.env.STATIC === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /* Surfaced to the client bundle so ContactForm can pick its transport. */
  env: { NEXT_PUBLIC_STATIC: STATIC ? "1" : "0" },

  ...(STATIC
    ? {
        output: "export" as const,
        /* Static hosts serve /work/ from /work/index.html; without this the
           trailing-slash forms 404 on Apache and GitHub Pages alike. */
        trailingSlash: true,
        /* No server means no on-demand image optimisation. Images pass through
           untouched, which is why docs/ART-DIRECTION.md asks for pre-sized AVIF. */
        images: { unoptimized: true },
      }
    : {}),

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
  /* A "use server" module fails the export even when only imported, so the actions
     module has to leave the graph entirely. resolve.alias doesn't do it — Next
     resolves the tsconfig `@/` path first — but NormalModuleReplacementPlugin
     rewrites the request before resolution, which does. ContactForm's import and
     its types stay untouched; only the bundled module changes. */
  ...(STATIC
    ? {
        webpack: (
          config: { plugins: unknown[] },
          /* Next passes its own bundled webpack here, so this needs no dependency. */
          {
            webpack,
          }: {
            webpack: {
              NormalModuleReplacementPlugin: new (
                resourceRegExp: RegExp,
                newResource: string,
              ) => unknown;
            };
          },
        ) => {
          config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
              /^@\/app\/contact\/actions$/,
              path.resolve(process.cwd(), "lib/actions-static-stub.ts"),
            ),
          );
          return config;
        },
      }
    : {}),

  ...(STATIC ? {} : { redirects: async () => [
      // { source: "/services", destination: "/services/performance", permanent: true },
      // { source: "/portfolio", destination: "/work", permanent: true },
      // { source: "/get-in-touch", destination: "/contact", permanent: true },
    ] }),
};

export default nextConfig;
