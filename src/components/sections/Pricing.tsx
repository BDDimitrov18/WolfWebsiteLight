"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface Card {
  name: string;
  price: string;
  period: string;
  body: string;
  features: string[];
  cta: string;
  featured: boolean;
}

export function Pricing() {
  const t = useT();
  const cards = t<Card[]>("pricing.cards");

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
          className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-3"
          stagger={0.1}
        >
          {cards.map((card) => (
            <RevealItem key={card.name} className="h-full">
              <article
                className="relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-2 hover:border-ember-500/50"
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
                    className="absolute -top-3 left-7 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
                    style={{ background: "var(--color-ember-500)", color: "var(--color-ink-950)" }}
                  >
                    ★
                  </span>
                )}
                <h3 className="font-display text-2xl" style={{ color: "var(--color-paper-50)" }}>
                  {card.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-3xl" style={{ color: "var(--color-ember-400)" }}>
                    {card.price}
                  </span>
                  {card.period && (
                    <span className="text-sm text-ink-400">{card.period}</span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {card.body}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-paper-100/90">
                      <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden className="mt-0.5 flex-none">
                        <path
                          d="M2.5 6.5 5 9l4.5-5.5"
                          stroke="var(--color-ember-400)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className={`btn mt-7 w-full ${card.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  {card.cta}
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
