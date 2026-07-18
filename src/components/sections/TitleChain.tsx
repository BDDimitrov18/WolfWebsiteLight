"use client";

import { useT, useLocale } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { CornerMarks } from "@/components/motifs/GeodesyMotifs";
import {
  OwnershipGraph,
  type OwnershipGraphData,
} from "@/components/motifs/OwnershipGraph";

/**
 * The specialized module, stated plainly: Wolf keeps plots, ownership
 * documents, owners and powers of attorney — and the links between them.
 *
 * The claim is carried by the drawing rather than the prose: the graph
 * shows one real-shaped record fanning out through its documents to its
 * owners and their ideal parts.
 */
export function TitleChain() {
  const t = useT();
  const { locale } = useLocale();
  const graph = t<OwnershipGraphData>("titleChain.graph");

  return (
    <Section
      id="title-chain"
      hud={t("titleChain.eyebrow")}
      className="relative overflow-hidden"
    >
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <p className="eyebrow mb-4">{t("titleChain.eyebrow")}</p>
            <SplitHeading
              key={`tc-${locale}`}
              as="h2"
              mode="scroll"
              className="text-balance font-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--color-paper-50)" }}
            >
              {t("titleChain.title")}
            </SplitHeading>
            <Reveal delay={0.1}>
              <p
                className="mt-5 max-w-xl text-pretty leading-relaxed"
                style={{
                  color: "color-mix(in srgb, var(--color-paper-100) 82%, transparent)",
                }}
              >
                {t("titleChain.body")}
              </p>
            </Reveal>
          </div>

          {/* The register, drawn — plot → documents → owners → PoA */}
          <Reveal delay={0.05}>
            <figure>
              {/* the marks frame the drawing only, not the caption under it */}
              <div className="relative">
                <CornerMarks className="text-steel-500/70" inset={-9} />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mm-grid"
                  style={{
                    maskImage:
                      "radial-gradient(80% 70% at 50% 50%, black 0%, transparent 78%)",
                    WebkitMaskImage:
                      "radial-gradient(80% 70% at 50% 50%, black 0%, transparent 78%)",
                  }}
                />
                {/* keyed on locale: the labels are baked into the SVG text */}
                <div className="hidden sm:block">
                  <OwnershipGraph key={`w-${locale}`} data={graph} layout="wide" />
                </div>
                <div className="sm:hidden">
                  <OwnershipGraph key={`t-${locale}`} data={graph} layout="tall" />
                </div>
              </div>
              <figcaption className="mt-5 flex flex-col gap-1 font-mono text-[11px] tracking-wide text-ink-300 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span>{graph.flow}</span>
                <span className="flex-none">{graph.caption}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
