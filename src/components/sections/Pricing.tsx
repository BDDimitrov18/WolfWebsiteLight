"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LocaleProvider";
import { usePref } from "@/lib/prefs";
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
 * hairline-divided columns of one table, with the commercial fine
 * print as numbered footnotes.
 *
 * Personalization: the team-size row above the table moves the red
 * line to the tier that matches the visitor's practice (remembered in
 * localStorage). Untouched, the sheet shows the vendor-recommended
 * tier exactly as before — the default experience never depends on it.
 */
export function Pricing() {
  const t = useT();
  const cards = t<Card[]>("pricing.cards");
  const notes = t<string[]>("pricing.notes");
  const [team, setTeam] = usePref("wolf.team");

  const parsed = team === null ? NaN : Number.parseInt(team, 10);
  const selected =
    Number.isInteger(parsed) && parsed >= 0 && parsed < cards.length
      ? parsed
      : null;
  const highlight =
    selected ?? cards.findIndex((c) => c.featured);

  return (
    <Section id="pricing" hud={t("pricing.eyebrow")} className="register-paper relative overflow-hidden">
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

        {/* Team-size row: measure the practice, the red line follows */}
        <Reveal delay={0.05}>
          <div
            className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-3"
            role="group"
            aria-label={t("pricing.teamPrompt")}
          >
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember-800">
              {t("pricing.teamPrompt")}
            </p>
            <div className="flex flex-wrap gap-2">
              {cards.map((card, i) => {
                const active = selected === i;
                return (
                  <button
                    key={card.name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTeam(active ? null : String(i))}
                    className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                      active
                        ? "border-ember-700 bg-ember-500/10 text-ink-950"
                        : "hover:bg-paper-50"
                    }`}
                    style={
                      active
                        ? undefined
                        : {
                            color:
                              "color-mix(in srgb, var(--color-ink-800) 78%, transparent)",
                          }
                    }
                  >
                    {card.users}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <RevealGroup
          className="mt-8 grid border bg-paper-50/50 shadow-sheet sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.08}
        >
          {cards.map((card, i) => {
            const isHighlight = i === highlight;
            return (
              <RevealItem key={card.name} className="h-full">
                <article
                  className={`relative flex h-full flex-col p-6 transition-colors duration-300 sm:p-7 ${
                    isHighlight ? "bg-ember-500/10" : "hover:bg-paper-50"
                  } ${i === 1 ? "border-t sm:border-t-0" : ""} ${
                    i >= 2 ? "border-t xl:border-t-0" : ""
                  } ${i % 2 === 1 ? "sm:border-l" : ""} ${
                    i === 2 ? "xl:border-l" : ""
                  }`}
                >
                  {isHighlight && (
                    <>
                      {/* the surveyor's red line over the highlighted column */}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-0.5 bg-ember-700"
                      />
                      {selected === null ? (
                        <span className="absolute right-5 top-0 flex h-7 w-7 -translate-y-1/2 items-center justify-center bg-ember-700 font-mono text-[11px] text-paper-50">
                          <span aria-hidden>★</span>
                          <span className="sr-only">{t("pricing.recommended")}</span>
                        </span>
                      ) : (
                        <span className="absolute right-5 top-0 -translate-y-1/2 bg-ember-700 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-50">
                          {t("pricing.matchBadge")}
                        </span>
                      )}
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
                    className={`btn mt-6 w-full ${isHighlight ? "btn-primary" : "btn-ghost"}`}
                  >
                    {card.cta}
                  </Link>
                </article>
              </RevealItem>
            );
          })}
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
