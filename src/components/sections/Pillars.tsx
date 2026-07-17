"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SheetHeader } from "@/components/ui/Section";
import { CornerMarks } from "@/components/motifs/GeodesyMotifs";

interface Problem {
  q: string;
  a: string;
}

/**
 * "Какви проблеми решава" in two mirrored halves (layout after the
 * owner's reference, 2026-07-17): the problems list with an image slot
 * on the left, then the solutions list with an image slot on the
 * right. The slots are drafted empty frames awaiting the owner's
 * images — swap the <ImageSlot /> for an <Image /> when they arrive.
 */
export function Pillars() {
  const t = useT();
  const problems = t<Problem[]>("pillars.problems");

  return (
    // pt override: sit tight under the film player.
    <Section id="why" hud={t("pillars.eyebrow")} className="relative overflow-hidden pt-6! lg:pt-8!">
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

        {/* ---- Part 1: the problems — image left, list right ---- */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ImageSlot />
          <div>
            <h3 className="text-xl text-paper-50 sm:text-2xl">
              {t("pillars.problemsTitle")}
            </h3>
            <ul className="mt-7 space-y-5">
              {problems.map((p, i) => (
                <li key={p.q} className="flex items-baseline gap-4">
                  <span className="flex-none font-mono text-xs text-ember-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-semibold leading-relaxed text-paper-50">
                    {p.q}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Part 2: the answers — list left, image right ---- */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-xl text-paper-50 sm:text-2xl">
              {t("pillars.solutionsTitlePre")}
              <span
                style={{
                  textDecorationLine: "underline",
                  textDecorationColor: "var(--color-ember-500)",
                  textDecorationThickness: "0.06em",
                  textUnderlineOffset: "0.16em",
                }}
              >
                {t("pillars.solutionsTitleMark")}
              </span>
            </h3>
            <ul className="mt-7 space-y-5">
              {problems.map((p, i) => (
                <li key={p.q} className="flex items-baseline gap-4">
                  <span className="flex-none font-mono text-xs text-ember-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="leading-relaxed"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-paper-100) 84%, transparent)",
                    }}
                  >
                    {p.a}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <ImageSlot />
        </div>
      </Container>
    </Section>
  );
}

/**
 * Reserved space for the owner's images: a drafted empty frame in the
 * site's survey grammar. Desktop-only until real images land, so
 * mobile doesn't scroll past two empty boxes.
 */
function ImageSlot() {
  return (
    <div
      aria-hidden
      className="relative hidden aspect-[4/3] overflow-hidden rounded-xl border lg:block"
      style={{
        background: "color-mix(in srgb, var(--color-ink-850) 65%, transparent)",
      }}
    >
      <CornerMarks className="text-ink-500" />
      <div
        className="absolute inset-0 mm-grid opacity-40"
        style={{
          maskImage: "radial-gradient(80% 80% at 50% 50%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(80% 80% at 50% 50%, black 0%, transparent 75%)",
        }}
      />
    </div>
  );
}
