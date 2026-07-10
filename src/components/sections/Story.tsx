"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The origin story: the reason Wolf exists — told dry and concrete,
 * because it is the site's only trust device and has to carry the
 * weight testimonials would.
 *
 * Visually this is where the site leaves the night terrain and the
 * drafting sheet begins: the first `.register-paper` band, opened by
 * a thin oxide neatline under the hero.
 */
export function Story() {
  const t = useT();

  return (
    <Section className="register-paper relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Neatline: the sheet's edge under the night view */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "color-mix(in srgb, var(--color-ember-700) 55%, transparent)",
        }}
      />
      {/* Millimeter drafting grid, fading toward the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mm-grid"
        style={{
          maskImage:
            "radial-gradient(120% 100% at 85% 0%, black 0%, transparent 62%)",
          WebkitMaskImage:
            "radial-gradient(120% 100% at 85% 0%, black 0%, transparent 62%)",
        }}
      />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(16rem,2fr)_3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">{t("story.eyebrow")}</p>
            <h2
              className="text-balance font-display"
              style={{ fontSize: "var(--fs-h3)" }}
            >
              {t("story.title")}
            </h2>
            <span className="mt-6 block h-0.5 w-14 bg-ember-700" />
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="text-pretty text-lg leading-relaxed"
              style={{
                color:
                  "color-mix(in srgb, var(--color-ink-800) 92%, transparent)",
              }}
            >
              {t("story.body")}
            </p>
            <p className="mt-8 border-t pt-6 font-display text-xl italic text-ink-900">
              {t("story.closer")}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
