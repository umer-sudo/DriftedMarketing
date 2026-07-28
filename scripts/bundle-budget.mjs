#!/usr/bin/env node
/* Bundle budget.
 *
 * Measures what a visitor actually downloads for a page: the gzipped bytes of
 * every JS chunk in that route's entry list. This is the same number
 * `next build` prints as "First Load JS".
 *
 * The obvious shortcut — summing the raw bytes of everything under
 * .next/static/chunks — is wrong twice over. It counts chunks that only some
 * routes load as if every route loaded them, and it counts uncompressed bytes
 * when every host on earth serves these gzipped. On this site that shortcut
 * reported 785 kB against a real worst-case first load of ~102 kB, which makes
 * any budget built on it meaningless.
 *
 *   node scripts/bundle-budget.mjs [budgetKB]
 */
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const BUDGET_KB = Number(process.argv[2] ?? 130);
const NEXT = ".next";

const manifest = JSON.parse(readFileSync(join(NEXT, "app-build-manifest.json"), "utf8"));

/* Route handlers (sitemap, OG images, RSS) ship no client JS. The root layout is
   not a destination either, but every page loads it, so its chunks are unioned
   into each page rather than measured as a route of its own. */
const shell = manifest.pages["/layout"] ?? [];
const routes = Object.entries(manifest.pages).filter(
  ([name]) => !name.endsWith("/route") && name !== "/layout",
);

const gz = new Map();
const gzipped = (file) => {
  if (!gz.has(file)) gz.set(file, gzipSync(readFileSync(join(NEXT, file))).length);
  return gz.get(file);
};

const measured = routes
  .map(([name, files]) => ({
    name,
    bytes: [...new Set([...shell, ...files])].reduce((total, file) => total + gzipped(file), 0),
  }))
  .sort((a, b) => b.bytes - a.bytes);

const kb = (bytes) => Math.round(bytes / 1024);
const worst = measured[0];

for (const route of measured.slice(0, 5)) {
  console.log(`  ${String(kb(route.bytes)).padStart(4)} kB  ${route.name}`);
}
console.log(`\nWorst-case First Load JS: ${kb(worst.bytes)} kB (budget ${BUDGET_KB} kB) — ${worst.name}`);

if (kb(worst.bytes) > BUDGET_KB) {
  console.log(`::error::First Load JS is ${kb(worst.bytes)} kB on ${worst.name}, over the ${BUDGET_KB} kB budget.`);
  process.exit(1);
}
