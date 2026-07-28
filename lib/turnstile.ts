/* Cloudflare Turnstile verification.

   Turnstile was chosen over reCAPTCHA because it is cookie-free and does not profile
   the visitor, which is the same constraint the brief puts on analytics.

   Entirely optional. With no TURNSTILE_SECRET_KEY set, `verifyTurnstile` reports
   "not configured" and the form falls back to the honeypot plus rate limiting. Set
   both NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY to turn it on; the
   widget then renders and a missing token is rejected server-side. */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult =
  | { status: "not-configured" }
  | { status: "passed" }
  | { status: "failed"; codes: string[] };

export async function verifyTurnstile(token: string | null, ip?: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { status: "not-configured" };

  if (!token) return { status: "failed", codes: ["missing-input-response"] };

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      /* Don't let a slow challenge endpoint hang the submit. */
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success) return { status: "passed" };
    return { status: "failed", codes: data["error-codes"] ?? ["unknown"] };
  } catch {
    return { status: "failed", codes: ["verification-unreachable"] };
  }
}
