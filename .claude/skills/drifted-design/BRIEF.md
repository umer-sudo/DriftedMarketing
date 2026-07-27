# DRIFTED MARKETING — CONTEXT BRIEF v1.0
*Paste this whole file into a new Claude chat before asking it for anything. It is the complete state of the brand as of this build.*

---

## 0. HOW TO USE THIS

You are joining a brand-identity and design-system build already in progress. Everything below is **decided, not proposed** — unless it appears under §8 Open questions. Do not re-open locked decisions, do not suggest alternative palettes or fonts, and do not soften the voice. If you think something is wrong, say so in one line and then work within it until told otherwise.

When you produce anything — copy, prompts, specs, code, briefs — it must pass three tests:
1. **Would a $100M Gen-Z-native brand ship this?** If it reads like a freelancer or an agency template, it fails.
2. **Is there a number in it?** Drifted attaches a figure to every claim.
3. **Is it loud by choice?** Aggression is engineered here, never accidental or scrappy.

---

## 1. THE COMPANY

**Drifted Marketing** — full-stack boutique creative agency. Founded **2026 in Karachi**. Three clients, six disciplines, deliberately small — small is the product, not a stage being grown out of.

Three disciplines, one P&L:
- **Performance media & content** for DTC ecommerce brands — paid social/search plus the creative that feeds it.
- **Growth & monetization consulting** for content creators — turning an audience into a business.
- **AI-powered app and PWA development** — with the monetization strategy defined before a line of code is written.

**The name means departure.** We drifted from how every other agency works: no strategy team / creative team / media team separated by an account layer. Same people, all three disciplines, in the room.

**Positioning:** the agency for brands that need to look bigger than they are.

**The core argument (use this everywhere):** *Every agency says growth. We say the number.* One metric, one date, written into the contract.

**Never looks like:** corporate blue · stock photos of people in meetings · "digital solutions" language · safe SaaS gradients · Times-New-Roman seriousness · anything cheap.

**Reference energy:** Noomo Agency, Buzzworthy Studio, Hello Monday.

---

## 2. VOICE & COPY RULES

- **We, not I.** Drifted speaks as a studio. The reader is always "you" and is always the client — never "users", never "brands like yours".
- **Short declaratives.** Verb-first. A sentence that can lose a word loses it.
- **Numbers over adjectives.** "5.2× blended ROAS in 90 days", not "exceptional results".
- **Say the uncomfortable thing.** "We're not the cheap option and we don't pretend to be." "Nobody who guarantees a number is telling you the truth."
- **Sentence case in body, UPPERCASE in display.** Mono labels are uppercase with 0.16–0.2em tracking.
- **No emoji. Ever.** Not in UI, not in email, not in social.
- **No exclamation marks**, no "excited to", no "we're thrilled", no "solutions", no "leverage", no "journey", no "unlock", no "elevate", no "seamless".
- **Headlines are 3–6 words.** Everything longer is body copy pretending.

**Lines that are canon** (reuse them; they are the brand's spine):
- Look bigger than you are.
- Departure, by design.
- Every agency says growth. We say the number.
- Tell us the number. We'll tell you if we can.
- Views don't pay invoices. Stories do.
- An audience without a business model is a hobby.
- We decide how it makes money before we build it.
- Retainers should be losable.
- Software without a price is a hobby with a repo.
- Small is the product.
- We're not the cheap option and we don't pretend to be.
- Nobody who guarantees a result is telling you the truth.

---

## 3. COLOUR — locked

| Role | Name | Hex | Notes |
| --- | --- | --- | --- |
| Base | **Tar** | `#0A0A0B` | Every surface starts here |
| Paper | **Newsprint** | `#F2F0EA` | The `.drift-paper` scope; light sections and print |
| **Hero accent** | **Voltage** | `#AFE304` | 13.0:1 on Tar. Anodized lime — greened off default fluorescent |
| Support | **Siren** | `#F5330A` | 5.1:1 on Tar. Vermilion, pink removed. Sparingly |
| Rare | **Klein** | `#2417F0` | 2.3:1 — **graphic use only, never text**. Once per page max |

Full 50–900 ramps exist for all three accents in `tokens/colors.css`.

**Rules:** max two accents in one composition. Voltage carries UI, data and small text; Siren is emphasis; Klein is a single moment. **Newsprint on Siren fails AA (3.4:1)** — Siren buttons take Tar labels. Inline error text uses Siren 400 (6.4:1), not Siren 500. Voltage on white is 1.3:1 — in email and on paper it is only ever a filled shape, never type.

---

## 4. TYPE — locked

- **Display / lockups:** **Schibsted Grotesk 900**, uppercase, tracking **−4.5%**, leading 0.82–0.88. Chosen as the closest free stand-in for Helvetica Now Display; its stem is 0.30 of cap height, matching the mark exactly.
- **Body:** **Instrument Sans** 400/600, 15–17px, line-height 1.5–1.62.
- **Labels / data:** **JetBrains Mono** 400/500, 10–12px, uppercase, tracking 0.16–0.2em.

**Scale is deliberately gapped:** display sits 8–14× body size with nothing in between. No 32px "sub-headings" softening the jump — that gap *is* the system.

**Two owned typographic moves:**
1. **Cap-tight die-cut** — the Voltage highlight is clipped to cap height, not the line box, and sits a hair below the baseline like a printed knockout. Alternating solid and 3px-outlined lines.
2. **Overprint index** — huge section numerals one shade off the page black (`#17171B` on Tar), sitting behind the headline.

---

## 5. THE MARK — locked

A **D whose counter has drifted off-axis**, printed twice out of register. The Voltage under-plate is offset **9 units at −3.5°** beneath the Newsprint plate. The drift lives in the mark only — the wordmark is square and never offset.

Four cuts, all in `assets/`:
- `logo.svg` — two-plate, for dark
- `logo-on-light.svg` — for Newsprint
- `logo-mono.svg` — single plate, one ink (embroidery, etching)
- `logo-plain.svg` — no offset, for ≤24px

Motion: the plates converge, **lock hard**, then slip to rest (1150ms, `--ease-hit`). Once per session.

---

## 6. MATERIAL, LAYOUT & MOTION

**Material:** fine film grain at 8% over flat colour fields (26% over accent fields) — `overlay` on dark, `multiply` on light. Die-cut diagonals at 107°. Anodized metal for dividers. Deliberate 2–4px misregistration between plates. **Never** photocopy halftone, tape, or DIY punk texture — this brand is *fabricated*, not scrappy.

**Layout:** 12 columns, `--max-w-content` 1440px, page padding `clamp(20px, 5vw, 80px)`, section rhythm `clamp(80px, 12vw, 200px)`. Radii are near-square: 2px controls, 4px cards, 0 for full-bleed. Cards are a hairline `rgba(242,240,234,.14)` on `#16161A`, no shadow — glow and grain do the depth work.

**Motion — fast in, dead stop:**
- 90ms state flips · 160ms hover/press · 280ms wipes · 520ms reveals · 1150ms logo only
- `--ease-hit` `cubic-bezier(.2,.9,.1,1)` — arrivals
- `--ease-cut` `cubic-bezier(.85,0,.15,1)` — wipes and swaps
- `--ease-expo` `cubic-bezier(.16,1,.3,1)` — expensive reveals
- **Banned:** bounce, spring, elastic, anything over 520ms in UI, and fade-with-no-travel
- Hover = 2px lift + Voltage border/text, never opacity. Press = scale(.97), no colour change. Focus = 2px Voltage outline at 2px offset.

---

## 7. WHAT ALREADY EXISTS

**Identity exploration (chronological, all decided):**
`Brand Direction Board.html` → three territories, Blunt Force won · `Blunt Force — Expanded.html` → type/colour/material/motion, pairing D + Voltage hero won · `Departure Marks — Seven.html` → seven mark directions · `Drifted Mark — Final Spec.html` → the approved mark, fully specified · `Logo Motion — Storyboards.html`.

**The system:**
- `styles.css` + `tokens/` — 170 tokens across fonts, colors, typography, spacing, effects, motion, base
- `guidelines/` — 20+ specimen cards
- `components/` — 18 primitives in 7 groups (Button, IconButton, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip, Icon, Logo, Marquee, StatBlock), each with `.d.ts` and `.prompt.md`
- `ui_kits/website/` — click-through marketing site

**Design documentation (7 stages, all built):**
`Design System — Foundations.html` (incl. Tailwind config) · `Component Library.html` · `Homepage.html` (desktop + mobile, annotated) · `Service Pages.html` · `Work + Case Study.html` · `Utility Pages.html` (About, Contact, 404, Thank you) · `Brand Collateral.html` (social, documents, deck slides, family sheet) · `Motion Prototypes.html` (live, replayable).

**Templates & sends:**
`templates/contract/` — master services agreement with plain-English margin notes · `templates/invoice/` · `templates/pitch-deck/` — 12 slides · `email/Newsletter.html` + `email/Campaign.html` — send-ready 600px tables · `Signature + Cards.html`.

**Copy:** Site copy v1 is written and approved (homepage, three service pages, work index, Frank Zoller case study, about, contact, 404, thank you, CTA library). `Homepage.html` has been updated to it. **The other built pages still carry the earlier placeholder copy and invented clients — they are being migrated.**

---

## 8. OPEN QUESTIONS / KNOWN GAPS

1. **Fonts are free substitutes.** Schibsted Grotesk stands in for a licensed **Helvetica Now Display Black** or **Neue Haas Grotesk Display 95** (~$200–600 web). If the licence is bought, the swap is one line in `tokens/fonts.css`.
2. **Icons are Lucide 0.469** (2px stroke) as a substitute set — no proprietary icon system exists yet.
3. **All imagery is placeholder.** No photography has been shot or licensed. The five collage cut-outs in `assets/collage/` need rights confirmed before anything ships.
4. **The contract is not legal advice** — liability cap, IP assignment and governing law need a lawyer in the operating state.
5. **Real clients, real gaps.** The actual roster is **Ehsaan** (C2C thrift marketplace PWA, in production), **Frank Zoller Authentic History** (AI listing platform for Valkyrie LLC, live Aug 2026; also Inventory Watch and a site rebuild), **Noted.** (creator merch brand, 115K followers, 7 months) and **The Gallery** (DM-first performance media). Earlier work led at ForjWell: BamBam NYC, Better With A Cup Of Coffee, Mystify.eer, LAFO40, Lipanda Foundation, Feature8, The Leaf. **Result figures for Zoller are pending (hours saved, lots processed) — do not invent them.** Any name not on this list (Halcyon Labs, Kade Ross, Tempo, Aster Supply) is placeholder from an earlier round and must be replaced.
6. **Testimonials are held.** No real client quotes exist yet; the section ships empty rather than with invented praise.
6. **No logo animation asset yet** — only CSS/storyboard prototypes; a Lottie or video export is still to produce.
7. **3D is specified but not produced.** The material direction calls for properly lit PBR objects; current studies are CSS approximations.

---

## 9. WHAT WE'RE LIKELY TO BUILD NEXT

Possible directions — nothing committed:
- Real photography and 3D art direction brief (shot list, lighting, retouch rules)
- Client-facing dashboard / reporting surface
- Case-study production system so new work can be published fast
- Pitch and onboarding flow end to end: outreach → call → proposal → contract → kickoff
- Social content system: recurring formats, not one-off posts
- The website in production code

---

## 10. HOW TO PROMPT AGAINST THIS BRAND

When writing prompts for other tools (image, video, code, copy), carry these constraints verbatim:

**Colour string:** `near-black #0A0A0B base, off-white #F2F0EA, single acid-lime accent #AFE304, vermilion #F5330A used sparingly`
**Type string:** `heavy neo-grotesque, uppercase, tracking -4.5%, leading 0.86, display 8-14x body size`
**Material string:** `fine film grain over flat colour fields, die-cut hard edges, deliberate 2-4px print misregistration, anodized metal, matte surfaces with a single specular highlight — no gloss, no gradient mesh, no bokeh`
**Anti-prompt (always include):** `no corporate blue, no purple gradients, no stock photography, no smiling teams, no rounded cards with coloured left borders, no emoji, no glossy 3D, no bokeh, no lens flare`

**Copy prompts must specify:** we-voice, 3–6 word headline, a real number in the body, no exclamation marks, no "solutions/leverage/journey/elevate/seamless".

**When asked for options,** give three that are genuinely different in *strategy*, not three colourways of one idea — that is how every decision in this project has been made so far.

---

## 11. THE REAL PROOF SET

Every case study, number and client name Drifted may use. **Nothing outside this list gets published.** Halcyon Labs, Kade Ross and Tempo PWA were placeholders from an early round — they are deleted and never appear again.

### Live clients — signed under Drifted

**Ehsaan** — Pakistan's first C2C thrift marketplace. Client: Suleman Farooqui. PWA on React / Vite / TypeScript / Supabase, built through Lovable across 23 prompts, then moved to Claude Code with a 19-section knowledge base. Gen-Z design direction. Scope also covered brand identity, social content, video and launch assets. Contract: Package 03 — Build + Scale, Rs. 900,000. Umer served as creative director, prompt engineer and design lead.
*Angle:* a full marketplace, brand and launch system — not a landing page with a cart.

**Adam Lewis** — militaria auction operation. Three engagements.
1. *LiveAuctioneers listing platform* — hosted multi-user AI PWA that fills the bulk-upload template from item photos. Trained on a ~32,000-item historical corpus. Replaces manual entry of roughly 1,250 lots per auction. Confidence-based review triage flags only uncertain items. First live auction: 16 August 2026.
2. *Inventory Watch* — PWA monitoring 21 dealer sites with real-time new-listing alerts. Python engine, 16 modules, multi-tier adapter system, false-positive suppression.
3. *zollerhistory.com* — website rebuild, archival-institutional direction, accession card as the signature element. Audit finding: realized prices consistently landed below estimates, indicating systematic estimate inflation.
*Angle:* the flagship. The one no other agency in the pitch can match.

**Julia — @theonlycanadianbacon / NOTED.** Creator, 115K+. Grew to 114K with consistent monthly revenue across seven months. Built NOTED. from zero: full brand identity on a red-pen annotation concept, 8-product merch line with pricing and margin tables, Printful + Tapstitch hybrid production, Instagram launch strategy, client handoff package. Flat monthly retainer.
*Angle:* audience to business. The clearest proof of the creator offer.

### Direct work — carried over

- **The Gallery (@thegallery.bytg)** — performance marketing for a personalised newborn brand. 10-creative campaign driving purchases through Instagram DMs.
- **Multi-brand social operation** — @bambamapparel, @theposterprojectpk, @thegallerybytg, @betterwithacupofcoffee. Strategy, production and client communication run directly.
- **SEYR (@shop.seyr / seyr.shop)** — ecommerce website build. The one place a visitor can click through to a live, finished thing rather than read about it. `[LAUNCH DATE / METRICS PENDING]`
- **Build portfolio** — seyr.shop, bambamnyc.com.

### ForjWell-era work — attribution rules apply

Usable only as *"work led while Creative Strategist at ForjWell"*, never as Drifted's own numbers: BamBamNYC, Better With A Cup Of Coffee, Mystify.eer, LAFO40 / Octogro, Lipanda Foundation, Feature8, The Leaf, Faysal Bank benchmarking.

**Never usable at all:** $7M+ client revenue · 40+ apps launched · 8+ years experience · 300%+ ROI · eleven clients · six people. These are either ForjWell's, inflated, or invented.

### The honest company line

Drifted Marketing. Founded 2026. Three clients. Small on purpose. Built by an operator who ran sales and delivery on a book of clients across Pakistan, the US, Canada and Australia — then left to do it without the account layer. That story is stronger than a fake client count. **"We left" is the brand.**

### Verified numbers — cleared for publication

| Figure | Client | Use it for |
| --- | --- | --- |
| **5.2–6× ROAS on every campaign** | The Gallery | The headline proof. Leads the performance media offer. |
| **400+ hours saved** | Frank Zoller / Adam Lewis | The AI product offer. Concrete, operational, impossible to fake. |
| **2.2M views in 90 days, 80% organic** | The Poster Project | Reach without an audience — 811 followers produced 199,392 accounts reached, up 174.5%. |
| **3,000 followers per month** | @theonlycanadianbacon | The creator growth offer. Sustained rate beats a total. |
| **$0.25 per landing page view** | BamBam NYC | Efficiency proof on paid. Small but real and defensible. |
| **80K accounts reached in 30 days** | The Poster Project | Supporting stat for the social operation. |

### Numbers to avoid

- **BamBam's +613,766.7% reach growth.** True, and useless — a near-zero baseline artifact. Anyone who understands the metric discounts everything else you claim.
- **Follower counts on BamBam (129) and The Poster Project (811)** as standalone stats. The reach numbers are the story. *(Exception, by decision: the homepage hero pairs 2.2M views with the 811-follower account deliberately, as the flex. Nowhere else.)*
- **NOTED. revenue.** Store is still launching. Nothing to claim yet.
- **Ehsaan performance.** In build. Scope and stack only until launch.

### Still worth capturing

- [ ] Ad spend behind the 5.2–6× ROAS — spend plus return beats a multiple alone
- [ ] NOTED. first-month revenue once live
- [ ] Ehsaan launch metrics — signups, listings, GMV
- [ ] Zoller lots processed on 16 August, alongside the 400 hours
- [ ] Any before/after conversion rate on SEYR

### Numbers still missing

- [ ] ROAS or CAC from The Gallery campaigns
- [ ] NOTED. revenue — even a monthly range
- [ ] Julia's growth rate — followers per month over the seven
- [ ] Hours saved per auction on the LiveAuctioneers build (available after 16 Aug)
- [ ] Ehsaan launch metrics — signups, listings, GMV
- [ ] Any before/after conversion rate on a site build

Source screenshots for the verified figures live in `uploads/` (Instagram insights and Meta Ads Manager captures).

One verified ROAS figure upgrades the entire ecommerce offer.

---

## 12. ANTI-FABRICATION — NON-NEGOTIABLE

This brief propagates decisions into every chat it is pasted into. That includes wrong ones. So:

1. **Never invent a client, a number, a testimonial or a case study.** Not as an example, not as a placeholder that "will be swapped later." It never gets swapped.
2. **Every figure must trace to §11.** If it isn't there, it doesn't ship.
3. **When a number is genuinely needed and doesn't exist**, write `[NUMBER PENDING]` in capitals. Never a plausible-looking figure.
4. **Illustrative examples get labelled inline** — `e.g. 4.1× (ILLUSTRATIVE)` — never left bare.
5. **"We say the number" is the core argument.** A brand built on that claim cannot publish numbers it can't defend. The first prospect who asks "which client?" ends the call.

The voice rule says *say the uncomfortable thing.* It applies internally too.

---
*Drifted Marketing — departure, by design.*
