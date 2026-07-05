import type { Metadata } from "next";
import { IBM_Plex_Sans, Playfair_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { ExperienceProvider } from "@/components/providers/ExperienceProvider";
import { asset } from "@/lib/asset";

// All three families carry Cyrillic so Bulgarian copy renders natively.
// Body sans + mono come from the same superfamily (IBM Plex).
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
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
    default: "Wolf — Софтуер за геодезия, кадастър и правна документация",
    template: "%s · Wolf",
  },
  description:
    "Wolf — многопотребителска система за управление на геодезическа, кадастрална и правна практика. Поръчки, дейности, имоти, документи за собственост, фактури и отчети в реално време.",
  metadataBase: new URL("https://bddimitrov18.github.io"),
  openGraph: {
    title: "Wolf — Software for surveying, cadastre & legal documentation",
    description:
      "One native Windows system for orders, plots, ownership documents, invoicing and real-time reporting.",
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
      className={`${plexSans.variable} ${playfair.variable} ${plexMono.variable} h-full antialiased`}
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
    </html>
  );
}
