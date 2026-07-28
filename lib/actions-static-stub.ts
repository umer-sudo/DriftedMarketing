/* Build-time stand-in for app/contact/actions.ts in the static export.

   A module marked "use server" fails the export even if it is only imported and
   never called, so the ternary in ContactForm wasn't enough — the import itself
   had to go. next.config.ts aliases the actions module to this file when STATIC=1,
   which keeps ContactForm's import untouched and its types intact (TypeScript
   still resolves the real module; the alias only affects bundling). */

export { submitBriefClient as submitBrief } from "./submit-brief-client";
export type { ClientResult as BriefResult } from "./submit-brief-client";
