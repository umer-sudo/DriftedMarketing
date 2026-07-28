# Drifted Marketing

The Drifted Marketing website — Next.js 15 (App Router), TypeScript, no CSS framework.

```bash
npm install
cp .env.example .env.local   # everything in it is optional
npm run dev                  # http://localhost:3000
npm run build
npm run typecheck
```

CI runs typecheck, build and a high-severity audit on every PR
(`.github/workflows/ci.yml`).

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
| 1 | Case-study imagery | **Open.** Placeholders throughout. `ImageSlot` renders a labelled frame; pass `src` when assets land. |
| 2 | Open Graph image | **Done** — generated from brand tokens at `/opengraph-image`. |
| 3 | Instagram handle | **Unconfirmed.** `lib/config.ts` carries a guessed handle, wired to live DM buttons. Verify, then set `confirmed: true` so it also appears in the Organization schema. |
| 4 | Phone number | **Unconfirmed.** The CTA-band phone icon is decorative; set `phone.number` to wire a `tel:` link. |
| 5 | Contact form | **Done.** See below. |
| 6 | Analytics | **Done** — cookie-free, env-gated. See below. |
| 7 | Zoller countdown date | **Config value** in `lib/config.ts`. Still needs verifying with the client. |
| 8 | Sitemap / robots / structured data | **Done** — `app/sitemap.ts`, `app/robots.ts`, and JSON-LD via `lib/structured-data.ts`. |
| 9 | Collage asset licensing | **Open, client-side.** The five collage objects are the founder's uploaded references; confirm rights or commission a replacement set. Unused by the site today. |
| 10 | Display font licence | **Open, client-side.** Running on Google Fonts. |
| 11 | Production origin | Set `NEXT_PUBLIC_SITE_URL` before launch — it feeds canonicals, sitemap and OG. |

## Contact form

`app/contact/actions.ts` runs five checks, cheapest first: honeypot, per-IP rate
limit (5 per 10 minutes), Turnstile when configured, validation, then delivery.

Two transports, either or both, set by environment variable:

- **Email** — `RESEND_API_KEY` + `CONTACT_TO_EMAIL`
- **Webhook** — `CONTACT_FORM_ENDPOINT` (+ optional `CONTACT_FORM_TOKEN`)

Email is tried first; the webhook is the fallback. **With neither set the form does
not pretend to send** — it reports that delivery isn't configured and points at the
email address, rather than routing to the thank-you page on a lie.

Spam protection is Cloudflare Turnstile (cookie-free, unlike reCAPTCHA), enabled by
setting `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. Without it the
honeypot and rate limit still apply.

> **Rate-limit caveat.** `lib/rate-limit.ts` is in-process memory. On a single
> self-hosted server it works as written; on serverless each instance keeps its own
> counter, so a distributed attacker gets roughly `limit × instances`. For a real
> ceiling, back it with Upstash/Vercel KV/Postgres — the call site doesn't change.

## Analytics

Cookie-free by requirement of the brief, so no consent banner. Supports Plausible
(`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) or Umami (`NEXT_PUBLIC_UMAMI_WEBSITE_ID`), both
self-hostable. Renders nothing until one is set; loaded `afterInteractive` so it
never blocks first paint.

## Structured data

`lib/structured-data.ts` emits Organization and WebSite site-wide, plus
BreadcrumbList, Service, FAQPage and CreativeWork per route. Deliberately
conservative: no ratings, no review markup, no unpublished numbers — the brief's
anti-fabrication rule applies to crawlers too. `sameAs` only lists social profiles
marked `confirmed` in config, which is why Instagram is currently omitted.
