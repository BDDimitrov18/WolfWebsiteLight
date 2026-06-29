"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface Stat {
  value: string;
  label: string;
}

export function TrustBar() {
  const t = useT();
  const stats = t<Stat[]>("trust.stats");

  return (
    <Section className="border-y border-ink-700 bg-ink-850 py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="max-w-2xl font-display text-balance" style={{ fontSize: "var(--fs-h3)" }}>
            {t("trust.title")}
          </p>
          <p className="mt-3 max-w-xl text-sm text-ink-300">
            {t("trust.subtitle")}
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="border-l-2 border-ember-500/70 pl-4">
                <div
                  className="font-display tracking-tight"
                  style={{ fontSize: "clamp(2.2rem,1.6rem+2vw,3.2rem)", color: "var(--color-paper-50)" }}
                >
                  {s.value}
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
