"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TriangulationField } from "@/components/motifs/GeodesyMotifs";

interface Layer {
  name: string;
  tech: string;
  body: string;
}

/**
 * System tiers over a coordinate grid; the background triangulation
 * net draws itself stroke-by-stroke, scrubbed to the scroll.
 */
export function Architecture() {
  const t = useT();
  const layers = t<Layer[]>("architecture.layers");
  const bullets = t<string[]>("architecture.bullets");
  const rootRef = useRef<HTMLDivElement>(null);

  // Scrub-draw every stroke of the triangulation motif.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const strokes = Array.from(
        root.querySelectorAll<SVGGeometryElement>(
          "[data-draw] path, [data-draw] line, [data-draw] polyline, [data-draw] circle",
        ),
      ).filter((el) => typeof el.getTotalLength === "function");
      if (!strokes.length) return;

      strokes.forEach((el) => {
        const len = el.getTotalLength();
        if (!len || !isFinite(len)) return;
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
      });
      gsap.to(strokes, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          end: "center 40%",
          scrub: 0.6,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="architecture"
      hud={t("architecture.eyebrow")}
      className="relative overflow-hidden bg-ink-950"
    >
      <div ref={rootRef} className="contents">
        <div aria-hidden className="pointer-events-none absolute inset-0 coord-grid opacity-[0.5]" />
        <div data-draw aria-hidden className="pointer-events-none absolute right-0 top-10 hidden lg:block">
          <TriangulationField className="h-96 w-96 text-ember-500/30" />
        </div>

        <Container className="relative">
          <SectionHeading
            eyebrow={t("architecture.eyebrow")}
            title={t("architecture.title")}
            subtitle={t("architecture.subtitle")}
          />

          <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3" stagger={0.1}>
            {layers.map((layer, i) => (
              <RevealItem key={layer.name}>
                <article
                  className="relative h-full rounded-xl border p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-500/40"
                  style={{
                    borderColor: "color-mix(in srgb, var(--color-paper-100) 12%, transparent)",
                    background: "color-mix(in srgb, var(--color-ink-800) 75%, transparent)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider text-ink-400">
                      TIER {i + 1}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wide text-ember-300"
                      style={{ background: "color-mix(in srgb, var(--color-ember-500) 14%, transparent)" }}
                    >
                      {layer.tech}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl" style={{ color: "var(--color-paper-50)" }}>
                    {layer.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">
                    {layer.body}
                  </p>
                  {i < layers.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t lg:block"
                      style={{
                        borderColor: "color-mix(in srgb, var(--color-ember-400) 60%, transparent)",
                        background: "var(--color-ink-950)",
                      }}
                    />
                  )}
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10" delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2.5 rounded-lg border border-ink-700 px-4 py-3 text-sm text-ink-300 transition-colors duration-300 hover:border-ember-500/40 hover:text-paper-100"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-ember-500" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}
