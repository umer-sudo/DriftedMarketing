import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";

/* Two families, self-hosted at build time.

   Schibsted Grotesk is variable 400–900 and now carries both display (900) and body
   (400) — see the note in tokens/fonts.css about why Instrument Sans was dropped.
   Losing the third family also removes a whole font payload from every page. */

export const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-schibsted",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const fontVariables = `${schibsted.variable} ${jetbrains.variable}`;
