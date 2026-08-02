"use client";

import { useEffect, useState } from "react";
import { zollerLaunch, availability } from "@/lib/config";

/* Currently-shipping ticker with a live countdown to the Zoller platform launch.

   Recomputed every 60s per the handoff. The countdown renders as a stable label on
   the server and fills in after mount — a time-dependent string in the SSR output
   would mismatch on hydration. */

function remaining() {
  const ms = new Date(zollerLaunch.iso).getTime() - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 864e5);
  const h = Math.floor((ms % 864e5) / 36e5);
  const m = Math.floor((ms % 36e5) / 6e4);
  return `${d}d ${h}h ${m}m`;
}

export default function ShipTicker() {
  const [countdown, setCountdown] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setCountdown(remaining());
    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);

  const zoller =
    countdown === undefined ? (
      /* Pre-hydration: name the milestone without asserting a duration. */
      <>Zoller platform live {zollerLaunch.label}</>
    ) : countdown === null ? (
      <>Zoller platform — LIVE</>
    ) : (
      <>
        Zoller platform live in <b className="cd">{countdown}</b>
      </>
    );

  const run = (key: string) => (
    <>
      <span key={`${key}-a`}>Now shipping →</span>
      <span key={`${key}-b`}>{zoller}</span>
      <span key={`${key}-c`}>·</span>
      <span key={`${key}-d`}>
        Ehsaan marketplace — <b>in production</b>
      </span>
      <span key={`${key}-e`}>·</span>
      <span key={`${key}-f`}>
        Noted. store — <b>launching</b>
      </span>
      <span key={`${key}-g`}>·</span>
      <span key={`${key}-h`}>
        The Gallery — <b>5.2–6× every campaign</b>
      </span>
      <span key={`${key}-i`}>·</span>
      <span key={`${key}-j`}>
        {availability.quarter} — <b>two client slots open</b>
      </span>
      <span key={`${key}-k`}>·</span>
    </>
  );

  return (
    <div className="shipbar" aria-hidden="true">
      <div>
        {run("one")}
        {run("two")}
      </div>
    </div>
  );
}
