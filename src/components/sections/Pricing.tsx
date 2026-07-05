"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
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
 * Real price list: four tiers by seat count (every tier gets the full
 * product), each with its subscription price and the one-time-license
 * alternative, plus the commercial fine print as a notes strip.
 */
export function Pricing() {
  const t = useT();
  const cards = t<Card[]>("pricing.cards");
  const notes = t<string[]>("pricing.notes");

  return (
    <Section id="pricing" hud={t("pricing.eyebrow")} className="bg-ink-900">
      <Container>
        <SectionHeading
          eyebrow={t("pricing.eyebrow")}
          title={t("pricing.title")}
          subtitle={t("pricing.subtitle")}
          align="center"
        />

        <RevealGroup
          className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.08}
        >
          {cards.map((card) => (
            <RevealItem key={card.name} className="h-full">
              <article
                className="relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-2 hover:border-ember-500/50"
                style={{
                  borderColor: card.featured
                    ? "color-mix(in srgb, var(--color-ember-500) 55%, transparent)"
                    : "color-mix(in srgb, var(--color-paper-100) 12%, transparent)",
                  background: card.featured
                    ? "color-mix(in srgb, var(--color-ember-600) 12%, var(--color-ink-800))"
                    : "color-mix(in srgb, var(--color-ink-800) 65%, transparent)",
                  boxShadow: card.featured ? "var(--shadow-ember)" : "none",
                }}
              >
                {card.featured && (
                  <span
                    className="absolute -top-3 left-6 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
                    style={{ background: "var(--color-ember-500)", color: "var(--color-ink-950)" }}
                  >
                    ★
                  </span>
                )}
                <h3 className="font-display text-2xl" style={{ color: "var(--color-paper-50)" }}>
                  {card.name}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-400">
                  {card.users}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-3xl" style={{ color: "var(--color-ember-400)" }}>
                    {card.price}
                  </span>
                  {card.period && (
                    <span className="text-sm text-ink-400">{card.period}</span>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{card.year}</p>
                <p
                  className="mt-5 flex-1 border-t pt-4 text-sm leading-relaxed text-paper-100/80"
                  style={{ borderColor: "color-mix(in srgb, var(--color-paper-100) 10%, transparent)" }}
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

        {/* Commercial fine print */}
        <Reveal delay={0.15}>
          <ul
            className="mx-auto mt-8 max-w-6xl space-y-2 rounded-xl border px-6 py-5"
            style={{
              borderColor: "color-mix(in srgb, var(--color-paper-100) 8%, transparent)",
              background: "color-mix(in srgb, var(--color-ink-800) 45%, transparent)",
            }}
          >
            {notes.map((n) => (
              <li key={n} className="flex items-start gap-3 text-sm leading-relaxed text-ink-300">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-ember-500/80" />
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
