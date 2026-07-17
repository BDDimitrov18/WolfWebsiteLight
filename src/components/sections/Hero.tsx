"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useLocale, useT } from "@/lib/i18n/LocaleProvider";
import { scrollToSection } from "@/lib/sectionScroll";
import { CONTACT } from "@/lib/contact";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { Container } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import { TerrainCanvas } from "@/components/three/TerrainCanvas";
import { ContourLines } from "@/components/motifs/GeodesyMotifs";

/**
 * Full-viewport hero over the living-survey terrain. The headline plots
 * itself in via SplitText once the preloader hands off; supporting copy
 * follows in a staggered rise. Product imagery starts with the film and
 * real screenshots further down — the hero stays pure statement.
 */
export function Hero() {
  const t = useT();
  const { locale } = useLocale();
  const { ready } = useExperience();
  const rootRef = useRef<HTMLElement>(null);

  // ---- Intro choreography (supporting elements) -------------------------
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-intro]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.remove("intro-hide"));
      return;
    }

    const ctx = gsap.context(() => {
      els.forEach((el) => el.classList.remove("intro-hide"));
      gsap.set(els, { autoAlpha: 0, y: 26 });
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.09,
        delay: 0.55,
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={rootRef} data-hud={t("nav.product")} className="relative overflow-hidden">
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
      <Container className="relative flex min-h-[100svh] flex-col justify-center pb-24 pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <SplitHeading
            key={`title-${locale}`}
            as="h1"
            mode="load"
            delay={0.12}
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
          </SplitHeading>

          <p
            data-hero-intro
            className="intro-hide mx-auto mt-7 max-w-2xl text-pretty lead"
          >
            {t("hero.leadPre")}
            <U>{t("hero.leadMark")}</U>
          </p>

          <div
            data-hero-intro
            className="intro-hide mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic className="w-full sm:w-auto">
              <a href={CONTACT.demoHref} className="btn btn-primary w-full sm:w-auto">
                {t("hero.ctaPrimary")}
                <Arrow />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Link
                href="/#film"
                onClick={(e) => scrollToSection(e, "/#film")}
                className="btn btn-ghost w-full sm:w-auto"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </Magnetic>
          </div>
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
