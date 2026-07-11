"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SheetHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TriangulationField } from "@/components/motifs/GeodesyMotifs";

interface Layer {
  name: string;
  tech: string;
  body: string;
}

/**
 * The blueprint. System tiers drawn as one hairline-divided strip on
 * the sheet — workstation → server → database — joined by survey
 * markers on the shared dividers; the background triangulation net
 * draws itself stroke-by-stroke in ink, scrubbed to the scroll.
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
      className="register-paper relative overflow-hidden"
    >
      <div ref={rootRef} className="contents">
        <div data-draw aria-hidden className="pointer-events-none absolute right-0 top-10 hidden lg:block">
          <TriangulationField className="h-96 w-96 text-ink-700/45" />
        </div>

        <Container className="relative">
          <SheetHeader
            label={t("architecture.eyebrow")}
            title={t("architecture.title")}
            subtitle={t("architecture.subtitle")}
          />

          <RevealGroup
            className="mt-16 grid border bg-paper-50/40 lg:grid-cols-3"
            stagger={0.1}
          >
            {layers.map((layer, i) => (
              <RevealItem key={layer.name} className="h-full">
                <article
                  className={`relative h-full p-6 transition-colors duration-300 hover:bg-paper-50 sm:p-7 ${
                    i > 0 ? "border-t lg:border-l lg:border-t-0" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs tracking-wider text-ember-800">
                      0{i + 1}
                    </span>
                    <span className="border border-ember-700/30 bg-ember-500/10 px-2.5 py-1 font-mono text-[11px] tracking-wide text-ember-800">
                      {layer.tech}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl">{layer.name}</h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink-800) 82%, transparent)",
                    }}
                  >
                    {layer.body}
                  </p>
                  {i < layers.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -right-[4.5px] top-1/2 z-10 hidden h-2 w-2 -translate-y-1/2 rotate-45 border border-ember-700 bg-paper-100 lg:block"
                    />
                  )}
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10" delay={0.1}>
            <ul className="grid border-t sm:grid-cols-3">
              {bullets.map((b, i) => (
                <li
                  key={b}
                  className={`flex items-center gap-3 py-3.5 text-sm sm:pr-6 ${
                    i > 0 ? "border-t sm:border-t-0 sm:border-l sm:pl-6" : ""
                  }`}
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-ink-800) 86%, transparent)",
                  }}
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-ember-700" />
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
