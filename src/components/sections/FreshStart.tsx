"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";

/**
 * Pitch to long-running practices (most of the customer base): years
 * of orders and documents living in folders and heads are the reason
 * to start, and rollout help means starting isn't scary. Compact
 * left-aligned block with one clear CTA — sits right above the FAQ.
 */
export function FreshStart() {
  const t = useT();
  const muted = "color-mix(in srgb, var(--color-paper-100) 84%, transparent)";

  return (
    // py override: this is a short pitch, not a full-height section.
    <Section id="fresh-start" hud={t("freshStart.eyebrow")} className="relative py-8! lg:py-12!">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">{t("freshStart.eyebrow")}</p>
          <h2
            className="text-balance text-xl uppercase sm:text-2xl"
            style={{ letterSpacing: "0.04em", color: "var(--color-paper-50)" }}
          >
            {t("freshStart.title")}
          </h2>
          <p className="mt-3 font-semibold text-paper-50">{t("freshStart.lead")}</p>
          <p className="mt-4 text-pretty leading-relaxed" style={{ color: muted }}>
            {t("freshStart.body1")}
          </p>
          <p className="mt-3 text-pretty leading-relaxed" style={{ color: muted }}>
            {t("freshStart.body2")}
          </p>
          <Link href="/demo" className="btn btn-primary mt-7">
            {t("freshStart.cta")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
