import ImageSlot from "./ImageSlot";
import Lightbox from "./Lightbox";
import type { CaseImage } from "@/content/cases";

/* The receipts grid on a case page.

   Where a case has real delivery files, they render here with a caption saying what
   each one is. Where it doesn't, the labelled placeholders stay — the frame is built
   and only the pixels are missing, and saying so is better than filling the hole with
   something that isn't the work.

   Intrinsic width and height come from the asset, not from a guess, so the grid
   reserves the right box before the image arrives and nothing below it jumps. */

const PLACEHOLDERS = [
  "Dashboard or results screenshot",
  "Product or campaign still",
  "Detail — UI, packaging, ad frame",
];

export default function CaseGallery({ images }: { images?: CaseImage[] }) {
  if (!images?.length) {
    return (
      <div className="proofgrid">
        {PLACEHOLDERS.map((p) => (
          <div key={p}>
            <div className="slotframe">
              <ImageSlot placeholder={p} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <Lightbox images={images} />;
}
