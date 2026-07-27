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
  /** Slug of the next case in the reading order. */
  next: string;
  /** Only Seyr is publicly inspectable. */
  externalUrl?: string;
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
  },
];

export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);

export const FILTERS: Array<{ key: "all" | CaseCategory; label: string }> = [
  { key: "all", label: "All work" },
  { key: "performance", label: "Performance media" },
  { key: "creators", label: "Creator growth" },
  { key: "product", label: "AI product" },
  { key: "web", label: "Web & brand" },
];

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
