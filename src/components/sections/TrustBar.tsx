"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { FEATURE_KEYS } from "@/lib/i18n/dictionaries";
import { Container, Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { Crosshair } from "@/components/motifs/GeodesyMotifs";

interface Stat {
  value: string;
  label: string;
}

/**
 * Field-data strip: a slow marquee of the system's modules (every word
 * is a real screen), then the hard numbers counting themselves up.
 */
export function TrustBar() {
  const t = useT();
  const stats = t<Stat[]>("trust.stats");
  const modules = FEATURE_KEYS.map((k) => t(`features.items.${k}.tag`));

  return (
    <Section className="border-y border-ink-700 bg-ink-850 py-16 sm:py-20" hud="DATA">
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
        <Reveal>
          <p className="max-w-2xl font-display text-balance" style={{ fontSize: "var(--fs-h3)" }}>
            {t("trust.title")}
          </p>
          <p className="mt-3 max-w-xl text-sm text-ink-300">{t("trust.subtitle")}</p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="border-l-2 border-ember-500/70 pl-4">
                <div
                  className="font-display tracking-tight"
                  style={{
                    fontSize: "clamp(2.2rem,1.6rem+2vw,3.2rem)",
                    color: "var(--color-paper-50)",
                  }}
                >
                  <Counter value={s.value} />
                </div>
                <div className="mt-1 text-sm text-ink-300">{s.label}</div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
