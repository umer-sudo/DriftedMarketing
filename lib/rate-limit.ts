/* Fixed-window rate limiter, in-process.

   IMPORTANT — this is per-instance memory. On a single self-hosted Node server it
   works as written. On serverless (Vercel, Lambda) each cold instance keeps its own
   counter, so a distributed attacker gets roughly `limit × instances`. It raises the
   cost of casual abuse; it is not a security boundary.

   For a real ceiling, back this with a shared store — Upstash Redis, Vercel KV, or a
   Postgres table — by replacing `hits` with a client and awaiting the increment. The
   call site in app/contact/actions.ts does not need to change. */

type Window = { count: number; resetAt: number };

const hits = new Map<string, Window>();

/* Bound the map so a spray of unique keys cannot grow it without limit. */
const MAX_KEYS = 10_000;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = hits.get(key);

  if (!existing || existing.resetAt <= now) {
    if (hits.size >= MAX_KEYS) sweep(now);
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }
  return { ok: true, remaining: limit - existing.count, retryAfter };
}

function sweep(now: number) {
  for (const [k, v] of hits) {
    if (v.resetAt <= now) hits.delete(k);
  }
  /* Still full of live windows — drop the oldest to keep the map bounded. */
  if (hits.size >= MAX_KEYS) {
    const oldest = [...hits.entries()].sort((a, b) => a[1].resetAt - b[1].resetAt);
    for (const [k] of oldest.slice(0, Math.floor(MAX_KEYS / 4))) hits.delete(k);
  }
}
