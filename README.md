# Drifted Marketing

The Drifted Marketing website — Next.js 15 (App Router), TypeScript, no CSS framework.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

## Routes

Ten routes, all statically generated.

| Route | Page |
| --- | --- |
| `/` | Home |
| `/work` | Work index, filterable |
| `/work/[slug]` | Case study — six cases, prerendered |
| `/services/performance` | Performance media |
| `/services/creators` | Creator growth |
| `/services/ai-product` | AI product |
| `/about` | Studio |
| `/contact` | The brief form |
| `/contact/thanks` | Post-submit confirmation |
| `not-found` | 404 |

## Layout

```
app/
  layout.tsx            root chrome: nav, footer, behaviour layer
  globals.css           imports the token layer, then the component layer
  styles/tokens/*.css   design-system tokens, shipped as-is
  styles/components.css component layer, ported from the prototype
  fonts.ts              self-hosted Schibsted Grotesk / Instrument Sans / JetBrains Mono
  opengraph-image.tsx   generated 1200×630 OG card
  sitemap.ts robots.ts
components/             Nav, Footer, CtaBand, WorkGrid, Chrome (motion), …
content/cases.ts        the six case studies, typed
lib/config.ts           site config, unconfirmed endpoints, launch date
```

`components/Chrome.tsx` carries the global motion the way the prototype's `site.js` did
— delegated listeners rather than a component per effect. Pages stay server-rendered;
motion is progressive enhancement. Markup ships settled and `data-motion="on"` is only
added once the client mounts, so nothing is ever invisible without JS.

## Design source

The approved handoff lives in **[`.claude/skills/drifted-design/`](.claude/skills/drifted-design/)**
and is also installed as a Claude Code skill (`/drifted-design`) — copy that folder into
any other project's `.claude/skills/` to make the brand available there.

| File | Read it for |
| --- | --- |
| [`README.md`](.claude/skills/drifted-design/README.md) | The website handoff: token values, the route map, every screen, motion, content rules, known gaps. |
| [`DESIGN-SYSTEM.md`](.claude/skills/drifted-design/DESIGN-SYSTEM.md) | Brand-level system: colour, type, layout, texture, iconography. |
| [`BRIEF.md`](.claude/skills/drifted-design/BRIEF.md) | Voice, positioning, proof set. §11–12 are hard constraints. |
| `reference/*.html` | Approved specimens: foundations, component library, motion spec, mark spec. |
| `Drifted Website.html` | The original hash-routed prototype. Reference only. |

Tokens in `app/styles/tokens/` are copied from the bundle unchanged, with one exception:
`fonts.css` no longer `@import`s the Google Fonts CDN, because the fonts are self-hosted
through `next/font` as the handoff asks.

## Content rules

`content/cases.ts` is the single source of case data. **Never add a figure that has not
been published or client-approved.** Unmeasured results carry `pending: true` and render
muted — that flag is a hard constraint from the brief, not a style choice. These numbers
appeared in early drafts and are permanently unusable: $7M+ revenue driven, 40+ apps
shipped, 8+ years, 300% ROI, eleven clients.

## Outstanding before launch

Carried from the handoff's gap list, plus what surfaced during the build.

| # | Item | State |
| --- | --- | --- |
| 1 | Case-study imagery | Placeholders throughout. `ImageSlot` renders a labelled frame; pass `src` when assets land. |
| 2 | Open Graph image | **Done** — generated from brand tokens at `/opengraph-image`. |
| 3 | Instagram handle | **Unconfirmed.** `lib/config.ts` carries a guessed handle. Verify or remove the DM buttons. |
| 4 | Phone number | **Unconfirmed.** The CTA-band phone icon is decorative; set `phone.number` to wire a `tel:` link. |
| 5 | Contact form endpoint | **Not wired.** Set `CONTACT_FORM_ENDPOINT` and add real spam protection — the honeypot alone is not enough. Until then the form says so rather than pretending to send. |
| 6 | Analytics | Not added. The brief calls for cookie-free analytics. |
| 7 | Zoller countdown date | Config value in `lib/config.ts`. Verify 16 Aug 2026 with the client. |
| 8 | Sitemap / robots | **Done** — `app/sitemap.ts`, `app/robots.ts`. Structured data still outstanding. |
| 9 | Collage asset licensing | Unresolved. The five collage objects are the founder's uploaded references; confirm rights or commission a replacement set. |
| 10 | Display font licence | None held. Running on Google Fonts; the handoff notes Helvetica Now Display / Neue Haas Grotesk Display as the intended face. |
| 11 | Production origin | `NEXT_PUBLIC_SITE_URL` defaults to `https://driftedmarketing.com`. Set it for real before launch — it feeds canonicals, sitemap and OG. |
