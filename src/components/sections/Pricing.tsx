"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { CONTACT } from "@/lib/contact";
import { dictionaries } from "@/lib/i18n/dictionaries";
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
 * The tariff sheet: four tiers as hairline-divided columns of one
 * table, with the commercial fine print as numbered footnotes.
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

  // The preference stores the tier NAME, not an array index — a future
  // reorder or insert in the price list must never silently point a
  // returning visitor's badge at the wrong tier. Names are looked up
  // across both locales (the top tier is „Предприятие“/"Enterprise").
  const tierIndex = (name: string | null): number | null => {
    if (!name) return null;
    for (const loc of ["bg", "en"] as const) {
      const i = dictionaries[loc].pricing.cards.findIndex(
        (c) => c.name === name,
      );
      if (i !== -1 && i < cards.length) return i;
    }
    return null;
  };
  const selected = tierIndex(team);
  const highlight = selected ?? cards.findIndex((c) => c.featured);

  return (
    <Section id="pricing" hud={t("pricing.eyebrow")} className="relative overflow-hidden bg-ink-900">
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
            aria-labelledby="pricing-team-prompt"
          >
            <p
              id="pricing-team-prompt"
              className="font-mono text-xs uppercase tracking-[0.16em] text-ember-400"
            >
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
                    onClick={() => setTeam(active ? null : card.name)}
                    className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                      active
                        ? "border-ember-500 bg-ember-500/15 text-ember-200"
                        : "text-ink-300 hover:bg-ink-850 hover:text-paper-100"
                    }`}
                  >
                    {card.users}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <RevealGroup
          className="mt-8 grid border bg-ink-850/50 shadow-ambient sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.08}
        >
          {cards.map((card, i) => {
            const isHighlight = i === highlight;
            return (
              <RevealItem key={card.name} className="h-full">
                <article
                  className={`relative flex h-full flex-col p-6 transition-colors duration-300 sm:p-7 ${
                    isHighlight ? "bg-ember-500/10" : "hover:bg-ink-850"
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
                        className="absolute inset-x-0 top-0 h-0.5 bg-ember-500"
                      />
                      {selected === null ? (
                        <span className="absolute right-5 top-0 flex h-7 w-7 -translate-y-1/2 items-center justify-center bg-ember-500 font-mono text-[11px] text-ink-950">
                          <span aria-hidden>★</span>
                          <span className="sr-only">{t("pricing.recommended")}</span>
                        </span>
                      ) : (
                        <span className="absolute right-5 top-0 -translate-y-1/2 bg-ember-500 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-950">
                          {t("pricing.matchBadge")}
                        </span>
                      )}
                    </>
                  )}
                  <h3 className="font-display text-2xl">{card.name}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-300">
                    {card.users}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl text-ember-400">
                      {card.price}
                    </span>
                    {card.period && (
                      <span className="text-sm text-ink-300">{card.period}</span>
                    )}
                  </div>
                  <p
                    className="mt-1.5 text-sm leading-relaxed"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-paper-100) 78%, transparent)",
                    }}
                  >
                    {card.year}
                  </p>
                  <p
                    className="mt-5 flex-1 border-t pt-4 text-sm leading-relaxed"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-paper-100) 84%, transparent)",
                    }}
                  >
                    {card.perpetual}
                  </p>
                  <a
                    href={CONTACT.demoHref}
                    className={`btn mt-6 w-full ${isHighlight ? "btn-primary" : "btn-ghost"}`}
                  >
                    {card.cta}
                  </a>
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
                    "color-mix(in srgb, var(--color-paper-100) 80%, transparent)",
                }}
              >
                <span className="flex-none font-mono text-[0.7rem] text-ember-400">
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
