"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitBrief } from "@/app/contact/actions";
import { submitBriefClient } from "@/lib/submit-brief-client";
import Turnstile from "./Turnstile";

/* The static export has no server, so the Server Action cannot run. This picks the
   transport at build time — NEXT_PUBLIC_STATIC is set by `npm run build:static`.
   Both paths return the same shape and both refuse to claim success when nothing
   was actually sent. The Server Action is the better one; see the note in
   lib/submit-brief-client.ts for exactly what the fallback gives up. */
const SUBMIT =
  process.env.NEXT_PUBLIC_STATIC === "1" ? submitBriefClient : submitBrief;

/* The brief form.

   The number and the date are the point of this page, so both are required and the
   copy says why — that is a content decision from the handoff, not a validation
   preference.

   Handoff gap 5 is now wired: `submitBrief` rate-limits, verifies Turnstile when it
   is configured, validates, and delivers by email and/or webhook. With no transport
   configured it still refuses to lie — it reports that nothing was sent and points at
   the email address, rather than routing to the thank-you page on a lie. */

type Errors = Partial<Record<"name" | "email" | "number" | "date", string>>;

type Status = "idle" | "sending" | "unwired" | "error";

/* Draft persistence.

   This form asks for a written brief — the number, the date, what you need. Losing
   that to a mis-click, a back button or an accidental refresh is the worst failure
   this page has, and it is silent: the visitor just sees an empty form and usually
   does not start again.

   sessionStorage, not localStorage, on purpose. The draft should survive a reload
   and a navigation away and back; it should not still be sitting there tomorrow on
   a shared machine. It clears when the tab closes, and explicitly on a successful
   send.

   The honeypot is excluded — restoring a value into it would make a real visitor
   look like a bot to our own spam check. */
const DRAFT_KEY = "drifted-brief-draft";
const HONEYPOT = "company_url";

const readDraft = (): Record<string, string> => {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>)
        .filter(([k, v]) => k !== HONEYPOT && typeof v === "string")
        .map(([k, v]) => [k, v as string]),
    );
  } catch {
    /* Private-mode quota errors and hand-edited junk both land here. A form that
       throws on mount is worse than one that forgets. */
    return {};
  }
};

/* One validator for both blur and submit, so the two can never disagree about
   whether a field is valid — the classic source of "it says it's wrong but it
   submits anyway". */
const RULES: Record<keyof Errors, { label: string; test: (v: string) => boolean; msg: string }> = {
  name: { label: "Name", test: (v) => v.trim().length > 0, msg: "We need a name." },
  email: {
    label: "Email",
    test: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim()),
    msg: "We need a working email.",
  },
  number: {
    label: "The number",
    test: (v) => v.trim().length > 0,
    msg: "The number is the point of the call.",
  },
  date: { label: "The date", test: (v) => v.trim().length > 0, msg: "And the date you need it by." },
};

const validate = (data: FormData): Errors => {
  const out: Errors = {};
  (Object.keys(RULES) as Array<keyof Errors>).forEach((key) => {
    const value = String(data.get(key) ?? "");
    if (!RULES[key].test(value)) out[key] = RULES[key].msg;
  });
  return out;
};

export default function ContactForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  /* Only fields the visitor has already left get validated as they type. Marking a
     field red before they have finished typing in it the first time is hostile. */
  const [touched, setTouched] = useState<Partial<Record<keyof Errors, boolean>>>({});
  const [showTurnstile, setShowTurnstile] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [focusSummary, setFocusSummary] = useState(false);
  /* The summary only appears after a submit attempt. Showing it on the first blur
     inserts a block at the top of the form and pushes everything down — including
     the submit button out from under the pointer, so the click that caused the blur
     lands somewhere else. It's also premature: a summary of what you got wrong
     before you've tried to send is nagging, not help. */
  const [submitted, setSubmitted] = useState(false);
  const [restored, setRestored] = useState(false);

  /* Restore once, after mount — reading storage during render would differ between
     the server and the client and break hydration. */
  useEffect(() => {
    const draft = readDraft();
    const form = formRef.current;
    if (!form || !Object.keys(draft).length) return;
    let filled = 0;
    for (const [name, value] of Object.entries(draft)) {
      const el = form.elements.namedItem(name);
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        el.value = value;
        filled++;
      }
    }
    if (filled) setRestored(true);
  }, []);

  const saveDraft = () => {
    const form = formRef.current;
    if (!form) return;
    try {
      const data = new FormData(form);
      const out: Record<string, string> = {};
      data.forEach((v, k) => {
        if (k !== HONEYPOT && typeof v === "string" && v) out[k] = v;
      });
      if (Object.keys(out).length) sessionStorage.setItem(DRAFT_KEY, JSON.stringify(out));
      else sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* Storage disabled or full. Losing the draft is acceptable; throwing is not. */
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const next = validate(data);
    setErrors(next);
    setSubmitted(true);
    setTouched({ name: true, email: true, number: true, date: true });

    if (Object.keys(next).length) {
      /* Focus moves in an effect, not here: the summary doesn't exist in the DOM
         until React has re-rendered with the new errors, so focusing synchronously
         (or in a rAF, which still beats the commit) lands on nothing. */
      setFocusSummary(true);
      return;
    }

    setStatus("sending");
    setMessage(null);
    const result = await SUBMIT(data);

    if (result.ok) {
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* Nothing to clean up if storage was never available. */
      }
      router.push("/contact/thanks");
      return;
    }

    /* "invalid" only fires if the server disagrees with the client checks above, so
       surface it in the same place as a transport failure rather than silently. */
    setStatus(result.reason === "not-configured" ? "unwired" : "error");
    setMessage(result.message);
  }

  useEffect(() => {
    if (!focusSummary) return;
    summaryRef.current?.focus();
    setFocusSummary(false);
  }, [focusSummary]);

  const revalidate = (key: keyof Errors) => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const value = String(data.get(key) ?? "");
    setErrors((prev) => {
      const nextErrors = { ...prev };
      if (RULES[key].test(value)) delete nextErrors[key];
      else nextErrors[key] = RULES[key].msg;
      return nextErrors;
    });
  };

  const field = (key: keyof Errors) => ({
    id: key,
    onBlur: () => {
      setTouched((t) => ({ ...t, [key]: true }));
      revalidate(key);
    },
    onChange: () => touched[key] && revalidate(key),
    ...(errors[key]
      ? { "aria-invalid": true as const, "aria-describedby": `${key}-error` }
      : {}),
  });

  const errorList = (Object.keys(RULES) as Array<keyof Errors>).filter((k) => errors[k]);

  return (
    <form
      id="brief"
      ref={formRef}
      style={{ marginTop: 22 }}
      onSubmit={onSubmit}
      noValidate
      onFocusCapture={() => setShowTurnstile(true)}
      /* One delegated handler rather than a save in every field's onChange — it
         catches the select and the textarea too, and cannot drift out of sync with
         the field list. */
      onInput={saveDraft}
      onChange={saveDraft}
    >
      {restored && (
        <p className="draftnote" role="status">
          Picked up where you left off. Your answers are kept in this tab only, and
          cleared when you send.
        </p>
      )}
      {submitted && errorList.length > 0 && (
        <div
          className="errsummary"
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="errsummary-title"
        >
          <strong id="errsummary-title">
            {errorList.length === 1 ? "One field needs fixing" : `${errorList.length} fields need fixing`}
          </strong>
          <ul>
            {errorList.map((key) => (
              <li key={key}>
                <a href={`#${key}`}>
                  {RULES[key].label} — {errors[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <label className="fl">
        <span>Name</span>
        <input
          className="ctrl"
          name="name"
          autoComplete="name"
          placeholder="First Last"
          required
          {...field("name")}
        />
        {errors.name && (
          <em id="name-error" className="fielderr">
            {errors.name}
          </em>
        )}
      </label>

      <label className="fl">
        <span>Company</span>
        <input
          className="ctrl"
          name="company"
          autoComplete="organization"
          placeholder="Company name"
        />
      </label>

      <label className="fl">
        <span>Email</span>
        <input
          className="ctrl"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
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

      {showTurnstile && <Turnstile />}

      <button className="btn" type="submit" style={{ marginTop: 8 }} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send it ↗"}
      </button>

      {message && (
        <div
          className={`formnote${status === "unwired" ? " unwired" : " error"}`}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </div>
      )}
    </form>
  );
}
