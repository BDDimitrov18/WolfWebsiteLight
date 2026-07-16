import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { ExperienceProvider } from "@/components/providers/ExperienceProvider";
import { asset } from "@/lib/asset";
import { GA_ID } from "@/lib/analytics";

// All three families carry Cyrillic so Bulgarian copy renders natively.
// One superfamily (IBM Plex) across sans, serif and mono: the voice of
// engineering documentation — same skeleton in three registers.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wolf — Софтуер за управление на проектантска практика",
    template: "%s · Wolf",
  },
  description:
    "Wolf — многопотребителска система за управление на проектантска практика. Поръчки, дейности, имоти, документи за собственост, фактури и отчети в реално време.",
  metadataBase: new URL("https://bddimitrov18.github.io"),
  openGraph: {
    // Bulgarian: the audience shares links on Facebook/Viber in BG —
    // an English preview card reads as a foreign product.
    title: "Wolf — система за управление на проектантска практика",
    description:
      "Поръчки, имоти, документи за собственост, фактури и справки — в една система, в реално време, за целия екип.",
    type: "website",
    images: [{ url: asset("/og.png"), width: 1200, height: 630, alt: "Wolf" }],
  },
  icons: {
    icon: asset("/favicon.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bg"
      className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full">
        {/* Runs before anything paints: proves JS works so `.intro-hide`
            elements may start hidden (see globals.css — with a failsafe). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");`,
          }}
        />
        {/* Resilience: if JS is disabled, scroll-reveal content (rendered
            with initial opacity:0) must still be visible. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <LocaleProvider>
          <ExperienceProvider>{children}</ExperienceProvider>
        </LocaleProvider>
        <div aria-hidden className="grain-overlay" />
      </body>
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
