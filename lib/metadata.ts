import type { Metadata } from "next";

/* Per-route metadata.

   Next does not merge the `openGraph` or `twitter` objects with the layout's — a
   page either declares the whole object or inherits the whole thing. Every page
   here declared `title` and `description` and left the rest alone, so /work,
   /about, /contact and the three service pages all shared the homepage's social
   card, and every route on the site including the case studies shared the
   homepage's Twitter card. A link to a case study previewed as "Drifted
   Marketing — Look bigger than you are".

   Rather than repeat three near-identical blocks per page, this derives them from
   the one title and description the page already writes. `og:url` comes along for
   free, which nothing was setting either.

   The layout keeps its own literal metadata: it is the fallback for anything that
   doesn't call this, and the homepage's card is the right fallback to have. */

type Options = {
  title: string;
  description: string;
  /** Root-relative, no trailing slash. Feeds the canonical and og:url. */
  path: string;
  /** Case studies are articles; everything else is a website. */
  type?: "website" | "article";
  /** Set false on a route that has its own opengraph-image.tsx, so its generated
      card is used instead of the site-wide one. */
  ownOgImage?: boolean;
  alternates?: Metadata["alternates"];
};

/* Declaring `openGraph` on a page replaces the layout's wholesale, and that
   includes the image the root app/opengraph-image.tsx contributes — so a helper
   that only sets title and description silently strips the card off every route
   that relied on it. Routes with their own opengraph-image.tsx segment still get
   theirs injected; everything else has to name the site-wide card explicitly. */
const SITE_CARD = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Drifted Marketing — Look bigger than you are",
  type: "image/png",
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  ownOgImage = false,
  alternates,
}: Options): Metadata {
  /* Spread rather than `images: undefined` — Next treats the key being present at
     all as the author having spoken, and skips injecting the segment's generated
     card. The key has to be genuinely absent. */
  const card = ownOgImage ? {} : { images: [SITE_CARD] };
  return {
    title,
    description,
    alternates: { canonical: path, ...alternates },
    openGraph: {
      title,
      description,
      type,
      url: path,
      siteName: "Drifted Marketing",
      locale: "en_GB",
      ...card,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...card,
    },
  };
}
