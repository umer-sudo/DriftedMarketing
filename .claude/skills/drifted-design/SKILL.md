---
name: drifted-design
description: Use this skill to generate well-branded interfaces and assets for Drifted Marketing, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read `README.md` in this folder first — it is the full website handoff: tokens, screens, interactions, content rules and known gaps. Then read `BRIEF.md` for voice, positioning and the anti-fabrication rules (§11–12 are hard constraints: never invent a metric). `DESIGN-SYSTEM.md` carries the brand-level layer — colour, type, layout, texture, iconography — for anything that is not the website.

`styles.css` + `tokens/*.css` are production-ready — adopt them rather than re-deriving values. `Drifted Website.html` + `site.js` are design references, not production code.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out of `assets/` and create static HTML files for the user to view. If working on production code, read the rules here and become an expert in designing with this brand.

If the user invokes this skill without other guidance, ask what they want to build, ask some questions, and act as an expert designer who outputs HTML artifacts or production code depending on the need.
