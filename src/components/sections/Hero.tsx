"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container } from "@/components/ui/Section";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";
import {
  ContourLines,
  CompassRose,
  Crosshair,
} from "@/components/motifs/GeodesyMotifs";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useT();
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44">
      {/* ---- Background motifs ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* topographic contours, slowly drifting */}
        <ContourLines
          className={`absolute -top-1/4 left-1/2 h-[140%] w-[140%] -translate-x-1/2 text-ink-500 opacity-[0.5] ${
            reduce ? "" : "animate-drift"
          }`}
        />
        {/* radial glow behind the headline */}
        <div
          className="absolute left-1/2 top-[14%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-ember-600) 26%, transparent), transparent 62%)",
          }}
        />
        <CompassRose className="absolute -left-24 top-1/3 hidden h-72 w-72 text-ink-500 opacity-40 lg:block" />
        <Crosshair className="absolute right-10 top-28 hidden h-12 w-12 text-ember-400/40 lg:block" />
        {/* base gradient to seat content on ink */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-900" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            {...rise(0)}
            className="eyebrow mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-2 text-[0.6rem] sm:text-[0.78rem]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember-500" />
            {t("hero.eyebrow")}
            <span className="hidden font-mono text-ink-400 sm:inline">
              · {t("hero.coord")}
            </span>
          </motion.p>

          <h1
            className="text-balance font-display"
            style={{ fontSize: "var(--fs-display)", color: "var(--color-paper-50)" }}
          >
            <motion.span {...rise(0.08)} className="block">
              {t("hero.titleA")}
            </motion.span>
            <motion.span {...rise(0.16)} className="block text-ink-300">
              {t("hero.titleB")}
            </motion.span>
            <motion.span
              {...rise(0.24)}
              className="block italic"
              style={{ color: "var(--color-ember-400)" }}
            >
              {t("hero.titleC")}
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.34)}
            className="mx-auto mt-7 max-w-2xl text-pretty lead"
          >
            {t("hero.lead")}
          </motion.p>

          <motion.div
            {...rise(0.42)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/#contact" className="btn btn-primary w-full sm:w-auto">
              {t("hero.ctaPrimary")}
              <Arrow />
            </Link>
            <Link href="/#features" className="btn btn-ghost w-full sm:w-auto">
              {t("hero.ctaSecondary")}
            </Link>
          </motion.div>

          <motion.p {...rise(0.5)} className="mt-6 text-sm text-ink-400">
            {t("hero.note")}
          </motion.p>
        </div>

        {/* ---- Hero screenshot with floating data chips ---- */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 48, scale: reduce ? 1 : 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: reduce ? 0 : 0.5 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <ScreenshotFrame
            slot="OrdersScreen"
            src="/screenshots/OrdersScreen.png"
            alt={t("features.items.orders.title")}
            title="Wolf — Поръчки"
            priority
            placeholderNote={t("features.placeholderNote")}
          />

          <FloatChip
            className="-left-3 top-10 sm:-left-8"
            label={t("hero.floatA")}
            delay={0.9}
            reduce={!!reduce}
          />
          <FloatChip
            className="-right-3 bottom-10 sm:-right-8"
            label={t("hero.floatB")}
            delay={1.05}
            reduce={!!reduce}
          />
        </motion.div>
      </Container>
    </section>
  );
}

function FloatChip({
  label,
  className = "",
  delay,
  reduce,
}: {
  label: string;
  className?: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0 : delay }}
      className={`absolute hidden items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-md sm:flex ${className}`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-ember-400) 40%, transparent)",
        background: "color-mix(in srgb, var(--color-ink-900) 78%, transparent)",
        boxShadow: "var(--shadow-ambient)",
      }}
    >
      <span className="h-2 w-2 rounded-full bg-ember-500" />
      <span className="font-mono text-xs tracking-wide text-paper-100">
        {label}
      </span>
    </motion.div>
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
