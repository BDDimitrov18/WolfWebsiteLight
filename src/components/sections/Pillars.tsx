"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SheetHeader } from "@/components/ui/Section";

interface Problem {
  q: string;
  a: string;
}

/**
 * "Какви проблеми решаваме" — a plain problem → answer ledger.
 * Deliberately editorial: numbered hairline rows, the everyday pain on
 * the left, Wolf's answer on the right. No icon tiles, no cards
 * (owner request, 2026-07-17).
 */
export function Pillars() {
  const t = useT();
  const problems = t<Problem[]>("pillars.problems");

  return (
    <Section id="why" hud={t("pillars.eyebrow")} className="relative overflow-hidden">
      {/* Millimeter grid along the sheet's left margin, fading out well
          before the section seams */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mm-grid"
        style={{
          maskImage:
            "radial-gradient(90% 60% at 0% 30%, black 0%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(90% 60% at 0% 30%, black 0%, transparent 68%)",
        }}
      />
      <Container className="relative">
        <SheetHeader label={t("pillars.eyebrow")} title={t("pillars.title")} />

        <div className="mt-12 max-w-5xl border-t">
          {problems.map((p, i) => (
            <div
              key={p.q}
              className="grid gap-3 border-b py-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
            >
              <div className="flex items-baseline gap-4">
                <span className="flex-none font-mono text-xs text-ember-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg leading-snug text-paper-50">{p.q}</h3>
              </div>
              <p
                className="pl-8 leading-relaxed lg:pl-0"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-paper-100) 82%, transparent)",
                }}
              >
                {p.a}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
