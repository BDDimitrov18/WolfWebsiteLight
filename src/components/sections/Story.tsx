"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The origin story: the reason Wolf exists — told dry and concrete,
 * because it is the site's only trust device and has to carry the
 * weight testimonials would.
 *
 * Visually it is the first step down off the hero: the ink lifts a
 * half-stop to ink-850 and the band is closed top and bottom by
 * hairlines — a tonal step, not a change of ground.
 */
export function Story() {
  const t = useT();

  return (
    <Section className="relative overflow-hidden border-y border-ink-700 bg-ink-850 py-20 sm:py-24 lg:py-28">
      {/* Millimeter drafting grid, fading toward the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mm-grid"
        style={{
          // Fades fully before the bottom seam so the grid never
          // hard-stops against the next sheet.
          maskImage:
            "radial-gradient(100% 75% at 85% 0%, black 0%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(100% 75% at 85% 0%, black 0%, transparent 68%)",
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
            <span className="mt-6 block h-0.5 w-14 bg-ember-500" />
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="text-pretty text-lg leading-relaxed"
              style={{
                color:
                  "color-mix(in srgb, var(--color-paper-100) 88%, transparent)",
              }}
            >
              {t("story.body")}
            </p>
            <p className="mt-8 border-t pt-6 font-display text-xl italic text-paper-50">
              {t("story.closer")}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
