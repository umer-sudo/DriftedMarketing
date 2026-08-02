/* Placeholder frame for case imagery.

   Handoff gap 1: no real photography exists yet. The frames, aspect ratios and hover
   behaviour are built and correct — only the pixels are missing. When assets arrive,
   pass `src` and this renders a real next/image; until then it renders the labelled
   placeholder so nobody mistakes an empty frame for a finished one. */

import Image from "next/image";

type Props = {
  /** What belongs here. Shown in the placeholder so the gap is self-documenting. */
  placeholder: string;
  src?: string;
  alt?: string;
  /** Field treatment behind the placeholder — usually the case's `bg`. */
  background?: string;
  priority?: boolean;
  sizes?: string;
};

export default function ImageSlot({
  placeholder,
  src,
  alt,
  background,
  priority,
  sizes = "(max-width: 1000px) 100vw, 50vw",
}: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <div
      className="imageslot"
      data-placeholder
      style={background ? { background } : undefined}
      role="img"
      aria-label={`Image pending: ${placeholder}`}
    >
      <span>{placeholder}</span>
    </div>
  );
}
