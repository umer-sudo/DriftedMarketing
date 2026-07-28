"use client";

import { useEffect } from "react";

/* Route error boundary. Same voice as the 404: state what happened, don't apologise
   in brand-banned language, give the reader the next action. */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="wrap" style={{ paddingBlock: "clamp(56px,9vw,140px)", minHeight: "70vh" }}>
      <div className="eye">Error</div>
      <h1 className="disp" style={{ fontSize: "clamp(40px,7.6vw,124px)", marginTop: 20 }}>
        That broke
        <br />
        on our side.
      </h1>
      <p className="body" style={{ maxWidth: "48ch", marginTop: 24, fontSize: 19 }}>
        Not your fault, and not something you can fix by reloading twice. Try again — if it
        keeps happening, tell us and we&rsquo;ll go and look.
      </p>
      <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
        <button className="btn" onClick={reset}>
          Try again
        </button>
        <a className="btn sec" href="/">
          Back to home
        </a>
      </div>
      {error.digest && (
        <p className="eye mut" style={{ marginTop: 26 }}>
          Reference {error.digest}
        </p>
      )}
    </section>
  );
}
