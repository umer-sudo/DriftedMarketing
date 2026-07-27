import { Schibsted_Grotesk, Instrument_Sans, JetBrains_Mono } from "next/font/google";

/* Self-hosted at build time. The design bundle pulls these from the Google Fonts
   CDN; the handoff asks production to self-host instead. next/font downloads the
   files into the build output and emits the CSS variables that tokens/fonts.css
   points at, so no request leaves the origin at runtime. */

export const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-schibsted",
});

export const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-instrument",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const fontVariables = `${schibsted.variable} ${instrument.variable} ${jetbrains.variable}`;
