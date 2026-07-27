# Handoff: Drifted Marketing — Website

## Overview

The complete public marketing site for **Drifted Marketing**, a boutique full-stack creative agency founded 2026 in Karachi. Ten routes covering the homepage, work index, a case-study template, three service pages, about, contact, a post-submit thank-you, and a 404.

The site's job is conversion to a single action: **book the 30-minute call**. Everything else — the work grid, the process strip, the ticker, the availability banner — exists to make that one CTA feel inevitable. The brand's core argument, repeated everywhere: *Every agency says growth. We say the number.*

---

## About the design files

**The files in this bundle are design references created in HTML.** They are prototypes that show intended look, motion and behaviour — they are **not production code to copy directly**.

`Drifted Website.html` + `site.js` are a single-file, hash-routed prototype: all ten routes live in the same document as `<main class="page" id="…">` blocks, and `site.js` toggles which one is visible. That structure exists so the whole site can be reviewed by scrolling and clicking in one browser tab. **Do not ship it that way.**

Your task is to **recreate these designs in the target codebase's environment** using its established patterns. If there is no codebase yet, Next.js (App Router) is the natural fit for this site: real routes, per-page metadata, static generation, and image optimisation for the case-study imagery. Each `<main class="page" id="x">` becomes a real route:

| Prototype block | Real route |
|---|---|
| `#home` | `/` |
| `#work` | `/work` |
| `#case` | `/work/[slug]` |
| `#perf` | `/services/performance` |
| `#creators` | `/services/creators` |
| `#ai` | `/services/ai-product` |
| `#about` | `/about` |
| `#contact` | `/contact` |
| `#thanks` | `/contact/thanks` |
| `#notfound` | `not-found.tsx` |

The CSS in `tokens/` **is** production-ready and should be adopted as-is — it is the compiled design-system token layer, not prototype scaffolding.

---

## Fidelity

**High-fidelity.** Colours, typography, spacing, motion curves and copy are all final and locked. Recreate pixel-perfectly. Every value in this document is deliberate — in particular, do not round radii up (the brand uses 0–4px on purpose), do not soften the tracking, and do not substitute the fonts.

Two things are **not** final and are marked clearly below: case-study imagery (placeholders) and two contact endpoints (Instagram handle, phone number).

---

## Design tokens

Ship `styles.css` and the seven files in `tokens/`. `styles.css` is nothing but `@import` lines; everything real is in the token files. In a Tailwind project, map these to theme values rather than re-declaring them.

### Colour

Base:

| Token | Hex | Use |
|---|---|---|
| `--tar` | `#0A0A0B` | page background |
| `--tar-2` | `#101013` | raised surface |
| `--tar-3` | `#17171B` | card surface |
| `--tar-4` | `#212127` | hover surface |
| `--ink-500` → `--ink-100` | `#2C2C34` `#464650` `#7C7C86` `#B2B2BB` `#D6D6DC` | greys, dark → light |
| `--newsprint` | `#F2F0EA` | paper / primary text on dark |

Three accents, each a full 50–900 ramp. **Voltage is the hero** and appears on every page. **Siren is support**, used sparingly. **Klein is rare** — one moment per page maximum, and never on text.

| Ramp | 50 | 100 | 200 | 300 | 400 | **500** | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| Voltage | `#F7FFE3` | `#ECFFB5` | `#DEFF7E` | `#CFFB4A` | `#C2F125` | **`#AFE304`** | `#93BF00` | `#6F8F06` | `#4B600A` | `#29350B` |
| Siren | `#FFF1EC` | `#FFD9CF` | `#FFB39F` | `#FF8663` | `#FF5A2E` | **`#F5330A`** | `#CC2606` | `#9C1C05` | `#6B1304` | `#3A0A03` |
| Klein | `#EFEEFF` | `#D6D3FF` | `#AFA9FF` | `#8279FF` | `#5546FF` | **`#2417F0`** | `#1B0FC4` | `#150B93` | `#0E0762` | `#080436` |

Semantic: `--success-500: #2BE08A` · `--warning-500: #FFB020` · `--danger-500` aliases Siren 500.

Contrast against `--tar`: Voltage 500 **13.0:1** (AAA, safe for body text and UI). Newsprint **17.4:1**. Siren 500 **5.1:1** (AA at ≥18px only — never small text). Klein 500 **2.3:1** (graphic only, never text).

**Light sections** use the `.drift-paper` scope, which re-points the semantic variables to a Newsprint surface. Apply the class to a section wrapper; don't hand-write light-mode colours.

### Typography

Two families, both from Google Fonts:

- **Display + UI: Schibsted Grotesk**, weight 900 for every display element. Variable, wght 400–900.
- **Mono: JetBrains Mono**, weights 400/500/700 — eyebrows, labels, metadata, buttons.

There is no third face. Body copy is Schibsted Grotesk 400.

Scale (`--fs-*`): mega `clamp(4rem, 13vw, 12rem)` · display-1 `clamp(3rem, 8.5vw, 8rem)` · display-2 `clamp(2.5rem, 6vw, 5.5rem)` · display-3 `clamp(2rem, 4vw, 3.5rem)` · h1 48px · h2 36px · h3 24px · h4 19px · lg 20px · md 17px · sm 15px · xs 13px · 2xs 11px.

Line-height: display 0.82–0.88 · body 1.55 · loose 1.65.

Tracking: mega `-0.05em` · display `-0.045em` · heading `-0.03em` · body `-0.005em` · **mono labels `+0.18em`, always uppercase**.

**The system's defining rule: extreme size contrast, no mid-tier.** Display sits 8–14× body size. There is deliberately nothing between a 96px headline and 17px body — no 32px sub-heading softening the jump. That gap is the system. If a layout feels like it needs an intermediate size, it needs a mono label instead.

### Spacing, radii, layout

4px base scale: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 176, 240.

Layout: `--page-pad-x: clamp(20px, 5vw, 80px)` · `--section-y: clamp(80px, 12vw, 200px)` · `--max-w-content: 1440px` · `--max-w-prose: 62ch` · 12-column grid.

**Radii are near-square by policy** — large radii read cheap in this brand. `--radius-1: 2px` (controls) · `--radius-2: 4px` (cards) · `--radius-3: 8px` (maximum, rare) · `--radius-pill: 999px` (exists but essentially unused).

### Effects

The brand is flat. Shadows are rare; **hard offsets and grain do the work**.

- `--shadow-hard: 6px 6px 0 var(--voltage-500)` and `--shadow-hard-siren: 6px 6px 0 var(--siren-500)` — the brand's real "shadow": a solid offset plate, no blur.
- `--shadow-2: 0 8px 24px rgba(0,0,0,.6)` and `--shadow-3: 0 24px 60px rgba(0,0,0,.75)` for genuine elevation only.
- `--glow-voltage: 0 0 0 1px var(--voltage-500), 0 0 32px -8px rgba(175,227,4,.7)`.
- `--grain` is an inline SVG fractal-noise data URI, applied at `--grain-opacity: 0.08` with `mix-blend-mode: overlay` over colour fields. It should sit on a pseudo-element with `pointer-events: none`.
- `--diagonal-split: linear-gradient(107deg, var(--voltage-500) 0 42%, var(--tar) 42%)` — the die-cut field.

**Misregistration** is the identity's core device: `--misreg-x: -9px` · `--misreg-y: -8px` · `--misreg-rotate: -3.5deg` · `--misreg-tint: 0.34`. It belongs to **the logo mark only**. An earlier build applied it as a ghost-plate to display headings; that was removed because on multi-line headlines it read as a printing error rather than a device. Do not reintroduce it on type.

### Motion

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 90ms | state flips, colour |
| `--dur-fast` | 160ms | hover, press |
| `--dur-base` | 280ms | wipes, panel swaps, route changes |
| `--dur-slow` | 520ms | entrances, image scale |
| `--dur-mark` | 1150ms | logo resolve |
| `--dur-marquee` | 22s | marquee cycle |
| `--ease-hit` | `cubic-bezier(0.2, 0.9, 0.1, 1)` | default — arrives fast, stops dead |
| `--ease-cut` | `cubic-bezier(0.85, 0, 0.15, 1)` | wipes, hard cuts |
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | long entrances |

**Never bounce, spring, elastic, or exceed 520ms** outside the logo resolve and marquees. Hover lifts `-2px`; press scales to `0.97`.

`prefers-reduced-motion: reduce` collapses `--dur-fast/base/slow/mark` to 1ms and must additionally stop: marquees, the ticker, the orbit ring, the hero orb parallax, the CTA pulse, and the scramble effect. Entrance-animated elements must render in their settled state, never invisible.

---

## Screens

Every page shares the same chrome: fixed nav, footer, and the fixed UI described under "Global chrome".

### Home (`/`)

Purpose: state the positioning, prove it with numbers, move to the call.

Sections in order:

1. **Hero** — mega headline "Look bigger than you are" with `.fill` (Voltage plate behind cap-height text) and `.ol` (1.5–2px Newsprint outline) treatments on individual words. Kicker line above in mono, three disciplines numbered 01/02/03. Below the fold-line: positioning paragraph (max 44ch), a three-stat row, and the primary CTA. Decorative: a Voltage orb with a rotating dashed ring (`.orbring`, 26s linear), and a 34vw watermark of `assets/logo.svg` at 6% opacity rotated −8° behind everything, `pointer-events: none`.
2. **Marquee band** — full-bleed Voltage strip, Tar text, 22s linear loop, `animation-play-state: paused` on hover. Every 4th word is outline-only (`-webkit-text-stroke: 1px currentColor`, transparent fill).
3. **Client strip** — "On the books" eyebrow above a flex-wrapped row of eight client names in mono 13px/700, `+0.2em` tracking, uppercase, `--ink-300`, going Voltage on hover. Names: Frank Zoller, The Gallery, Noted., Ehsaan, Seyr, BamBam, Poster Project, Better With A Cup Of Coffee.
4. **Work preview** — first four cases in the same grid as `/work`.
5. **Services** — three cards, each with a Lucide icon (`bar-chart-3`, `users`, `cpu`) at 26px in Voltage, and each closing on its own proof line: "5.2–6× ROAS — The Gallery", "3K followers / month — Noted.", "400+ hours saved — Zoller".
6. **Process** — "Three steps. No theatre." Three-column grid, 1px gaps showing `--border-subtle` through, `--tar-2` cells. Icons `phone-call` / `crosshair` / `receipt`, mono step numbers top-right. Copy: The call (30 minutes, bring the number and the date, no deck) → The number (yes or no on the call; yes comes with a scope and a figure reported weekly) → The receipts (published numbers or pending flags, never estimates).
7. **Shipping ticker** — `--tar-2` bar bounded by hairlines, mono 11px, 34s loop, pausable on hover. Contains a **live countdown to the Zoller platform launch (16 Aug 2026, Asia/Karachi)** recomputed every 60s, plus Ehsaan in production, Noted. launching, The Gallery's ROAS, and Q4 slots.
8. **CTA band** — full-bleed Voltage. See "The CTA band" below.

### Work (`/work`)

Purpose: the receipts index.

Headline "Receipts." over a filter row (All / Performance / Creators / Product) and a masonry-ish grid where `.wide` cases span two columns. Filters use `data-f`; each button shows its count as a Voltage superscript via `data-n` and a CSS `:after`. **Filtering re-deals the visible tiles** with a 360ms `tilein` animation staggered 45ms per card — not a plain show/hide.

Each tile: image frame (currently an `<image-slot>` placeholder), a `.veil` scrim, a large ghosted index numeral (`.tno`, mono 700 64px at 13% opacity, top-right), client name in display, category tags, and the result line. Result lines are prefixed with a Voltage `↗` via `.res:before`. Tags invert to Voltage-on-Tar on hover. On hover the image tilts in 3D (`rotateX ±5deg`, `rotateY ±6deg`, 900px perspective) and a diagonal `.glare` sweeps across it.

Cards are keyboard-focusable (`tabindex="0"`, `role="link"`) and open on Enter or Space.

### Case study (`/work/[slug]`)

Six real cases exist in the `CASES` array in `site.js` — Frank Zoller Authentic History, The Gallery, Noted., Ehsaan, Seyr, BamBam. Template order: full-bleed hero image with the client name overlaid → the problem → what we did → the numbers (a stat grid) → what's next → next-case link.

**Every number on these pages is either published or explicitly flagged pending.** See "Content rules" — this is a hard constraint, not a style preference.

### Service pages (`/services/*`)

Three siblings, identical in structure and choreography, distinguished by exactly one variable: surface treatment. Performance is dark with Voltage plates; Creators uses the `.drift-paper` light scope; AI product is dark with Klein as its single rare accent moment.

Shared structure: numbered eyebrow (01/02/03) → display headline → the problem → the method → proof from a real client → what it costs to be wrong → CTA band.

### About (`/about`)

The name means departure. Origin story: the team came out of agencies where a strategy team, a creative team and a media team were separated by an account layer, and left on purpose. Founded 2026 in Karachi. Three clients, six disciplines, deliberately small — small is the product, not a stage being grown out of.

### Contact (`/contact`)

Form fields: name, email, company, the number you need to hit, the date, budget band, and how you found us. **The number and date fields are the point of the page** — they are required and the copy says why. Submitting routes to `/contact/thanks`.

### Thanks (`/contact/thanks`)

Confirmation with the actual next step and a response-time commitment. No celebration language, no exclamation marks.

### 404 (`not-found`)

"This one drifted too far." The headline's colour plates track the cursor via `text-shadow` so the type can **never** re-register — the one place on the site where misregistration is applied to type, and it is intentional and interactive. Disabled under reduced-motion.

---

## Global chrome

### Nav

Fixed, hairline bottom border. Logo left, route links centre, contact CTA right.

- **Hides on scroll down past 220px, returns immediately on scroll up** (`transform: translateY(-100%)`, 280ms `--ease-cut`).
- Active route renders in Voltage.
- Link hover expands tracking to `0.22em` and lifts colour to Newsprint.
- A live **Karachi clock** (`KHI HH:MM`, `Intl.DateTimeFormat` with `timeZone: 'Asia/Karachi'`, updated every 30s) sits before the CTA.
- The CTA pulses a Voltage ring every 6s (`--ctapulse`), and after 45s on the page begins alternating its label with "Q4: 2 slots ↗" every 8s, suppressed while hovered.

### The CTA band

Full-bleed Voltage plate, Tar text, grain at 18% multiply. Mega headline, supporting line, primary dark button + "DM us instead" secondary. Below: availability line ("Q4 — two slots · next call slot: this week") and a row of Lucide `instagram` / `mail` / `phone` icons.

### Fixed UI

- **Scroll progress bar** — 2px Voltage, top edge, `requestAnimationFrame`-throttled.
- **Back-to-top** — 44px, appears after two viewport heights, uses the escaping-bar mark rotated −27°.
- **Availability banner** — Siren bar pinned to the bottom, rises after 55% scroll depth on home/work/case only. "Q4 — two client slots open" + Book / dismiss. Dismissal persists in `sessionStorage` under `drifted-slots`.
- **Exit-intent popup** — fires on `mouseleave` at `clientY <= 0`, or after 26s, once per session (`sessionStorage: drifted-pop`). A Voltage plate with a 10px Siren hard-shadow, entering with a 360ms skew-settle. Copy: eyebrow "A door, not a gate" / "Still scrolling?" / "That's usually the sign. Bring us the number you need to hit — the call is 30 minutes, there's no deck, and if we can't get you there we'll say so." Two actions: Book the call ↗ / Keep scrolling. Closes on ×, backdrop, Escape, or either button.
- **Skip-to-content link** — hidden until focused, then Voltage at top-left.
- **Screen-reader live region** announcing route changes.
- **Print stylesheet** hides nav, ticker, banner, popup, progress bar and back-to-top.

---

## Interactions & behaviour

### Entrances

Display headings (`h1.disp`, `h2.disp`) enter with a **slam**: from `translateY(46px) skewY(2deg)` to settled, 520ms `--ease-expo`, opacity over 180ms linear, triggered by IntersectionObserver at 0.3 threshold, unobserved after firing.

Mono eyebrows **decode** on entry: characters resolve left-to-right out of the glyph pool `DRIFTX/↗#01` over ~26 animation frames. Spaces are preserved; the original string is restored exactly at the end. Runs once per element (guard with a data attribute), skipped under reduced-motion.

Stat numbers count up, then **flash Voltage** (`nflash`, 420ms) about 950ms after entering.

### Hover

- **Buttons are magnetic** — translate toward the cursor at 0.18× horizontal / 0.3× vertical of the offset from centre, snapping back on leave. Attached lazily on first `mouseover`, and skipped on touch (`hover: none`) and under reduced-motion.
- **Contact CTAs swap copy** on hover to "30 min. No deck. ↗" and restore on leave.
- **Links** draw a Voltage underline via a `background-size` sweep, 160ms.
- Work-card tilt and glare as described above.

### Easter egg

Typing `d-r-i-f-t` anywhere outside a form field applies `body.slip` for 1100ms: every `.disp`, `.btn`, `.shot` and `.tag` shifts `translate(7px, -5px) rotate(-0.7deg)`, with a toast reading "The plates slipped. On purpose." Disabled under reduced-motion. Keep it — it's the identity concept made playable.

### Routing

The prototype uses hash routing with a 280ms cross-fade and per-route `document.title`. In production, use real routes with real metadata. Titles from the prototype:

- `/` — Drifted — Look bigger than you are
- `/work` — Work, not decks — Drifted
- `/work/[slug]` — Case study — Drifted
- `/services/performance` — Performance media — Drifted
- `/services/creators` — Creator growth — Drifted
- `/services/ai-product` — AI product — Drifted
- `/about` — We left on purpose — Drifted
- `/contact` — Tell us the number — Drifted
- `/contact/thanks` — Booked — Drifted
- 404 — This one drifted too far — Drifted

---

## State

Small and mostly ephemeral:

- current route + case slug (URL-derived in production)
- work-grid filter (`all` | `performance` | `creators` | `product`)
- mobile menu open/closed
- popup shown (`sessionStorage: drifted-pop`)
- banner dismissed (`sessionStorage: drifted-slots`)
- contact form values + validation + submit status
- countdown tick (recomputed on a 60s interval, not stored)

The only real data fetch is the contact form submission. `CASES` is content — move it to MDX, a CMS, or a typed content collection.

---

## Content rules — read before writing any copy

These are enforced constraints from the brand brief (`BRIEF.md` §11–12), not preferences.

- **We, not I.** The reader is always "you" and is always the client.
- **Short declaratives, verb-first.** A sentence that can lose a word loses it.
- **Numbers over adjectives.** Every claim carries a figure.
- **Sentence case in body, UPPERCASE in display.** Mono labels uppercase at 0.16–0.2em.
- **No emoji, ever.** No exclamation marks. Banned words: solutions, leverage, journey, unlock, elevate, "excited to", "thrilled to".
- **Never fabricate a metric.** These numbers appeared in earlier drafts and are **permanently unusable**: $7M+ revenue driven, 40+ apps shipped, 8+ years, 300% ROI, eleven clients. If a figure isn't published or client-approved, the page says "pending" — visibly.

Verified numbers safe to use: The Gallery **5.2–6× blended ROAS**; Noted. **~3K followers/month, 115K total, eight products, seven months of revenue**; Frank Zoller **400+ hours saved**. Everything else needs client sign-off first.

---

## Assets

| Asset | Path | Notes |
|---|---|---|
| Primary mark | `assets/logo.svg` | Two-plate misregistered D. Voltage on dark. |
| On-light mark | `assets/logo-on-light.svg` | For `.drift-paper` sections and print. |
| Single-plate mark | `assets/logo-plain.svg` | **Use below 32px** — the offset closes up and reads as a blob. |
| Mono mark | `assets/logo-mono.svg` | Embroidery, etching, single-plate print. |
| Collage textures | `assets/collage/*.{webp,png}` | Five hand-made texture elements, WebP with PNG fallback. Currently unused by the site; available for campaign layouts. |
| Icons | Lucide 0.462.0 via unpkg CDN | 2.25 stroke weight, 18px default. **This is a documented substitution** — the brand has no proprietary icon set. Self-host or tree-shake the React package in production rather than pulling the UMD bundle. |
| Fonts | Google Fonts | Schibsted Grotesk + JetBrains Mono. **Self-host these** — the CDN link is prototype convenience and costs a render-blocking round-trip. |

**Case-study imagery is not final.** Every tile currently renders an `<image-slot>` placeholder (see `image-slot.js`). Real photography, product shots and app screens are needed from the client before launch. The frames, aspect ratios and hover behaviour are all built and correct — only the pixels are missing.

---

## Known gaps

Flagging these explicitly so they aren't discovered late:

1. **Case-study imagery** — placeholders throughout.
2. **Open Graph image** — meta tags are in place; no 1200×630 asset exists yet.
3. **Instagram handle** — the DM buttons currently point at `instagram.com/drifted.marketing`, which is a **guess**. Confirm before launch.
4. **Phone number** — the phone icon in the CTA band is decorative; no `tel:` link is wired.
5. **Contact form endpoint** — no backend. Needs a real handler plus spam protection.
6. **Analytics** — none. The brief calls for cookie-free analytics.
7. **Zoller launch date** — the countdown targets 16 Aug 2026 Asia/Karachi. Verify, and make it a config value rather than a literal.
8. **Sitemap, robots, structured data** — not written.

---

## Files in this bundle

**The design itself**
- `Drifted Website.html` — the full ten-route prototype
- `site.js` — routing, case data, all motion and interaction behaviour
- `image-slot.js` — the image placeholder component
- `styles.css` + `tokens/*.css` — the production token layer (ship these)
- `assets/` — logos and collage textures

**Reference**
- `BRIEF.md` — the complete brand brief: voice, positioning, proof set, anti-fabrication rules. Read §11–12 before writing copy.
- `DESIGN-SYSTEM.md` — design-system guide: content fundamentals, visual foundations, iconography
- `SKILL.md` — packaged as a Claude Code skill; drop the folder in `.claude/skills/` to make the brand available as `/drifted-design`
- `reference/Design System - Foundations.html` — colour, type, spacing, effects specimens with contrast matrix
- `reference/Component Library.html` — every primitive with its states
- `reference/Visual + Motion Spec.html` — motion choreography in detail
- `reference/Drifted Mark - Final Spec.html` — logo construction, clearspace, minimum sizes, incorrect usage
- `reference/Work + Case Study.html` — the case-study template at full fidelity
- `reference/Brand Collateral.html` — business cards, signature, deck cover
- `reference/Handoff Brief.html` — the brand brief as a readable page
