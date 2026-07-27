"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitBrief } from "@/app/contact/actions";

/* The brief form.

   The number and the date are the point of this page, so both are required and the
   copy says why — that is a content decision from the handoff, not a validation
   preference.

   Handoff gap 5: there is no backend. `submitBrief` validates on the server and then
   has nowhere to send the brief; it returns an explicit "not wired" result rather
   than pretending to succeed. Until an endpoint and spam protection exist, the form
   reports that honestly instead of routing to the thank-you page on a lie. */

type Errors = Partial<Record<"name" | "email" | "number" | "date", string>>;

export default function ContactForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "unwired" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const number = String(data.get("number") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();

    if (!name) next.name = "We need a name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "We need a working email.";
    if (!number) next.number = "The number is the point of the call.";
    if (!date) next.date = "And the date you need it by.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const result = await submitBrief(data);

    if (result.ok) {
      router.push("/contact/thanks");
      return;
    }

    setStatus(result.reason === "not-configured" ? "unwired" : "error");
    setMessage(result.message);
  }

  const field = (key: keyof Errors) =>
    errors[key] ? { "aria-invalid": true as const, "aria-describedby": `${key}-error` } : {};

  return (
    <form id="brief" style={{ marginTop: 22 }} onSubmit={onSubmit} noValidate>
      <label className="fl">
        <span>Name</span>
        <input className="ctrl" name="name" placeholder="First Last" required {...field("name")} />
        {errors.name && (
          <em id="name-error" className="fielderr">
            {errors.name}
          </em>
        )}
      </label>

      <label className="fl">
        <span>Company</span>
        <input className="ctrl" name="company" placeholder="Company name" />
      </label>

      <label className="fl">
        <span>Email</span>
        <input
          className="ctrl"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          {...field("email")}
        />
        {errors.email && (
          <em id="email-error" className="fielderr">
            {errors.email}
          </em>
        )}
      </label>

      <label className="fl">
        <span>What you need</span>
        <textarea
          className="ctrl"
          name="need"
          rows={3}
          placeholder="Performance media, creator growth, or an AI product"
        />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label className="fl">
          <span>The number</span>
          <input
            className="ctrl"
            name="number"
            placeholder="4× ROAS, $50k month, 10k users"
            required
            {...field("number")}
          />
          {errors.number && (
            <em id="number-error" className="fielderr">
              {errors.number}
            </em>
          )}
        </label>

        <label className="fl">
          <span>The date</span>
          <input
            className="ctrl"
            name="date"
            placeholder="End of Q4"
            required
            {...field("date")}
          />
          {errors.date && (
            <em id="date-error" className="fielderr">
              {errors.date}
            </em>
          )}
        </label>
      </div>

      <p className="small" style={{ margin: "2px 0 18px", maxWidth: "52ch" }}>
        The number and the date are required. They are the whole agenda for the call — without
        them we can&rsquo;t tell you whether we can hit it.
      </p>

      {/* Honeypot — a bot filling this is discarded server-side. Not a substitute for
          real spam protection; see the note in app/contact/actions.ts. */}
      <div aria-hidden="true" className="hp">
        <label>
          Leave this empty
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="btn" type="submit" style={{ marginTop: 8 }} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send it ↗"}
      </button>

      {message && (
        <div className={`formnote${status === "unwired" ? " unwired" : " error"}`} role="status">
          {message}
        </div>
      )}
    </form>
  );
}
