# Drifted Marketing — Design System

Drifted Marketing is a full-stack boutique creative agency. Three lines of business:

1. **Performance marketing and content** for DTC ecommerce brands.
2. **Growth and monetization consulting** for content creators.
3. **AI-powered app and PWA development**, with the monetization strategy defined before a line of code is written.

The name means departure — the agency has drifted from how every other agency works. Positioning: **the agency for brands that need to look bigger than they are.** The work should read Gen-Z-native, VC-backed, hundred-million-dollar — never freelancer portfolio. Reference energy: Noomo Agency, Buzzworthy Studio, Hello Monday.

**What this brand never looks like:** corporate blue, stock photography of people in meetings, "digital solutions" language, safe SaaS gradients, Times-New-Roman seriousness, anything that reads as cheap.

## Sources

This system was built from a written brand brief supplied by the founder in-chat — there was **no existing codebase, Figma file, website, or prior design system**. Everything here is original work created in this project and approved round by round:

| Round | Artefact | Outcome |
| --- | --- | --- |
| 01 | `Brand Direction Board.html` | Three territories explored. **Blunt Force** selected. |
| 02 | `Blunt Force — Expanded.html` | Type routes, palette restructure, material and motion. Locked: Schibsted Grotesk + Voltage hero. |
| 03 | `Departure Marks — Seven.html` | Seven abstract marks. Slipped D × Misregistration selected. |
| 04 | `Drifted Mark — Final Spec.html` | Final mark: construction, offsets, fallbacks, stress tests, motion, applications. |

User-supplied reference imagery lives in `assets/references/` (mood only) and `assets/collage/` (working collage kit). See **Iconography → Collage layer** for the licensing caveat.

---

## Content fundamentals

**Voice: we, not I.** Drifted speaks as a studio — "we build the paid engine", never "I". The reader is "you" and is always the client, never "users" or "brands like yours".

**Declarative, short, unhedged.** Sentences run 6–18 words. No "we help you to…", no "solutions", no "leverage", no "empower". State the thing:

- ✅ "We buy attention at a discount and sell it back as revenue."
- ✅ "Monetization is designed before the first screen."
- ✅ "Tell us the number you need to hit and the date you need to hit it by."
- ❌ "We help ambitious brands unlock growth through data-driven digital solutions."

**Confidence without bragging — always attached to a number.** Claims are backed by a figure from the proof set or dropped. "1,250 lots, typed by hand", "32,000 items ingested", "115K followers, zero products". Never a plausible-looking number — when one is missing, write [NUMBER PENDING] in capitals. Scarcity is stated plainly: "Currently taking two clients for Q4."

**Headline casing is UPPERCASE.** Display type is always set in caps (the faces are drawn for it). Body copy is sentence case. Labels, eyebrows and buttons are UPPERCASE MONO with wide tracking. Title Case Is Never Used Anywhere.

**Buttons and links are imperative, 2–4 words.** "Start a project", "See the work", "Book the call", "Read the case". Never "Learn more", never "Submit", never "Click here".

**Self-aware, not jokey.** The brand can be blunt about itself ("Look bigger than you are", "Stop looking like a startup", "we'll say so on the call") but never uses puns, exclamation marks, or hype adjectives ("amazing", "revolutionary", "game-changing").

**Numbers are formatted for punch:** `1,250` not `1250`, `115K` not `115,000`, `32,000` not `32k`. Currency symbol always, decimals only when they change the story.

**Emoji: never.** Not in product, not in decks, not in the deck notes. The collage kit carries the personality that emoji would otherwise carry.

**Punctuation:** en dashes for ranges (`$10–25k`), em dashes sparingly for asides, the middot `·` as the separator in mono metadata rows (`Three clients · three disciplines · 2026—`). Trailing arrows `↗` and `→` are used on links and CTAs and count as punctuation, not iconography.

---

## Visual foundations

### Colour

Dark-first and high contrast. One hero accent, one support, one rare.

| Role | Token | Hex | Contrast on Tar | Use |
| --- | --- | --- | --- | --- |
| Base | `--tar` | `#0A0A0B` | — | Every page background. |
| Paper | `--newsprint` | `#F2F0EA` | 17.4:1 | Light sections, print, business collateral. |
| Hero | `--voltage-500` | `#AFE304` | 13.0:1 | Anodized lime. On every page: CTAs, marks, key data, UI state. |
| Support | `--siren-500` | `#F5330A` | 5.1:1 | Vermilion. Urgency and one emphasis per page. Never below 18px text. |
| Rare | `--klein-500` | `#2417F0` | 2.3:1 | Graphic only, one moment per page. Never text. |

Values were chosen off default fluorescent — the lime is greened so it reads anodized rather than highlighter; the red has the pink removed. Max two accents in a single composition. Full 50–900 ramps live in `tokens/colors.css`; the `.drift-paper` class flips the whole system to the Newsprint scope.

### Type

- **Display / lockups:** Schibsted Grotesk 900 — a neo-grotesque whose stem is 0.30 of cap, matching the mark exactly. Tracking −4.5%, leading 0.82–0.88, always uppercase.
- **Body:** Instrument Sans 400/500 at 15–17px, leading 1.55–1.65, tracking −0.5%.
- **Labels and data:** JetBrains Mono 500 at 10–11px, UPPERCASE, tracking +0.18em — the only positive tracking in the system.

**Extreme size contrast is the system.** Display sits 8–14× body size with nothing in between; there are no 32px "sub-headings" softening the jump.

**Signature moves:** the cap-tight knockout fill (`.drift-fill` — a Voltage block clipped to cap height, never to the line box) and the oversized section numeral sitting one shade off the background.

> **Font substitution flag.** No licensed font files were supplied. Schibsted Grotesk, Instrument Sans and JetBrains Mono are Google Fonts, loaded by `@import` in `tokens/fonts.css` — that is why the compiler reports 0 local `@font-face` files. If you license Helvetica Now Display or Neue Haas Grotesk Display for the display face, send the web files and they drop into `tokens/fonts.css` with no other change.

### Layout

12-column grid, `--max-w-content` 1440px, page padding `clamp(20px, 5vw, 80px)`, section rhythm `clamp(80px, 12vw, 200px)`. Full-bleed bands (marquees, accent sections, image fields) break the grid deliberately; body copy never exceeds `62ch`. Headers are fixed; nothing else is.

### Surface, texture, depth

- **Grain:** fine film grain at 8% (26% over flat accent fields), `overlay` on dark and `multiply` on light. Never a visible halftone or photocopy dot.
- **Fields:** flat colour meeting on hard diagonals (`--diagonal-split`). No gradient inside a field, no blur, no glow except the rare `--glow-voltage` on focus-critical UI.
- **Depth:** hard 6px offset (`--shadow-hard`), not soft shadow. Soft shadows exist (`--shadow-2/3`) only for modals and floating UI over content.
- **Transparency and blur:** almost never. The one permitted scrim is `--scrim-top/bottom` for type over imagery; `--blur-panel` is reserved for sticky nav over moving content.
- **Imagery:** high-contrast, cool-neutral, real grain. Product and object photography over people; when people appear they are mid-motion and cropped hard. No stock, no smiling teams, no soft warm filters.

### Borders, radii, cards

Radii are near-square: `--radius-1` 2px for controls, `--radius-2` 4px for cards, 0 for full-bleed. Pills exist nowhere except the switch track's knob spacing. Cards are a hairline `rgba(242,240,234,.14)` box on `--surface-card` with 24px padding — no shadow by default; `variant="offset"` adds the hard Voltage offset and `interactive` adds a Voltage border plus a 2px lift.

### Motion

Fast in, dead stop. Durations 90 / 160 / 280 / 520ms; the logo drift is the one long move at 1150ms. Easings: `--ease-hit` `cubic-bezier(.2,.9,.1,1)` for controls, `--ease-cut` `cubic-bezier(.85,0,.15,1)` for wipes, `--ease-expo` `cubic-bezier(.16,1,.3,1)` for entrances. **Never** bounce, spring, elastic, or anything over 520ms outside the logo animation.

Three owned transitions: the **hard cut wipe** (accent plate wipes across, type flips colour at the midpoint — replaces every fade), the **slam + underline** (content lands from 1.06 scale with no overshoot, then a 6px Siren bar shoots across underneath), and the **mark drift** (two plates arrive aligned, then separate into misregistration over 850ms).

**Hover:** 2px lift plus a Voltage border or Voltage text — never an opacity change. **Press:** scale to 0.97, no colour change. **Focus:** 2px Voltage outline at 2px offset.

### The mark

A D whose counter has drifted off-axis, printed twice out of register: offset **9 units at −3.5°**, Voltage under-layer on dark, 34% tint for one-ink print, single-plate cut for embroidery and etching, plain plate at 24px and below. Clearspace equals one stem width. Full construction, optical corrections and stress tests: `Drifted Mark — Final Spec.html`. The drift stays contained to the mark — the wordmark is always set clean and square.

---

## Iconography

- **Icon set: Lucide 0.469** (`https://unpkg.com/lucide-static@0.469.0/icons/<name>.svg`), 2px stroke, square caps — the closest match to the brand's engineered geometry. **This is a substitution**: no icon library was supplied. If you commission or license a set, swap the CDN constant in `components/core/Icon.jsx` and nothing else changes.
- **Delivery:** icons are painted as a CSS `mask-image` in `currentColor` (`Icon` component), so they always match the text they sit beside and never ship as inline SVG blobs.
- **Common glyphs:** `arrow-up-right` (external / CTA), `arrow-right` (next), `play`, `check`, `x`, `plus`, `chevron-down`, `external-link`, `zap` (urgency).
- **Unicode as iconography:** the arrows `↗` and `→` are used inline in copy and CTAs and are considered type, not icons. The middot `·` separates mono metadata.
- **Emoji: never**, in any surface.
- **Collage layer:** the brand's personality-carrying imagery is a set of crude, high-contrast found objects — halftone cutouts, brush-drawn marks, crayon scribbles — dropped onto precise engineered type. The rules: black-and-white cutouts by default, at most one crayon/hand element per composition, elements rotated 4–12°, allowed to break the grid and bleed off the edge, never drop-shadowed, never more than three per layout. Assets are in `assets/collage/` as cut-out PNGs with real alpha.
  > **Licensing flag.** These five objects are the founder's uploaded references, background-removed but otherwise unmodified. The megaphone and pin read as stock; the angel and starburst read as another artist's drawings. Confirm rights before anything ships, and commission a 5–8 object set from one illustrator so the kit is owned and stylistically consistent. `assets/references/vision-skateboards-reference.webp` is mood only — that mark belongs to Vision and must never be echoed.

---


## Index

Everything listed here is present in this folder. Nothing else is required to build.

**Root**

| File | What it is |
| --- | --- |
| `README.md` | The website handoff — tokens, the ten-route map, every screen section by section, motion behaviour, content rules, and the open gaps. Start here. |
| `DESIGN-SYSTEM.md` | This document — brand context, content fundamentals, visual foundations, iconography. |
| `BRIEF.md` | The full brand brief: voice, positioning, proof set, anti-fabrication rules. §11–12 are hard constraints. |
| `SKILL.md` | Agent Skills wrapper. Drop this folder into `.claude/skills/` to get `/drifted-design`. |
| `styles.css` | The single entry point consumers link. `@import` list only. **Production-ready.** |
| `Drifted Website.html` | Hash-routed prototype of all ten routes in one document. **Reference only — do not ship.** |
| `site.js` | Routing and motion behaviour for the prototype. Reference only. |
| `image-slot.js` | Placeholder image slots used by the prototype. Reference only. |

**Folders**

- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `motion.css`, `base.css`. **Production-ready; adopt as-is rather than re-deriving values.**
- `assets/` — `logo.svg`, `logo-on-light.svg`, `logo-mono.svg`, `logo-plain.svg`; `collage/` (5 cut-out objects, PNG + WebP); `references/` (mood only — see the licensing flag under Iconography).
- `reference/` — approved design specimens, viewable in a browser:
  - `Design System - Foundations.html` — colour, type, spacing, effects, with the contrast matrix.
  - `Component Library.html` — every primitive in every state.
  - `Visual + Motion Spec.html` — motion choreography in detail.
  - `Drifted Mark - Final Spec.html` — the approved mark: construction, offsets, fallbacks, stress tests, applications.
  - `Work + Case Study.html` — work index plus the numbers case and the craft case.
  - `Brand Collateral.html` — social, documents, deck slides, family sheet.
  - `Handoff Brief.html` — the browser-readable version of the handoff.

---

## Not in this bundle

These were specified during the design rounds but are **not** shipped here. They are scope for the build, not missing files to hunt for.

**Component code.** No JSX/TS component library is included — `reference/Component Library.html` is the visual specification to build against. The inventory it specifies is 18 primitives: **Icon**, **Logo**, **Button**, **IconButton**, **Input**, **Select**, **Checkbox**, **Radio**, **Switch**, **Card**, **Badge**, **Tag**, **Dialog**, **Tabs**, **Toast**, **Tooltip**, **Marquee**, **StatBlock**.

Three of those are brand-specific and non-negotiable: **Logo** (the mark has three reproduction cuts and a size-dependent fallback — it cannot be an image), **Marquee** (the scrolling capability band is a structural device in the visual language), and **StatBlock** (every claim in the copy system is attached to a figure). **Icon** is a wrapper over Lucide rather than a hand-drawn set.

**Email and collateral templates.** Newsletter, campaign, signature, contract, invoice and pitch-deck templates are specified but not built. If they get built, the email rules below are binding.

**Email rules.** No image files (remote content is blocked by default in Outlook), Helvetica/Courier system stack only, Voltage as a filled shape and never as text (1.3:1 on white), and every send carries a real unsubscribe. The same rules govern any email signature.
