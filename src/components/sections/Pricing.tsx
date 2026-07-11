"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SheetHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface Card {
  name: string;
  users: string;
  price: string;
  period: string;
  year: string;
  perpetual: string;
  cta: string;
  featured: boolean;
}

/**
 * The tariff sheet: real prices set in ink on paper, four tiers as
 * hairline-divided columns of one table rather than four floating
 * cards, with the commercial fine print as numbered footnotes.
 */
export function Pricing() {
  const t = useT();
  const cards = t<Card[]>("pricing.cards");
  const notes = t<string[]>("pricing.notes");

  return (
    <Section id="pricing" hud={t("pricing.eyebrow")} className="register-paper relative overflow-hidden">
      {/* Neatline: returning to the sheet after the dark interlude */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "color-mix(in srgb, var(--color-ember-700) 55%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mm-grid"
        style={{
          maskImage:
            "radial-gradient(110% 90% at 100% 0%, black 0%, transparent 55%)",
          WebkitMaskImage:
            "radial-gradient(110% 90% at 100% 0%, black 0%, transparent 55%)",
        }}
      />
      <Container className="relative">
        <SheetHeader
          label={t("pricing.eyebrow")}
          title={t("pricing.title")}
          subtitle={t("pricing.subtitle")}
        />

        <RevealGroup
          className="mt-16 grid border bg-paper-50/50 shadow-sheet sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.08}
        >
          {cards.map((card, i) => (
            <RevealItem key={card.name} className="h-full">
              <article
                className={`relative flex h-full flex-col p-6 transition-colors duration-300 sm:p-7 ${
                  card.featured
                    ? "bg-ember-500/10"
                    : "hover:bg-paper-50"
                } ${i === 1 ? "border-t sm:border-t-0" : ""} ${
                  i >= 2 ? "border-t xl:border-t-0" : ""
                } ${i % 2 === 1 ? "sm:border-l" : ""} ${
                  i === 2 ? "xl:border-l" : ""
                }`}
              >
                {card.featured && (
                  <>
                    {/* the surveyor's red line over the recommended column */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-0.5 bg-ember-700"
                    />
                    <span className="absolute right-5 top-0 flex h-7 w-7 -translate-y-1/2 items-center justify-center bg-ember-700 font-mono text-[11px] text-paper-50">
                      <span aria-hidden>★</span>
                      <span className="sr-only">{t("pricing.recommended")}</span>
                    </span>
                  </>
                )}
                <h3 className="font-display text-2xl">{card.name}</h3>
                <p
                  className="mt-1 font-mono text-xs uppercase tracking-[0.14em]"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-ink-700) 75%, transparent)",
                  }}
                >
                  {card.users}
                </p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl text-ember-800">
                    {card.price}
                  </span>
                  {card.period && (
                    <span
                      className="text-sm"
                      style={{
                        color:
                          "color-mix(in srgb, var(--color-ink-700) 75%, transparent)",
                      }}
                    >
                      {card.period}
                    </span>
                  )}
                </div>
                <p
                  className="mt-1.5 text-sm leading-relaxed"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-ink-800) 78%, transparent)",
                  }}
                >
                  {card.year}
                </p>
                <p
                  className="mt-5 flex-1 border-t pt-4 text-sm leading-relaxed"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-ink-800) 84%, transparent)",
                  }}
                >
                  {card.perpetual}
                </p>
                <Link
                  href="/#contact"
                  className={`btn mt-6 w-full ${card.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  {card.cta}
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Commercial fine print — the sheet's footnotes */}
        <Reveal delay={0.15}>
          <ol className="mt-10 max-w-4xl space-y-2 border-t pt-6">
            {notes.map((n, i) => (
              <li
                key={n}
                className="flex items-baseline gap-4 text-sm leading-relaxed"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-ink-800) 80%, transparent)",
                }}
              >
                <span className="flex-none font-mono text-[0.7rem] text-ember-800">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {n}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
