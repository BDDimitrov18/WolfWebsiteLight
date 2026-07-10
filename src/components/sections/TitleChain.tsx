"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { CornerMarks, IdealPartsGlyph } from "@/components/motifs/GeodesyMotifs";

interface Step {
  label: string;
  value: string;
}

/**
 * The notarial-paper band. The plot→document→owner→PoA chain assembles
 * itself as it scrolls in: the spine grows downward and each link snaps
 * on with its station badge.
 */
export function TitleChain() {
  const t = useT();
  const { locale } = useLocale();
  const steps = t<Step[]>("titleChain.steps");
  const chainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = chainRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-chain-item]", root);
      const badges = gsap.utils.toArray<HTMLElement>("[data-chain-badge]", root);
      const spine = root.querySelector<HTMLElement>("[data-chain-spine]");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
        defaults: { ease: "expo.out" },
      });
      if (spine)
        tl.fromTo(
          spine,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1.4, ease: "power2.inOut" },
          0,
        );
      tl.fromTo(
        items,
        { autoAlpha: 0, x: 36 },
        { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.16 },
        0.1,
      ).fromTo(
        badges,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.7,
          stagger: 0.16,
          ease: "back.out(2.2)",
        },
        0.22,
      );
    }, root);
    return () => ctx.revert();
  }, [locale]);

  return (
    <Section
      id="title-chain"
      hud={t("titleChain.eyebrow")}
      className="register-paper relative overflow-hidden"
      // the deed zone of the sheet: the paper deepens toward paper-200
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 paper-grain"
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--color-paper-200))",
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-current opacity-60" />
              {t("titleChain.eyebrow")}
            </p>
            <SplitHeading
              key={`tc-${locale}`}
              as="h2"
              mode="scroll"
              className="text-balance font-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--color-ink-900)" }}
            >
              {t("titleChain.title")}
            </SplitHeading>
            <Reveal delay={0.1}>
              <p
                className="mt-5 max-w-xl text-pretty leading-relaxed"
                style={{ color: "color-mix(in srgb, var(--color-ink-700) 85%, transparent)" }}
              >
                {t("titleChain.body")}
              </p>
            </Reveal>
          </div>

          {/* Animated ownership chain — the deed card */}
          <div className="relative" ref={chainRef}>
            <div className="relative border bg-paper-50 p-6 shadow-sheet sm:p-8">
              <CornerMarks className="text-ink-700/50" />
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                  {t("titleChain.chainLabel")}
                </span>
                <IdealPartsGlyph className="h-8 w-8 text-ink-700" />
              </div>

              <ol className="relative space-y-3">
                {/* connecting spine */}
                <span
                  aria-hidden
                  data-chain-spine
                  className="absolute left-[1.15rem] top-2 bottom-2 w-px"
                  style={{ background: "color-mix(in srgb, var(--color-ember-600) 50%, transparent)" }}
                />
                {steps.map((s, i) => (
                  <li
                    key={s.label}
                    data-chain-item
                    className="relative flex items-center gap-4 border bg-paper-100 px-4 py-3.5 transition-colors duration-300 hover:border-ember-700/50"
                  >
                    <span
                      data-chain-badge
                      className="relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full font-mono text-sm font-semibold"
                      style={{
                        background: "var(--color-ember-700)",
                        color: "var(--color-paper-50)",
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
