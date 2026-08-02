# Photography & art direction brief

Handoff gap 1 is the last thing standing between this site and launch: every image
frame renders a labelled placeholder. This is the shot list to close it.

The frames, aspect ratios, scrims and hover behaviour are already built and correct.
Only the pixels are missing — nothing here needs a code change beyond passing `src`
to `ImageSlot`.

## The constraint, verbatim from BRIEF §10

**Material** — fine film grain over flat colour fields, die-cut hard edges,
deliberate 2–4px print misregistration, anodized metal, matte surfaces with a single
specular highlight. No gloss, no gradient mesh, no bokeh.

**Never** — corporate blue, purple gradients, stock photography, smiling teams,
rounded cards with coloured left borders, glossy 3D, lens flare.

High-contrast, cool-neutral, real grain. Product and object photography over people.
When people appear they are mid-motion and cropped hard.

## Shot list

| Slot | Route | What it has to prove |
| --- | --- | --- |
| Case hero ×6 | `/work/[slug]` | The most legible artefact of the work — a platform screen, campaign still, product shot. Full-bleed behind a bottom scrim. |
| Phase stills | `/work/[slug]` | 2–4 per case, one per phase. Process, not polish: the upload template mid-fill, the margin table, the DM thread. |
| Proof grid ×3 | `/work/[slug]`, `/` | Screenshots that *are* the receipt — a dashboard, a results screen, a filled template. 4:3. |
| Service receipts ×2 | each `/services/*` | The named client's actual output. Performance: campaign creative + a DM order. Creators: merch shot + launch post. AI product: platform screen + filled template. |
| Work tiles ×6 | `/work`, `/` | Cropped from the case hero. They tilt and glare on hover. |

## Rules that will bite

- **The bottom third of every case hero gets scrimmed.** Compose with headroom.
- **Tiles misregister by default** — `translate(9px, 7.8px) rotate(-1.2deg) scale(1.06)`,
  snapping square on hover. Keep critical detail ~12px clear of every edge.
- **Screenshots must be real.** A mocked dashboard is an invented metric with extra
  steps, and BRIEF §12 does not care that it is a picture.
- **Redact rather than fake.** Uncleared names and figures get blocked out in Tar,
  never swapped for plausible ones.
- **Deliver 2× minimum**, AVIF or WebP, sRGB. `ImageSlot` hands straight to
  `next/image`, which handles the rest.

## Still to commission

Per DESIGN-SYSTEM.md, the five collage objects are the founder's uploaded references
with backgrounds removed. The megaphone and pin read as stock; the angel and starburst
read as another artist's drawings. Confirm rights, or commission a 5–8 object set from
one illustrator so the kit is owned and stylistically consistent. They are unused by
the site today, which is the only reason this isn't blocking launch.
