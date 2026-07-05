"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { FEATURE_KEYS } from "@/lib/i18n/dictionaries";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { Crosshair } from "@/components/motifs/GeodesyMotifs";

/**
 * The origin story: a slow marquee of the system's modules (every word
 * is a real screen), then the reason Wolf exists — told dry and
 * concrete, because it is the site's only trust device and has to
 * carry the weight testimonials would.
 */
export function Story() {
  const t = useT();
  const modules = FEATURE_KEYS.map((k) => t(`features.items.${k}.tag`));

  return (
    <Section className="border-y border-ink-700 bg-ink-850 py-16 sm:py-20">
      {/* ---- Module marquee ---- */}
      <Marquee className="mb-14 border-b border-ink-700/70 pb-10" duration={38}>
        {modules.map((m) => (
          <span key={m} className="flex items-center">
            <span className="whitespace-nowrap px-6 font-display text-2xl text-paper-100/70 sm:text-3xl">
              {m}
            </span>
            <Crosshair className="h-4 w-4 flex-none text-ember-500/60" />
          </span>
        ))}
      </Marquee>

      <Container>
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
            <p className="mt-6 flex items-baseline gap-3 font-display text-lg italic text-paper-50">
              <span aria-hidden className="h-px w-8 flex-none translate-y-[-0.2em] bg-ember-500" />
              {t("story.closer")}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
