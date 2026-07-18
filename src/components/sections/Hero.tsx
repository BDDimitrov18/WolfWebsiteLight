"use client";

import { useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container } from "@/components/ui/Section";
import { InquiryModal } from "@/components/ui/InquiryModal";
import { TerrainCanvas } from "@/components/three/TerrainCanvas";
import { ContourLines } from "@/components/motifs/GeodesyMotifs";

/**
 * Hero over the living-survey terrain. All copy renders statically —
 * load animations were removed (owner request, 2026-07-17). Product
 * imagery starts with the film further down; the hero stays pure
 * statement.
 */
export function Hero() {
  const t = useT();
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <section data-hud={t("nav.product")} className="relative overflow-hidden">
      {/* ---- Living survey background ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* SVG contours: also the no-WebGL fallback */}
        <ContourLines className="absolute -top-1/4 left-1/2 h-[140%] w-[140%] -translate-x-1/2 text-ink-500 opacity-30" />
        <TerrainCanvas />
        {/* radial ember glow behind the headline */}
        <div
          className="absolute left-1/2 top-[16%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-ember-600) 22%, transparent), transparent 62%)",
          }}
        />
        {/* seat content on ink */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 via-transparent to-ink-900" />
      </div>

      {/* ---- Viewport plate ---- */}
      <Container className="relative flex min-h-[86svh] flex-col justify-center pb-14 pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <h1
            // The old eyebrow's grammar promoted to the headline: mono,
            // uppercase, tracked. Mono glyphs are a fixed 0.6em advance,
            // so the size cap is solved from the longer line's character
            // count against the max-w-5xl column.
            className="text-balance font-mono uppercase"
            style={{
              fontSize: "clamp(1.6rem, 0.7rem + 2.7vw, 3.1rem)",
              letterSpacing: "0.04em",
              lineHeight: 1.25,
              color: "var(--color-paper-50)",
            }}
          >
            <span className="block">
              {t("hero.titleAPre")}
              <U>{t("hero.titleAMark")}</U>
              {t("hero.titleAPost")}
            </span>
            <span className="block text-ink-300">
              {t("hero.titleBPre")}
              <U>{t("hero.titleBMark")}</U>
              {t("hero.titleBPost")}
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty lead">
            {t("hero.hookA")}{" "}
            <strong className="font-semibold text-paper-50">
              {t("hero.hookB")}
            </strong>
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/demo" className="btn btn-primary w-full sm:w-auto">
              {t("hero.ctaPrimary")}
              <Arrow />
            </Link>
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="btn btn-ghost w-full sm:w-auto"
            >
              {t("hero.ctaSecondary")}
            </button>
          </div>

          {inquiryOpen && <InquiryModal onClose={() => setInquiryOpen(false)} />}
        </div>
      </Container>
    </section>
  );
}

/** Ember underline for the hero's marked phrases. */
function U({
  children,
  thick = "0.06em",
}: {
  children: React.ReactNode;
  thick?: string;
}) {
  return (
    <span
      style={{
        textDecorationLine: "underline",
        textDecorationColor: "var(--color-ember-500)",
        textDecorationThickness: thick,
        textUnderlineOffset: "0.16em",
      }}
    >
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
