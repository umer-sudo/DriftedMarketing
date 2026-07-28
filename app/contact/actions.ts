"use server";

import { headers } from "next/headers";
import { site } from "@/lib/config";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { deliverBrief, type Brief } from "@/lib/deliver-brief";

/* Contact form handler — handoff gap 5.

   Order of defence, cheapest first:
     1. Honeypot — a hidden field. Bots fill it; we report success and drop it.
     2. Rate limit — 5 submissions per IP per 10 minutes.
     3. Turnstile — cookie-free challenge, only when configured.
     4. Validation — name, email, and the number and date the page is built around.
     5. Delivery — email via Resend and/or a webhook. See lib/deliver-brief.ts.

   With no transport configured this still refuses to lie: it returns
   "not-configured" and the form tells the visitor nothing was sent and to email
   instead. See .env.example for what to set. */

export type BriefResult =
  | { ok: true }
  | {
      ok: false;
      reason: "invalid" | "not-configured" | "failed" | "rate-limited" | "challenge";
      message: string;
    };

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

export async function submitBrief(data: FormData): Promise<BriefResult> {
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const company = String(data.get("company") ?? "").trim();
  const need = String(data.get("need") ?? "").trim();
  const number = String(data.get("number") ?? "").trim();
  const date = String(data.get("date") ?? "").trim();
  const honeypot = String(data.get("company_url") ?? "").trim();
  const token = (data.get("cf-turnstile-response") as string | null) ?? null;

  /* 1. Honeypot. Report success so crawlers stop retrying, and send nothing. */
  if (honeypot) return { ok: true };

  const ip = await clientIp();

  /* 2. Rate limit. */
  const limited = rateLimit(`brief:${ip}`, LIMIT, WINDOW_MS);
  if (!limited.ok) {
    const mins = Math.ceil(limited.retryAfter / 60);
    return {
      ok: false,
      reason: "rate-limited",
      message: `That's several submissions in a row. Try again in ${mins} minute${mins === 1 ? "" : "s"}, or email ${site.email} directly.`,
    };
  }

  /* 3. Turnstile, when configured. */
  const challenge = await verifyTurnstile(token, ip === "unknown" ? undefined : ip);
  if (challenge.status === "failed") {
    return {
      ok: false,
      reason: "challenge",
      message: `The anti-spam check didn't pass. Reload and try again, or email ${site.email}.`,
    };
  }

  /* 4. Validation. The number and the date are required because they are the point
     of the page, not because the form wants them. */
  if (!name || !number || !date || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return {
      ok: false,
      reason: "invalid",
      message: "Something above is missing. Check the name, email, number and date.",
    };
  }

  /* Bound the payload so a large paste can't be used as an amplification vector. */
  const brief: Brief = {
    name: name.slice(0, 200),
    email: email.slice(0, 320),
    company: company.slice(0, 200),
    need: need.slice(0, 4000),
    number: number.slice(0, 200),
    date: date.slice(0, 200),
    submittedAt: new Date().toISOString(),
  };

  /* 5. Delivery. */
  const delivery = await deliverBrief(brief);

  if (delivery.status === "sent") return { ok: true };

  if (delivery.status === "not-configured") {
    return {
      ok: false,
      reason: "not-configured",
      message: `The form isn't connected yet — nothing was sent. Email ${site.email} with the number and the date and it lands in the same place.`,
    };
  }

  console.error("[contact] delivery failed:", delivery.detail);
  return {
    ok: false,
    reason: "failed",
    message: `That didn't send. Email ${site.email} with the number and the date and we'll pick it up there.`,
  };
}

/* Behind a proxy the socket address is the proxy, so prefer the forwarded headers.
   x-forwarded-for is client-controllable when the app is exposed directly — take the
   first hop only, and treat this as best-effort attribution rather than identity. */
async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? h.get("cf-connecting-ip") ?? "unknown";
}
