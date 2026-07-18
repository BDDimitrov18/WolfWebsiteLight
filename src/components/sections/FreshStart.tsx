"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { CONTACT } from "@/lib/contact";
import { Container, Section } from "@/components/ui/Section";

/**
 * Pitch to practices that run without any system yet: starting on
 * Wolf from day one skips both the "we manage somehow" period and the
 * old-data migration that late adopters go through. Centered block,
 * one CTA — sits right above the FAQ.
 */
export function FreshStart() {
  const t = useT();
  const muted = "color-mix(in srgb, var(--color-paper-100) 84%, transparent)";

  return (
    <Section id="fresh-start" hud={t("freshStart.eyebrow")} className="relative">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">{t("freshStart.eyebrow")}</p>
          <h2
            className="text-balance uppercase"
            style={{
              fontSize: "var(--fs-h2)",
              letterSpacing: "0.04em",
              color: "var(--color-paper-50)",
            }}
          >
            {t("freshStart.title")}
          </h2>
          <p className="mt-4 text-lg font-semibold text-paper-50">
            {t("freshStart.lead")}
          </p>
          <p className="mt-6 text-pretty leading-relaxed" style={{ color: muted }}>
            {t("freshStart.body1")}
          </p>
          <p className="mt-4 text-pretty leading-relaxed" style={{ color: muted }}>
            {t("freshStart.body2")}
          </p>
          <a href={CONTACT.demoHref} className="btn btn-primary mt-9">
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
          </a>
        </div>
      </Container>
    </Section>
  );
}
