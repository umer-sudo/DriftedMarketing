/* Brand object renders.

   Each object is drawn as markup injected into the running site, so it inherits
   the real next/font faces and the real token layer rather than approximations
   of them. Playwright then photographs the scene at 2x.

   The point of a "scene" rather than a flat card: NVRMND's ticket and magazine
   read as photographed things, which is why they can stand in for photography.
   A flat card reads as a UI screenshot. So each object gets a ground, a light
   sweep on the brand's 107deg die-cut angle, grain, a shadow, and a small
   rotation — plus the two-plate misregistration from the mark. */

import { mkdirSync, unlinkSync } from "node:fs";
import sharp from "sharp";

/* Playwright is deliberately NOT a project dependency — it is ~100MB and a
   browser download for a tool that runs when the objects change, which is
   rarely. Install it where you run this (`npm i -D playwright`) or run the
   script from somewhere that already has it. */
const { chromium } = await import("playwright").catch(() => {
  throw new Error("playwright is not installed — `npm i -D playwright` first");
});

/* Usage: `npx next start -p 3444` in one shell, `node scripts/render-objects.mjs`
   in another. Re-run after any change to the token layer — these are screenshots
   of the design system, so they go stale if it moves. */
const ORIGIN = process.env.ORIGIN ?? "http://127.0.0.1:3444/";
const OUT = new URL("../public/objects", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* Shared scene chrome. `tilt` and `plate` differ per object so the three don't
   look like one o-card photographed three times. */
const scene = (inner, { tilt, plate }) => `
<div class="o-scene">
  <div class="o-sweep"></div>
  <div class="o-stage" style="transform: rotate(${tilt}deg)">
    <div class="o-underplate" style="background:${plate}"></div>
    <div class="o-obj">${inner}</div>
  </div>
  <div class="o-grain"></div>
</div>`;

const CSS = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{color:#0A0A0B;width:900px;height:675px;overflow:hidden;background:#0A0A0B}
  .o-scene{position:relative;width:900px;height:675px;background:
     radial-gradient(120% 90% at 22% 8%, #1a1a1f 0%, #0A0A0B 62%);
     display:grid;place-items:center;overflow:hidden}
  /* 107deg is the brand's die-cut angle; the o-sweep reads as a single specular
     highlight on a matte surface, which the material rules ask for. */
  .o-sweep{position:absolute;inset:-30%;background:linear-gradient(107deg,
     transparent 30%, rgba(242,240,234,.055) 46%, transparent 58%)}
  .o-grain{position:absolute;inset:0;background-image:${GRAIN};opacity:.08;
     mix-blend-mode:overlay;pointer-events:none}
  .o-stage{position:relative;filter:drop-shadow(0 46px 60px rgba(0,0,0,.72))}
  /* The mark prints twice out of register; so do these. */
  .o-underplate{position:absolute;inset:0;border-radius:4px;
     transform:translate(9px,7px) rotate(-.6deg)}
  .o-obj{position:relative;border-radius:4px;overflow:hidden}

  .o-mono{font-family:var(--font-mono);text-transform:uppercase;
     letter-spacing:.18em;font-weight:500}
  .o-disp{font-family:var(--font-display);font-weight:900;text-transform:uppercase;
     letter-spacing:-.045em;line-height:.88}
  .o-sans{font-family:var(--font-body);font-weight:400}

  /* 01 — the contract. Newsprint stock, black type, one margin o-note. */
  .o-paper{width:680px;background:#F2F0EA;color:#0A0A0B;padding:46px 48px 40px}
  .o-paper .o-rule{height:1px;background:rgba(10,10,11,.18);margin:22px 0}
  .o-paper .o-note{display:flex;gap:12px;margin-top:26px;align-items:flex-start}
  .o-paper .o-note i{width:4px;align-self:stretch;background:#F5330A;flex:0 0 4px}

  /* 02 — the number o-card. Tar stock, Voltage plate, deliberately unfilled. */
  .o-card{width:700px;background:#131317;color:#F2F0EA;padding:44px 46px 40px;
     border:1px solid rgba(242,240,234,.14)}
  .o-card .o-field{display:flex;align-items:baseline;gap:16px;margin-top:26px}
  .o-card .o-field span{font-family:var(--font-mono);font-size:11px;letter-spacing:.18em;
     text-transform:uppercase;color:#8A8A93;white-space:nowrap}
  .o-card .o-field b{flex:1;height:1px;background:rgba(242,240,234,.28)}

  /* 03 — the spec. Newsprint again but set entirely in o-mono, so it reads as a
     printout rather than a document. */
  .o-sheet{width:690px;background:#F2F0EA;color:#0A0A0B;padding:40px 44px}
  .o-sheet table{width:100%;border-collapse:collapse;
     font-family:var(--font-mono);font-size:13px;letter-spacing:.02em}
  .o-sheet td{padding:9px 0;border-bottom:1px solid rgba(10,10,11,.12);
     vertical-align:top}
  /* 74px clipped "03 trigger" onto a second line and butted "05 target"
     straight into its value. */
  .o-sheet td:first-child{width:108px;padding-right:16px;color:#5a5a60;
     white-space:nowrap}
`;

const CONTRACT = `
<div class="o-paper">
  <div class="o-mono" style="font-size:10px;color:#5a5a60">Master services agreement · Clause 4.2</div>
  <div class="o-disp" style="font-size:52px;margin-top:16px">Termination</div>
  <div class="o-rule"></div>
  <p class="o-sans" style="font-size:15px;line-height:1.62;color:#2a2a30">
    Either party may end this agreement on thirty days&rsquo; written notice, at any
    point, without cause and without penalty. Work in progress is invoiced to the
    date of notice. Nothing further is owed.
  </p>
  <div class="o-note">
    <i></i>
    <div>
      <div class="o-mono" style="font-size:9px;color:#F5330A">In plain English</div>
      <p class="o-sans" style="font-size:15px;line-height:1.55;margin-top:7px;font-weight:600">
        Retainers should be losable. If we stop earning the fee, you should be
        able to leave without a lawyer.
      </p>
    </div>
  </div>
</div>`;

const NUMBER = `
<div class="o-card">
  <div class="o-mono" style="font-size:10px;color:#AFE304">Engagement record</div>
  <div class="o-disp" style="font-size:56px;margin-top:16px">The number</div>
  <p class="o-sans" style="font-size:14px;line-height:1.6;color:#9a9aa3;margin-top:16px;max-width:44ch">
    One metric and one date, agreed on the call and written into the contract.
    Reported against every week.
  </p>
  <div class="o-field"><span>Metric</span><b></b></div>
  <div class="o-field"><span>By</span><b></b></div>
  <div class="o-field"><span>Reported</span><b></b></div>
  <div style="margin-top:34px;display:inline-block;background:#AFE304;color:#0A0A0B;
       padding:9px 14px 8px;border-radius:2px"
       class="o-mono" >Yours to fill in</div>
</div>`;

const SPEC = `
<div class="o-sheet">
  <div style="display:flex;justify-content:space-between;align-items:baseline">
    <div class="o-mono" style="font-size:10px;color:#5a5a60">monetization.spec</div>
    <div class="o-mono" style="font-size:9px;color:#F5330A">Example · not a client result</div>
  </div>
  <div class="o-disp" style="font-size:44px;margin-top:14px">Before<br/>design starts</div>
  <table style="margin-top:22px">
    <tr><td>01 model</td><td>Subscription · $19/mo · annual &minus;20%</td></tr>
    <tr><td>02 wedge</td><td>Free plan capped at 3 / week</td></tr>
    <tr><td>03 trigger</td><td>Paywall on action #4 · day 6 median</td></tr>
    <tr><td>04 loop</td><td>Weekly digest · D7 reactivation</td></tr>
    <tr><td>05 target</td><td>35% D30 · $19 ARPU · CAC &lt; $42</td></tr>
  </table>
  <p class="o-sans" style="font-size:14px;line-height:1.55;margin-top:22px;font-weight:600;color:#2a2a30">
    Software without a price is a hobby with a repo.
  </p>
</div>`;

const OBJECTS = [
  { file: "contract", markup: CONTRACT, tilt: -1.6, plate: "#AFE304" },
  { file: "number", markup: NUMBER, tilt: 1.4, plate: "#F2F0EA" },
  { file: "spec", markup: SPEC, tilt: -0.9, plate: "#AFE304" },
];

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage({
  viewport: { width: 900, height: 675 },
  deviceScaleFactor: 2,
});
/* Load the real site first so next/font's faces and the token layer are present,
   then replace the document body with the scene. */
await page.goto(ORIGIN, { waitUntil: "networkidle" });
/* A stale `next start` serving a rebuilt .next 400s on the CSS bundle, which
   drops every token and silently renders the whole set in Times — exactly the
   "Times-New-Roman seriousness" the brief bans. Fail loudly instead. */
const probe = await page.evaluate(
  () => getComputedStyle(document.querySelector(".disp")).fontFamily,
);
if (!/schibsted/i.test(probe)) {
  throw new Error(`Token layer did not load — .o-disp resolved to ${probe}`);
}
await page.addStyleTag({ content: CSS });

for (const o of OBJECTS) {
  await page.evaluate(
    ({ html }) => {
      document.body.innerHTML = html;
    },
    { html: scene(o.markup, o) },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const png = `${OUT}/${o.file}.png`;
  await page.screenshot({ path: png });
  /* The static export passes images through unoptimised (see next.config.ts), so
     these ship pre-sized rather than relying on on-demand optimisation. */
  await sharp(png).resize(1600, 1200).avif({ quality: 62 }).toFile(`${OUT}/${o.file}.avif`);
  unlinkSync(png);
  console.log("rendered", o.file);
}

await browser.close();
