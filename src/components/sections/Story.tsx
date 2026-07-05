"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContourLines } from "@/components/motifs/GeodesyMotifs";

/**
 * The origin story: the reason Wolf exists — told dry and concrete,
 * because it is the site's only trust device and has to carry the
 * weight testimonials would.
 */
export function Story() {
  const t = useT();

  return (
    <Section className="relative overflow-hidden border-y border-ink-700 bg-ink-850 py-16 sm:py-20">
      {/* Terrain backdrop: the same contour language as the rest of the site */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <ContourLines className="absolute -right-1/4 -top-1/3 h-[170%] w-[85%] text-ink-500 opacity-25" />
        <div
          className="absolute -left-40 bottom-0 h-96 w-[36rem] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--color-ember-600) 14%, transparent), transparent)",
          }}
        />
      </div>
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(16rem,2fr)_3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">{t("story.eyebrow")}</p>
            <h2
              className="text-balance font-display"
              style={{ fontSize: "var(--fs-h3)", color: "var(--color-paper-50)" }}
            >
              {t("story.title")}
            </h2>
            <span className="mt-6 block h-0.5 w-14 bg-ember-500" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-pretty text-lg leading-relaxed text-ink-200">
              {t("story.body")}
            </p>
            <p
              className="mt-8 border-t pt-6 font-display text-xl text-paper-50"
              style={{ borderColor: "color-mix(in srgb, var(--color-ember-500) 35%, transparent)" }}
            >
              {t("story.closer")}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
