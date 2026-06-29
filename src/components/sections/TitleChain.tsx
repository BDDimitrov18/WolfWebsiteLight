"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IdealPartsGlyph } from "@/components/motifs/GeodesyMotifs";

interface Step {
  label: string;
  value: string;
}

export function TitleChain() {
  const t = useT();
  const steps = t<Step[]>("titleChain.steps");

  return (
    <Section
      id="title-chain"
      className="paper-grain text-ink-900"
      // light "paper" band — a notarial-deed contrast to the dark sections
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--color-paper-100), var(--color-paper-200))",
        }}
      />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-3 text-ember-600">
              <span className="inline-block h-px w-8 bg-current opacity-60" />
              {t("titleChain.eyebrow")}
            </p>
            <Reveal>
              <h2
                className="text-balance font-display"
                style={{ fontSize: "var(--fs-h2)", color: "var(--color-ink-900)" }}
              >
                {t("titleChain.title")}
              </h2>
              <p
                className="mt-5 max-w-xl text-pretty leading-relaxed"
                style={{ color: "color-mix(in srgb, var(--color-ink-700) 85%, transparent)" }}
              >
                {t("titleChain.body")}
              </p>
            </Reveal>
          </div>

          {/* Animated ownership chain */}
          <div className="relative">
            <div
              className="rounded-2xl border bg-paper-50 p-6 sm:p-8"
              style={{
                borderColor: "color-mix(in srgb, var(--color-ink-700) 14%, transparent)",
                boxShadow: "0 30px 60px -36px rgba(20,28,43,0.35)",
              }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                  plot ↔ document ↔ owner ↔ PoA
                </span>
                <IdealPartsGlyph className="h-8 w-8 text-ink-700" />
              </div>

              <ol className="relative space-y-3">
                {/* connecting spine */}
                <span
                  aria-hidden
                  className="absolute left-[1.15rem] top-2 bottom-2 w-px"
                  style={{ background: "color-mix(in srgb, var(--color-ember-500) 45%, transparent)" }}
                />
                {steps.map((s, i) => (
                  <li
                    key={s.label}
                    className="reveal-css relative flex items-center gap-4 rounded-xl border bg-paper-100 px-4 py-3.5"
                    style={{ borderColor: "color-mix(in srgb, var(--color-ink-700) 12%, transparent)" }}
                  >
                    <span
                      className="relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full font-mono text-sm font-semibold"
                      style={{
                        background: "var(--color-ember-500)",
                        color: "var(--color-ink-950)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink-900">
                        {s.label}
                      </span>
                      <span className="block font-mono text-xs text-ink-500">
                        {s.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
