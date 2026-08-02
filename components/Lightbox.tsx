"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CaseImage } from "@/content/cases";

/* Click-to-enlarge for case imagery.

   The receipts grid crops every frame to 4:3 so the row reads as one band, which
   means a portrait launch card or a 1400×2125 reference sheet is showing maybe half
   of itself. That is the right call for the grid and the wrong one for someone who
   actually wants to look at the work, so the frames open.

   Built on <dialog showModal>, which gives the focus trap, the inert background,
   Escape-to-close and the top-layer stacking for free — all of which are fiddly and
   easy to get subtly wrong by hand. */

export default function Lightbox({ images }: { images: CaseImage[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState<number | null>(null);

  const close = useCallback(() => {
    ref.current?.close();
    setI(null);
  }, []);

  const step = useCallback(
    (by: number) => setI((cur) => (cur === null ? cur : (cur + by + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (i !== null && !ref.current?.open) ref.current?.showModal();
  }, [i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (i === null) return;
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [i, step]);

  const current = i === null ? null : images[i]!;

  return (
    <>
      <div className="proofgrid">
        {images.map((img, n) => (
          <figure key={img.src} className="proofshot">
            <button
              type="button"
              className="proofopen"
              onClick={() => setI(n)}
              aria-label={`Enlarge: ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 1000px) 100vw, 33vw"
                loading={n === 0 ? "eager" : "lazy"}
              />
            </button>
            <figcaption className="proofcap">{img.caption}</figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={ref}
        className="lightbox"
        onClose={() => setI(null)}
        /* The backdrop is part of the dialog's own box, so a click that lands on the
           element itself rather than on its contents is a click outside. */
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        {current && (
          <figure>
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
            />
            <figcaption>
              <span className="proofcap">{current.caption}</span>
              {images.length > 1 && (
                <span className="proofcap" aria-live="polite">
                  {i! + 1} / {images.length}
                </span>
              )}
            </figcaption>
          </figure>
        )}
        <button type="button" className="lightclose" onClick={close} aria-label="Close">
          ×
        </button>
        {images.length > 1 && (
          <>
            <button type="button" className="lightnav prev" onClick={() => step(-1)} aria-label="Previous image">
              ←
            </button>
            <button type="button" className="lightnav next" onClick={() => step(1)} aria-label="Next image">
              →
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
