"use server";

import { site } from "@/lib/config";

/* Contact form handler — handoff gap 5.

   There is no backend. The handoff flags this explicitly: "no backend. Needs a real
   handler plus spam protection." Rather than route to the thank-you page and let a
   brief vanish, this validates, then reports honestly that delivery is not wired up
   and points the visitor at the email address, which does work.

   To finish it, replace the marked block with a real transport (a transactional
   email API, a CRM webhook, a database write) and add spam protection — the honeypot
   below stops crawlers but not a targeted script. Turnstile or hCaptcha plus a rate
   limit on the action is the minimum. */

export type BriefResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "not-configured" | "failed"; message: string };

const FORM_ENDPOINT = process.env.CONTACT_FORM_ENDPOINT;

export async function submitBrief(data: FormData): Promise<BriefResult> {
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const company = String(data.get("company") ?? "").trim();
  const need = String(data.get("need") ?? "").trim();
  const number = String(data.get("number") ?? "").trim();
  const date = String(data.get("date") ?? "").trim();
  const honeypot = String(data.get("company_url") ?? "").trim();

  /* Bots fill hidden fields. Report success so they stop retrying, and send nothing. */
  if (honeypot) return { ok: true };

  if (!name || !number || !date || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return {
      ok: false,
      reason: "invalid",
      message: "Something above is missing. Check the name, email, number and date.",
    };
  }

  if (!FORM_ENDPOINT) {
    return {
      ok: false,
      reason: "not-configured",
      message: `The form isn’t connected yet — nothing was sent. Email ${site.email} with the number and the date and it lands in the same place.`,
    };
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, company, need, number, date }),
    });
    if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
    return { ok: true };
  } catch {
    return {
      ok: false,
      reason: "failed",
      message: `That didn’t send. Email ${site.email} with the number and the date and we’ll pick it up there.`,
    };
  }
}
