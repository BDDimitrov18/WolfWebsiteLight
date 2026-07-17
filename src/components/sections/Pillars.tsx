"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { asset } from "@/lib/asset";
import { Container, Section, SheetHeader } from "@/components/ui/Section";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";

interface Problem {
  qLead: string;
  qRest: string;
  aLead: string;
  aRest: string;
}

/**
 * "Какви проблеми решава" in two mirrored halves (layout after the
 * owner's reference, 2026-07-17): the problems list beside the owner's
 * real pre-Wolf desk photo, then the solutions list beside the Wolf
 * Orders screen — the same practice's work, now in the software.
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
          {/* The owner's real desk, pre-Wolf. Faces, screen content and
              document text are blurred in the source file itself. */}
          <figure className="relative overflow-hidden rounded-xl border">
            <img
              src={asset("/photos/desk-before.jpg?v=2")}
              alt={t("pillars.photoAlt")}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
              style={{ objectPosition: "50% 40%" }}
            />
            <figcaption
              className="absolute bottom-2.5 left-2.5 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-wide text-ink-300"
              style={{
                background:
                  "color-mix(in srgb, var(--color-ink-950) 78%, transparent)",
              }}
            >
              {t("pillars.photoNote")}
            </figcaption>
          </figure>
          <div>
            <h3 className="text-xl text-paper-50 sm:text-2xl">
              {t("pillars.problemsTitle")}
            </h3>
            <ul className="mt-7 space-y-5">
              {problems.map((p, i) => (
                <li key={p.qLead} className="flex items-baseline gap-4">
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
                    <strong className="font-semibold text-paper-50">
                      {p.qLead}
                    </strong>
                    {" — "}
                    {p.qRest}
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
                <li key={p.aLead} className="flex items-baseline gap-4">
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
                    <strong className="font-semibold text-paper-50">
                      {p.aLead}
                    </strong>
                    {" — "}
                    {p.aRest}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {/* The same practice's work, now inside Wolf. */}
          <ScreenshotFrame
            slot="OrdersScreen"
            title="Wolf — Поръчки"
            alt={t("pillars.shotAlt")}
          />
        </div>
      </Container>
    </Section>
  );
}
