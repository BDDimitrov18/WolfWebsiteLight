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

        {/* Bold lead + dash + explanation, flowing as one line — the
            benefit-list grammar, without cards or icons. */}
        <ul className="mt-12 max-w-3xl space-y-7">
          {problems.map((p, i) => (
            <li key={p.q} className="flex items-baseline gap-4">
              <span className="flex-none font-mono text-xs text-ember-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="leading-relaxed"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-paper-100) 82%, transparent)",
                }}
              >
                <strong className="font-semibold text-paper-50">{p.q}</strong>
                {" — "}
                {p.a}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
