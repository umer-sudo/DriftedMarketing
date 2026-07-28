/* Client-side brief submission, for the static build.

   The Server Action in app/contact/actions.ts is the real implementation: it
   rate-limits, verifies Turnstile, validates server-side and delivers through
   Resend or a webhook, all without exposing an endpoint or a key to the browser.
   None of that survives a static export, because there is no server.

   So this is the fallback, and it is genuinely weaker:

     - Validation is client-side only. Anyone can POST whatever they like straight
       at the endpoint.
     - Rate limiting is whatever the form provider gives you, which is usually a
       monthly submission cap rather than a real limit.
     - The endpoint URL ships in the JS bundle. That is inherent to no-backend
       forms; it is why they are all disposable and swappable.

   The honesty contract is unchanged: if no endpoint is configured, this reports
   that nothing was sent rather than routing to the thank-you page on a lie.

   Configure with NEXT_PUBLIC_FORM_ENDPOINT — a Formspree (`https://formspree.io/f/xxx`)
   or Web3Forms URL. Both are free, neither needs a backend, both post JSON. */

import { site } from "./config";

export type ClientResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "failed"; message: string };

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export async function submitBriefClient(data: FormData): Promise<ClientResult> {
  /* Bots fill hidden fields. Report success so they stop retrying, send nothing. */
  if (String(data.get("company_url") ?? "").trim()) return { ok: true };

  if (!ENDPOINT) {
    return {
      ok: false,
      reason: "not-configured",
      message: `The form isn’t connected yet — nothing was sent. Email ${site.email} with the number and the date and it lands in the same place.`,
    };
  }

  const payload = {
    name: String(data.get("name") ?? "").slice(0, 200),
    email: String(data.get("email") ?? "").slice(0, 320),
    company: String(data.get("company") ?? "").slice(0, 200),
    need: String(data.get("need") ?? "").slice(0, 4000),
    number: String(data.get("number") ?? "").slice(0, 200),
    date: String(data.get("date") ?? "").slice(0, 200),
    /* Formspree reads these; Web3Forms ignores them harmlessly. */
    _subject: `Brief — ${String(data.get("name") ?? "")}`,
    _replyto: String(data.get("email") ?? ""),
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
    });
    if (res.ok) return { ok: true };
    return {
      ok: false,
      reason: "failed",
      message: `That didn’t send. Email ${site.email} with the number and the date and we’ll pick it up there.`,
    };
  } catch {
    return {
      ok: false,
      reason: "failed",
      message: `That didn’t send. Email ${site.email} with the number and the date and we’ll pick it up there.`,
    };
  }
}
