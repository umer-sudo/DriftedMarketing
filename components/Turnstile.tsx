"use client";

import { useEffect, useRef } from "react";

/* Cloudflare Turnstile widget.

   Renders nothing unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so the form works
   untouched before spam protection is configured. Turnstile is cookie-free, which
   is the same bar the brief sets for analytics.

   The widget injects a hidden input named `cf-turnstile-response`; the server action
   reads it straight off the FormData. */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export default function Turnstile() {
  const host = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !host.current) return;

    let cancelled = false;

    const mount = () => {
      if (cancelled || !host.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(host.current, {
        sitekey: SITE_KEY,
        theme: "dark",
        appearance: "interaction-only",
      });
    };

    if (window.turnstile) {
      mount();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", mount);
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={host} className="turnstile" />;
}
