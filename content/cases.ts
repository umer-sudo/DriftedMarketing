/* Case content, lifted from the CASES array in the design bundle's site.js.

   Every figure here is published or explicitly flagged pending — see the handoff's
   content rules and BRIEF.md §11–12. A stat with `pending: true` renders muted and
   smaller; it must never be presented as a result. Do not add a number to this file
   that has not been published or signed off by the client. */

export type CaseCategory = "performance" | "creators" | "product" | "web";

export type CaseStat = {
  value: string;
  label: string;
  /** The headline figure for the case — rendered in Voltage. */
  accent?: boolean;
  /** Not yet measured or not yet approved — rendered muted, never as a result. */
  pending?: boolean;
};

export type CasePhase = {
  title: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  category: CaseCategory;
  /** Grid span on the work index: full-width, half, or the default third. */
  span: "wide" | "half" | "";
  tags: string[];
  /** The result line on the work tile. */
  result: string;
  /** Craft cases carry no headline metric — the result line renders muted mono. */
  craft?: boolean;
  /** Placeholder field treatment until real photography lands (handoff gap 1). */
  bg: string;
  /** Case hero. Rendered as two lines. */
  hero: [string, string];
  sub: string;
  meta: Array<[string, string]>;
  /** Rendered as separate lines. */
  challengeTitle: string[];
  challenge: string[];
  phases: CasePhase[];
  found: string;
  stats: CaseStat[];
  /** Editorial "read this next" hint. Not used for prev/next navigation — the
      authored values form two-cycles; see app/work/[slug]/page.tsx. */
  next: string;
  /** ISO date the figures on this page were last confirmed with the client. A case
      with a visible capture date is one a prospect can weigh; one without could be
      five years old. Update by hand when the numbers are re-checked. */
  verified: string;
  /** Only Seyr is publicly inspectable. */
  externalUrl?: string;
  /** Real work, taken from the studio's own delivery files. The first entry is the
      tile image on the work index; all of them render as the case gallery.

      Every asset here was looked at before it shipped. Two candidates were pulled:
      a store photograph with identifiable faces and no model release on file, and a
      social frame with a third-party stock watermark burned into it. Cases with no
      entry keep the labelled placeholder — an empty frame is more honest than
      someone else's picture. */
  gallery?: CaseImage[];
};

export type CaseImage = {
  src: string;
  /** Written for someone who cannot see it, not stuffed with keywords. */
  alt: string;
  width: number;
  height: number;
  /** Sits under the frame. Says what the thing is, not what it looks like. */
  caption: string;
};

export const CASES: CaseStudy[] = [
  {
    slug: "zoller",
    client: "Frank Zoller Authentic History",
    category: "product",
    span: "wide",
    tags: ["AI product", "400+ hours saved"],
    result: "1,250 lots. Typed by hand.",
    bg: "linear-gradient(107deg,var(--voltage-500) 0 46%,var(--tar-3) 46%)",
    hero: ["1,250 lots.", "Typed by hand."],
    sub: "Now filled from photographs — 400+ hours a year off the client’s desk.",
    meta: [
      ["Client", "Valkyrie LLC"],
      ["Discipline", "AI product · Hosted PWA"],
      ["Timeline", "2026, live 16 August"],
      ["Outcome", "400+ hours saved"],
    ],
    challengeTitle: ["Weeks of typing", "before a single", "item went live."],
    challenge: [
      "Every auction meant 1,250 lots entered by hand. Photograph, edit, renumber, then type a title, a description, a start price and an estimate range — one lot at a time, to lot 1,250.",
      "The work was not hard. It was long, and it happened before anything could be sold, on every single auction.",
    ],
    phases: [
      {
        title: "Ingestion",
        body: "32,000 past items — titles, descriptions, estimates and realized prices — ingested into a hosted backend as the model’s reference set.",
      },
      {
        title: "The engine",
        body: "Photographs in, complete listing rows out. Repeat items pull their own history; new items get identified and described from the image.",
      },
      {
        title: "Review triage",
        body: "Confidence-scored output. Only uncertain items are flagged for a human; everything else passes straight through.",
      },
      {
        title: "The handoff",
        body: "The filled template uploads straight to LiveAuctioneers, and existing automation cross-posts to BidSpirit and the direct bidding site.",
      },
    ],
    found:
      "Realized prices sat consistently below estimates across the historical set — systematic estimate inflation, invisible until 32,000 records were in one place.",
    stats: [
      { value: "400+", label: "Hours saved per year", accent: true },
      { value: "32,000", label: "Items in the reference corpus" },
      { value: "1,250", label: "Lots per auction, previously by hand" },
      { value: "21", label: "Dealer sites watched by Inventory Watch" },
      { value: "3", label: "Builds for this client, and counting" },
      { value: "[Lots processed pending]", label: "First live auction, 16 Aug", pending: true },
    ],
    next: "ehsaan",
    verified: "2026-07-01",
  },
  {
    slug: "noted",
    client: "Noted.",
    category: "creators",
    span: "",
    tags: ["Creator growth", "3K followers / month"],
    result: "115K followers. Zero products.",
    bg: "linear-gradient(90deg,#3A3B40,#8C8F98 22%,#4A4C52 36%,#B9BCC4 54%,#55575E 68%,#33343A)",
    hero: ["115K followers.", "Zero products."],
    sub: "A merch brand built from a red pen and an annotation concept.",
    meta: [
      ["Client", "Julia · @theonlycanadianbacon"],
      ["Discipline", "Creator growth · Brand"],
      ["Timeline", "Seven months, ongoing"],
      ["Outcome", "3K new followers a month"],
    ],
    challengeTitle: ["An audience", "with nothing", "to buy."],
    challenge: [
      "115K people, consistent attention, and no product. Brand deals paid inconsistently and every merch idea died at the question nobody had answered: what does it cost to make, what does it sell for, and what is left.",
    ],
    phases: [
      {
        title: "The concept",
        body: "A full identity built on a red-pen annotation idea — a brand, not a logo on a shirt.",
      },
      {
        title: "Margin first",
        body: "An eight-product line priced against real production costs, with the margin table built before anything was designed.",
      },
      {
        title: "Production",
        body: "Printful and Tapstitch hybrid, so quality and turnaround both hold at volume.",
      },
      {
        title: "The launch",
        body: "Instagram launch strategy, content calendar, and a handoff package so the cycle runs without us.",
      },
    ],
    found:
      "The audience was already there. Nothing had ever been sold to it — the constraint was structural, not creative.",
    stats: [
      { value: "3K", label: "New followers per month", accent: true },
      { value: "115K", label: "Followers at launch" },
      { value: "8", label: "Products, priced to margin" },
      { value: "7 mo", label: "Consistent monthly revenue" },
      { value: "[Revenue pending]", label: "Store still launching", pending: true },
    ],
    next: "gallery",
    verified: "2026-07-01",
    gallery: [
      {
        src: "/work/noted/lookbook.webp",
        alt: "Twenty-five Noted. products laid out in a grid \u2014 tees, hoodies, caps, mugs, notebooks and stickers, each carrying the red annotation mark.",
        width: 1400,
        height: 1241,
        caption: "The product line, drawn from one annotation concept",
      },
      {
        src: "/work/noted/editorial.webp",
        alt: "A Noted. editorial post \u2014 \u201c10 things I say that make Americans look at me weird\u201d set over a photograph of the creator on a ship\u2019s deck, captioned 32 years of Canadian vocabulary.",
        width: 1100,
        height: 1375,
        caption: "Editorial post \u2014 the voice the range sells against",
      },
      {
        src: "/work/noted/crewneck.webp",
        alt: "A black crewneck sweatshirt with the Noted. wordmark and its red asterisk across the chest.",
        width: 900,
        height: 800,
        caption: "Crewneck",
      },
      {
        src: "/work/noted/tote.webp",
        alt: "A natural canvas tote printed with \u201cI keep the receipts.\u201d in red serif type, underlined.",
        width: 900,
        height: 800,
        caption: "Tote \u2014 the line the range grew from",
      },
      {
        src: "/work/noted/mug.webp",
        alt: "An enamel mug printed with RECEIPTS in red capitals above EST. 2021.",
        width: 900,
        height: 800,
        caption: "Enamel mug",
      },
    ],
  },
  {
    slug: "ehsaan",
    client: "Ehsaan",
    category: "product",
    span: "",
    tags: ["AI product", "In production"],
    result: "Pakistan had no thrift marketplace",
    bg: "linear-gradient(150deg,var(--klein-500) 0 44%,var(--tar-3) 44%)",
    hero: ["Pakistan had no", "thrift marketplace."],
    sub: "A C2C marketplace PWA, brand system and launch campaign.",
    meta: [
      ["Client", "Suleman Farooqui"],
      ["Discipline", "AI product · Brand · Launch"],
      ["Timeline", "2026, in production"],
      ["Scope", "Marketplace PWA, identity, social, launch"],
    ],
    challengeTitle: ["A category that", "only existed in", "Instagram DMs."],
    challenge: [
      "Second-hand clothing in Pakistan moved through comment sections, WhatsApp groups and DM negotiations. No listings, no search, no trust layer, nothing built for the people actually using it.",
    ],
    phases: [
      {
        title: "Twenty-three prompts to first build",
        body: "React, Vite, TypeScript and Supabase through Lovable, then moved to Claude Code against a nineteen-section knowledge base so the product keeps its own rules as it grows.",
      },
      {
        title: "A Gen-Z-native brand",
        body: "Identity, type system and product design built for the audience that already trades this way — fast, visual, unembarrassed about second-hand.",
      },
      {
        title: "The launch system",
        body: "Social content, video and launch assets produced alongside the build, so the product and the campaign ship as one thing.",
      },
    ],
    found:
      "Trust is the product. Every design decision routed back to whether a stranger would send money for a stranger’s jacket.",
    stats: [
      { value: "23", label: "Prompts to first build", accent: true },
      { value: "19", label: "Sections in the knowledge base" },
      { value: "4", label: "Disciplines in one contract" },
      { value: "[Launch metrics pending]", label: "Signups, listings, GMV", pending: true },
    ],
    next: "zoller",
    verified: "2026-07-01",
    gallery: [
      {
        src: "/work/ehsaan/launch.webp",
        alt: "The ehsaan launch card \u2014 the wordmark in a light serif on deep navy, over \u201cPakistan\u2019s first thrift marketplace\u201d and the line \u201cYour wardrobe is worth more than you think.\u201d",
        width: 1080,
        height: 1080,
        caption: "Launch card",
      },
      {
        src: "/work/ehsaan/origin.webp",
        alt: "An origin-and-meaning card defining ehsaan: to do something beautifully, to give generously, to act with grace.",
        width: 1080,
        height: 1080,
        caption: "Where the name comes from",
      },
      {
        src: "/work/ehsaan/split.webp",
        alt: "A card split cream against navy \u2014 \u201cFind your next obsession\u201d for buyers on one side, \u201cTurn your closet into cash\u201d for sellers on the other.",
        width: 1080,
        height: 1080,
        caption: "Two-sided marketplace, said in one frame",
      },
    ],
  },
  {
    slug: "gallery",
    client: "The Gallery",
    category: "performance",
    span: "wide",
    tags: ["Performance media", "5.2–6× ROAS"],
    result: "Ten creatives. One inbox.",
    bg: "linear-gradient(200deg,var(--siren-500) 0 38%,var(--tar-2) 38%)",
    hero: ["5.2–6× ROAS.", "Every campaign."],
    sub: "A DM-first campaign for a personalised newborn brand.",
    meta: [
      ["Client", "The Gallery · @thegallery.bytg"],
      ["Discipline", "Performance media"],
      ["Timeline", "2026"],
      ["Outcome", "5.2–6× ROAS, every campaign"],
    ],
    challengeTitle: ["A market that", "never checks out", "on a website."],
    challenge: [
      "Personalised newborn gifts sell through conversation — sizing, spelling, dates, photos. The checkout was already the DM, so a campaign built to push traffic at a product page would have been measuring the wrong thing.",
    ],
    phases: [
      {
        title: "Ten creatives, one job",
        body: "A tight creative set built to start a conversation rather than close a cart.",
      },
      {
        title: "DM-native buying",
        body: "Campaigns optimised toward the inbox, with the sale tracked where it actually happens.",
      },
      {
        title: "Weekly iteration",
        body: "The losers get cut, the winners get rebuilt. The number is reported every week against what was agreed.",
      },
    ],
    found:
      "Every campaign returned between 5.2 and 6 times its spend — not an average across a good quarter, every campaign.",
    stats: [
      { value: "5.2–6×", label: "ROAS on every campaign", accent: true },
      { value: "10", label: "Creatives in the campaign" },
      { value: "DM", label: "Where the sale closes" },
      { value: "[Spend pending]", label: "Publishing spend alongside return", pending: true },
    ],
    next: "noted",
    verified: "2026-07-01",
  },
  {
    slug: "seyr",
    client: "Seyr",
    category: "web",
    span: "half",
    tags: ["Web build", "Live"],
    result: "Built to convert, not to win awards",
    craft: true,
    bg: "linear-gradient(140deg,var(--newsprint) 0 40%,var(--tar-3) 40%)",
    hero: ["Built to convert,", "not to win awards."],
    sub: "An ecommerce storefront you can open in a new tab right now.",
    meta: [
      ["Client", "Seyr · @shop.seyr"],
      ["Discipline", "Web build"],
      ["Timeline", "Live"],
      ["Scope", "Ecommerce storefront"],
    ],
    challengeTitle: ["Proof you can", "click, not read", "about."],
    challenge: [
      "Every agency site describes work you cannot inspect. This is the one place a visitor can open the finished thing in a new tab and judge it themselves.",
    ],
    phases: [
      {
        title: "Conversion-built",
        body: "Structure, product presentation and checkout flow designed around the purchase, not the portfolio shot.",
      },
      {
        title: "Handover",
        body: "Client-run from day one, with the build documented.",
      },
    ],
    found: "",
    stats: [
      { value: "Live", label: "seyr.shop", accent: true },
      { value: "[Conversion pending]", label: "Before / after not yet measured", pending: true },
    ],
    next: "social",
    verified: "2026-07-01",
    externalUrl: "https://seyr.shop",
  },
  {
    slug: "social",
    client: "Multi-brand social",
    category: "performance",
    span: "half",
    tags: ["Strategy", "Production"],
    result: "Four accounts, run direct",
    craft: true,
    bg: "linear-gradient(140deg,var(--tar-4),var(--tar-2) 60%)",
    hero: ["2.2M views.", "811 followers."],
    sub: "Strategy, production and client communication, run directly.",
    meta: [
      ["Clients", "BamBam · Poster Project · The Gallery · Better With A Cup Of Coffee"],
      ["Discipline", "Social strategy · Production"],
      ["Timeline", "Ongoing"],
      ["Outcome", "2.2M views in 90 days"],
    ],
    challengeTitle: ["Reach without", "an audience", "to start from."],
    challenge: [
      "Four brands, small follower counts, and a category where reach is normally bought. The work was to make content that travels on its own and only pay where paying is efficient.",
    ],
    phases: [
      {
        title: "One operator, four accounts",
        body: "Strategy, production and client communication run directly — no coordination layer.",
      },
      {
        title: "Organic first, paid where it pays",
        body: "80% of the Poster Project’s 2.2M views were organic; BamBam’s paid traffic ran at $0.25 per landing page view.",
      },
    ],
    found:
      "Reach beats followers. The Poster Project reached 199,392 accounts in 90 days — up 174.5% — from an 811-follower base.",
    stats: [
      { value: "2.2M", label: "Views in 90 days, 80% organic", accent: true },
      { value: "199,392", label: "Accounts reached, up 174.5%" },
      { value: "80K", label: "Accounts reached in 30 days" },
      { value: "$0.25", label: "Per landing page view — BamBam" },
    ],
    next: "zoller",
    verified: "2026-07-01",
    gallery: [
      {
        src: "/work/social/bambam.webp",
        alt: "A BamBam campaign frame \u2014 the shop\u2019s stairwell shot at night, with \u201cbuilt for the night.\u201d set beneath the wordmark.",
        width: 1080,
        height: 1350,
        caption: "BamBam \u2014 After Dark",
      },
    ],
  },
  {
    /* Craft case. Every fact below is read off the delivered artefacts themselves —
       the brand reference sheet, the flyer set and the B2B site design. No result is
       claimed, because none has been measured or approved; the stats are pending.

       Three of the eleven delivered pieces are on the site. The business cards and
       the sales kit are not: they are staff names, mobile numbers and personal email
       addresses end to end, and there is nothing left of them once redacted. The
       three that are here are cropped above their contact bands for the same reason. */
    slug: "gee",
    client: "GEE Linens",
    category: "web",
    span: "half",
    tags: ["Brand system", "Collateral"],
    result: "One sheet every asset is built against",
    craft: true,
    bg: "linear-gradient(140deg,#12305B 0 55%,var(--tar-3) 55%)",
    hero: ["We make the linen,", "not just supply it."],
    sub: "Four divisions buying nothing alike, held together by one sheet.",
    meta: [
      ["Client", "GEE Linens Manufacturing Corp."],
      ["Discipline", "Brand system · Collateral"],
      ["Timeline", "V1.0, 2025"],
      ["Scope", "Identity, flyer set, sales kit, B2B site"],
    ],
    challengeTitle: ["Four divisions.", "One factory.", "One sheet."],
    challenge: [
      "GEE sells bed, bath and table linen out of its own Carmona facility to four rooms that buy nothing like each other — hotels and resorts, medical and hospital, F&B and banquet, and a retail line under Cotton Countree. Four audiences is usually where an identity comes apart: each division commissions its own flyer, and within a year the company looks like four companies.",
      "So the deliverable is not a logo. It is a reference sheet that every downstream asset is built against, with the rule stated on it in plain language: no token here may be substituted.",
    ],
    phases: [
      {
        title: "The reference sheet",
        body: "Logo lockups, clear space and minimum sizes, the colour system, the type scale, and a misuse page that names the six ways the mark gets broken. Gold is specified as a hairline and an eyebrow, never a fill — the moment gold becomes a block, the brand reads budget.",
      },
      {
        title: "The collateral set",
        body: "A master flyer plus one per division, each built from the same grid and type scale so a hotel buyer and a hospital buyer are looking at the same company.",
      },
      {
        title: "The B2B site",
        body: "A specification-first storefront: what they make, who they supply, and an enquiry form — designed around a buyer who needs a quote, not a mood.",
      },
    ],
    found:
      "The sheet settles the voice as firmly as the colour. Retail sells the feeling; GEE sells the specification — thread count, blend, dimensions, facility — and the guidelines carry a write-this-not-that page so the rule survives the next person to write a caption.",
    stats: [
      { value: "4", label: "Divisions on one identity" },
      { value: "11", label: "Pieces in the delivered set" },
      { value: "[Enquiry lift pending]", label: "B2B site not yet measured", pending: true },
      { value: "[Adoption pending]", label: "Rollout across divisions in progress", pending: true },
    ],
    next: "lafo40",
    verified: "2026-07-28",
    gallery: [
      {
        src: "/work/gee/identity.webp",
        alt: "The GEE Linens brand reference sheet: logo lockups on light, dark and navy, clear-space and minimum-size diagrams, and the navy, blue and gold colour system with print values.",
        width: 1400,
        height: 2125,
        caption: "The reference sheet \u2014 lockups, clear space, colour",
      },
      {
        src: "/work/gee/flyer.webp",
        alt: "The GEE Linens master flyer: the line \u201cWe make the linen, not just supply it\u201d over a product grid of bed linen, towels, pillows, duvets and banquet cloths.",
        width: 1100,
        height: 1299,
        caption: "Master flyer \u2014 the range on one page",
      },
      {
        src: "/work/gee/website.webp",
        alt: "The GEE Linens B2B site design: a navy hero repeating the manufacturer line, above a band reading 200+ accounts, four divisions, since 2022, nationwide delivery.",
        width: 1400,
        height: 1462,
        caption: "B2B site \u2014 specification before mood",
      },
    ],
  },
  {
    /* ForjWell-era work, and named as such in the meta rather than implied to be
       Drifted's — see FORJWELL_CREDIT at the foot of this file, which already lists
       LAFO40 among the work led there.

       One asset only. The identity system was delivered as a PDF whose artwork does
       not survive export — every page past the cover renders empty — and the handoff
       archive turned out to hold scripts rather than artwork. The cover is real, so
       it ships; the rest of the frames stay placeholders until the source files turn
       up. Its "confidential — internal & partner use" footer is cropped off. */
    slug: "lafo40",
    client: "LAFO40",
    category: "creators",
    span: "half",
    tags: ["Brand identity", "ForjWell"],
    result: "You\u2019re still going. That\u2019s the flex",
    craft: true,
    bg: "linear-gradient(140deg,#0A0A0A 0 60%,#FF4500 60%)",
    hero: ["You\u2019re still going.", "That\u2019s the flex."],
    sub: "A premium streetwear identity for lifting after forty \u2014 earned, not given.",
    meta: [
      ["Client", "LAFO40 \u00b7 Love & Fitness Over 40"],
      ["Discipline", "Brand identity"],
      ["Timeline", "V1.0, 2026"],
      ["Credit", "Led while Creative Strategist at ForjWell"],
    ],
    challengeTitle: ["Forty isn\u2019t", "the wind-down.", "It\u2019s the warm-up."],
    challenge: [
      "Fitness brands aimed at people over forty almost all default to the same register \u2014 wellness, journeys, gentle encouragement. It is a register that tells the buyer they are managing a decline.",
      "LAFO40 sells streetwear to people who are still lifting, so the identity had to sound like the gym and not like a clinic. The voice rule is written into the guidelines as a straight swap: we say \u201cGet up. It\u2019s gym time.\u201d We do not say \u201cBegin your wellness journey.\u201d",
    ],
    phases: [
      {
        title: "The marks",
        body: "A primary wordmark that splits LAFO in cream from 40 in signal orange, a stacked secondary lockup, and two icon marks \u2014 the 40 pill and the LF monogram \u2014 for the sizes where the wordmark stops working.",
      },
      {
        title: "The system",
        body: "Barlow Condensed ExtraBold for display against DM Sans for body, on jet black, signal orange, cream, army olive and gold. Body copy stays plain and direct: no jargon, no journeys.",
      },
      {
        title: "The print program",
        body: "Nine graphics across the range in approved colourways, from box-logo pieces to a heritage athletic variant.",
      },
    ],
    found: "",
    stats: [
      { value: "9", label: "Graphics in the print program" },
      { value: "6", label: "Colours in the system" },
      { value: "[Sell-through pending]", label: "Range performance not published", pending: true },
    ],
    next: "gee",
    verified: "2026-07-28",
    gallery: [
      {
        src: "/work/lafo40/identity.webp",
        alt: "The LAFO40 brand identity cover: the wordmark set with LAFO in cream and 40 in signal orange on black, above \u201cLove & Fitness Over 40\u201d and the line \u201cYou\u2019re still going. That\u2019s the flex.\u201d",
        width: 1100,
        height: 1447,
        caption: "Brand identity system, Vol. 01",
      },
    ],
  },
];

/* The prose quotes the number of cases in several places. Deriving it means adding a
   case can never leave a page claiming there are six. */
export const CASE_COUNT = CASES.length;
export const CASE_COUNT_WORD =
  ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][
    CASES.length
  ] ?? String(CASES.length);

export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);

export const FILTERS: Array<{ key: "all" | CaseCategory; label: string }> = [
  { key: "all", label: "All work" },
  { key: "performance", label: "Performance media" },
  { key: "creators", label: "Creator growth" },
  { key: "product", label: "AI product" },
  { key: "web", label: "Web & brand" },
];

/* Where a discipline sends a reader who wants the service rather than the story.
   `web` has no service page of its own — the three service pages are performance,
   creators and AI product — so it deliberately maps to nothing rather than to a
   near-miss. */
export const SERVICE_FOR: Partial<Record<CaseCategory, { href: string; label: string }>> = {
  performance: { href: "/services/performance", label: "Performance media" },
  creators: { href: "/services/creators", label: "Creator growth" },
  product: { href: "/services/ai-product", label: "AI product" },
};

export const countFor = (key: "all" | CaseCategory) =>
  key === "all" ? CASES.length : CASES.filter((c) => c.category === key).length;

/* The eight names in the home client strip. */
export const CLIENTS = [
  "Frank Zoller",
  "The Gallery",
  "Noted.",
  "Ehsaan",
  "Seyr",
  "BamBam",
  "Poster Project",
  "Better With A Cup Of Coffee",
];

/* Marquee band — every 4th span renders outline-only via CSS nth-child(4n+1). */
export const MARQUEE = [
  "Ehsaan",
  "Frank Zoller Authentic History",
  "Noted.",
  "Seyr",
  "The Gallery",
  "BamBam NYC",
  "The Poster Project",
];

/* Earlier work, credited accurately — led while Creative Strategist at ForjWell. */
export const FORJWELL_CREDIT =
  "Earlier work led while Creative Strategist at ForjWell: BamBamNYC, Better With A Cup Of Coffee, Mystify.eer, LAFO40, Lipanda Foundation, Feature8, The Leaf.";
