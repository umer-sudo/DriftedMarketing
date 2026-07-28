/* Delivery for the contact form — handoff gap 5.

   Two transports, tried in order, both configured by environment variable:

     1. RESEND_API_KEY + CONTACT_TO_EMAIL — sends the brief as an email.
     2. CONTACT_FORM_ENDPOINT — POSTs JSON to any webhook (CRM, Zapier, a queue).

   Set neither and delivery reports "not configured", which the form surfaces
   honestly rather than pretending to send. Set both and email wins; the webhook is
   the fallback if the email transport errors, so a CRM copy still lands.

   Adding a third transport means adding a branch here — nothing else changes. */

export type Brief = {
  name: string;
  email: string;
  company: string;
  need: string;
  number: string;
  date: string;
  submittedAt: string;
};

export type DeliveryResult =
  | { status: "sent"; via: "email" | "webhook" }
  | { status: "not-configured" }
  | { status: "failed"; detail: string };

export async function deliverBrief(brief: Brief): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "briefs@driftedmarketing.com";
  const webhook = process.env.CONTACT_FORM_ENDPOINT;

  if (!resendKey && !webhook) return { status: "not-configured" };

  const failures: string[] = [];

  if (resendKey && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${resendKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: brief.email,
          subject: `Brief — ${brief.name}${brief.company ? ` · ${brief.company}` : ""}`,
          text: asPlainText(brief),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) return { status: "sent", via: "email" };
      failures.push(`email ${res.status}`);
    } catch (err) {
      failures.push(`email ${err instanceof Error ? err.name : "error"}`);
    }
  } else if (resendKey && !to) {
    failures.push("RESEND_API_KEY set without CONTACT_TO_EMAIL");
  }

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.CONTACT_FORM_TOKEN
            ? { authorization: `Bearer ${process.env.CONTACT_FORM_TOKEN}` }
            : {}),
        },
        body: JSON.stringify(brief),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) return { status: "sent", via: "webhook" };
      failures.push(`webhook ${res.status}`);
    } catch (err) {
      failures.push(`webhook ${err instanceof Error ? err.name : "error"}`);
    }
  }

  return { status: "failed", detail: failures.join("; ") || "no transport succeeded" };
}

/* Plain text, not HTML. The brief goes to a person, and the point of the page is the
   number and the date — so they lead. */
function asPlainText(b: Brief): string {
  return [
    `The number:  ${b.number}`,
    `The date:    ${b.date}`,
    "",
    `Name:        ${b.name}`,
    `Email:       ${b.email}`,
    `Company:     ${b.company || "—"}`,
    "",
    "What they need:",
    b.need || "—",
    "",
    `Submitted:   ${b.submittedAt}`,
  ].join("\n");
}
