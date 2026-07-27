# Drifted Marketing

Repository for the Drifted Marketing website. The site itself is not built yet — what lands here first is the approved design handoff.

## Where things are

Everything is in **[`.claude/skills/drifted-design/`](.claude/skills/drifted-design/)**:

| File | Read it for |
| --- | --- |
| [`README.md`](.claude/skills/drifted-design/README.md) | **Start here.** The website handoff — the full token layer with exact values, the ten-route map, every screen section by section, all motion behaviour, content rules, and the open gaps. |
| [`DESIGN-SYSTEM.md`](.claude/skills/drifted-design/DESIGN-SYSTEM.md) | Brand-level design system: colour, type, layout, texture, iconography. |
| [`BRIEF.md`](.claude/skills/drifted-design/BRIEF.md) | Voice, positioning, proof set. §11–12 are hard constraints — never invent a metric. |
| `styles.css` + `tokens/` | Production-ready CSS. Adopt as-is; do not re-derive the values. |
| `Drifted Website.html`, `site.js`, `image-slot.js` | Hash-routed prototype of all ten routes. **Reference only — do not ship.** |
| `reference/*.html` | Approved specimens: foundations, component library, motion spec, mark spec, collateral. |
| `assets/` | Logos, collage kit, mood references. |

The handoff README is self-sufficient: a developer with no context from the design conversation can build from it alone.

## Using the brand as a skill

The folder is packaged as a Claude Code skill. It is already at `.claude/skills/drifted-design/`, so in this repo it is live as `/drifted-design`. To use it elsewhere, copy the folder into that project's `.claude/skills/`.

## Open items

Eight gaps are flagged explicitly in the handoff README and need answers before launch: case-study imagery, OG image, Instagram handle, phone number, contact form endpoint, analytics, the countdown date, and the sitemap.

Two further flags carry over from the design system: the collage assets are the founder's uploaded references and need rights confirmed (or a commissioned replacement set) before anything ships, and no display font is licensed yet — the system currently runs on Google Fonts.
