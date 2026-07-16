"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useLocale, useT } from "@/lib/i18n/LocaleProvider";
import { scrollToSection } from "@/lib/sectionScroll";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { Container } from "@/components/ui/Section";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import { TerrainCanvas } from "@/components/three/TerrainCanvas";
import type { DocLabel } from "@/components/three/TerrainScene";
import { ContourLines } from "@/components/motifs/GeodesyMotifs";

/**
 * Full-viewport hero over the living-survey terrain. The headline plots
 * itself in via SplitText once the preloader hands off; supporting copy
 * follows in a staggered rise; the product frame parallax-drifts as you
 * scroll into the page.
 */
export function Hero() {
  const t = useT();
  const { locale } = useLocale();
  const { ready } = useExperience();
  const rootRef = useRef<HTMLElement>(null);
  const shotRef = useRef<HTMLDivElement>(null);

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

  // ---- Scroll parallax on the product frame + chip bob -------------------
  useEffect(() => {
    const root = rootRef.current;
    const shot = shotRef.current;
    if (!root || !shot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(shot, {
        y: -64,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-hero-chip]").forEach((chip, i) => {
        gsap.to(chip, {
          y: i % 2 ? 9 : -9,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} data-hud={t("nav.product")} className="relative overflow-hidden">
      {/* ---- Living survey background ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* SVG contours: also the no-WebGL fallback */}
        <ContourLines className="absolute -top-1/4 left-1/2 h-[140%] w-[140%] -translate-x-1/2 text-ink-500 opacity-30" />
        <TerrainCanvas docLabels={t<DocLabel[]>("hero.docChips")} />
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
        <div className="mx-auto max-w-4xl text-center">
          <p
            data-hero-intro
            className="intro-hide eyebrow mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-2 text-[0.6rem] sm:text-[0.78rem]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember-500" />
            {t("hero.eyebrow")}
          </p>

          <SplitHeading
            key={`title-${locale}`}
            as="h1"
            mode="load"
            delay={0.12}
            className="text-balance font-display"
            style={{ fontSize: "var(--fs-display)", color: "var(--color-paper-50)" }}
          >
            <span className="block">{t("hero.titleA")}</span>
            <span className="block text-ink-300">{t("hero.titleB")}</span>
            <span className="block italic" style={{ color: "var(--color-ember-400)" }}>
              {t("hero.titleC")}
            </span>
          </SplitHeading>

          <p
            data-hero-intro
            className="intro-hide mx-auto mt-7 max-w-2xl text-pretty lead"
          >
            {t("hero.lead")}
          </p>

          <div
            data-hero-intro
            className="intro-hide mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic className="w-full sm:w-auto">
              <Link
                href="/#contact"
                onClick={(e) => scrollToSection(e, "/#contact")}
                className="btn btn-primary w-full sm:w-auto"
              >
                {t("hero.ctaPrimary")}
                <Arrow />
              </Link>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Link
                href="/#features"
                onClick={(e) => scrollToSection(e, "/#features")}
                className="btn btn-ghost w-full sm:w-auto"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </Magnetic>
          </div>

          <p data-hero-intro className="intro-hide mt-6 text-sm text-ink-300">
            {t("hero.note")}
          </p>
        </div>
      </Container>

      {/* ---- Product frame with floating data chips ---- */}
      <Container className="relative pb-24">
        <div ref={shotRef} data-hero-intro className="intro-hide relative mx-auto max-w-5xl">
          <ScreenshotFrame
            slot="OrdersScreen"
            src="/screenshots/OrdersScreen.png"
            alt={t("features.items.orders.title")}
            title="Wolf — Поръчки"
            preload
          />
          <Chip data-side="left" className="-left-3 top-10 sm:-left-8" label={t("hero.floatA")} />
          <Chip data-side="right" className="-right-3 bottom-10 sm:-right-8" label={t("hero.floatB")} />
          {/* The product reveal needs a sentence of context */}
          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-ink-300">
            {t("hero.shotCaption")}
          </p>
        </div>
      </Container>
    </section>
  );
}

function Chip({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      data-hero-chip
      className={`absolute hidden items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-md sm:flex ${className}`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-ember-400) 40%, transparent)",
        background: "color-mix(in srgb, var(--color-ink-900) 78%, transparent)",
        boxShadow: "var(--shadow-ambient)",
      }}
    >
      <span className="h-2 w-2 rounded-full bg-ember-500" />
      <span className="font-mono text-xs tracking-wide text-paper-100">{label}</span>
    </div>
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
