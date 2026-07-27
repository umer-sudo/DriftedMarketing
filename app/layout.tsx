import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { PlateDefs } from "@/components/Mark";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chrome from "@/components/Chrome";
import RouteAnnouncer from "@/components/RouteAnnouncer";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Drifted — Look bigger than you are",
    /* Per-route titles from the handoff already carry the suffix. */
    template: "%s",
  },
  description: site.description,
  openGraph: {
    title: "Drifted Marketing — Look bigger than you are",
    description: site.ogDescription,
    type: "website",
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drifted Marketing — Look bigger than you are",
    description: site.ogDescription,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={fontVariables}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <PlateDefs />
        <Nav />
        <main className="page" id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Chrome />
        <RouteAnnouncer />
      </body>
    </html>
  );
}
