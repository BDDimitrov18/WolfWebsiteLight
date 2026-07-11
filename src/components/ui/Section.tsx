"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DimensionRule } from "@/components/motifs/GeodesyMotifs";

/** Standard horizontal container. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

/** A vertical section with consistent rhythm and optional id anchor. */
export function Section({
  children,
  id,
  className = "",
  hud,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Label shown in the fixed coordinate HUD while this section is in view. */
  hud?: string;
}) {
  return (
    <section
      id={id}
      data-hud={hud}
      className={`relative scroll-mt-24 py-24 sm:py-28 lg:py-36 ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Section header in the drafting grammar: mono label + a dimension
 * rule measured across the full container width — the header row of
 * a survey sheet — then the display heading and lead below.
 */
export function SheetHeader({
  label,
  title,
  subtitle,
  align = "left",
}: {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-5">
          <p className="eyebrow flex-none">{label}</p>
          <DimensionRule
            className="h-3 min-w-0 flex-1"
            style={{
              color:
                "color-mix(in srgb, var(--color-ink-500) 75%, transparent)",
            }}
          />
        </div>
      </Reveal>
      <div className="mt-9">
        <SectionHeading title={title} subtitle={subtitle} align={align} />
      </div>
    </div>
  );
}

/** Section header: mono eyebrow + split-reveal display heading + lead. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  const { locale } = useLocale();
  const headColor = "var(--color-paper-50)";
  const subColor = "color-mix(in srgb, var(--color-paper-100) 70%, transparent)";
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`eyebrow mb-4 flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="inline-block h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
      )}
      <SplitHeading
        key={`sh-${locale}`}
        as="h2"
        mode="scroll"
        className="text-balance"
        style={{ fontSize: "var(--fs-h2)", color: headColor }}
      >
        {title}
      </SplitHeading>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-pretty lead" style={{ color: subColor }}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
