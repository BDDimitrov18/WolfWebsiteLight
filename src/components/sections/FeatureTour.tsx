"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";

interface FeatureItem {
  tag: string;
  title: string;
  body: string;
  bullets: string[];
}

// Each feature → its screenshot slot. Drop <slot>.png into /public/screenshots.
const TOUR: { key: string; slot: string }[] = [
  { key: "orders", slot: "OrdersScreen" },
  { key: "titleChain", slot: "PlotsTab" },
  { key: "calendar", slot: "Callendar" },
  { key: "filters", slot: "FiltersOrders" },
  { key: "reports", slot: "InqueriesTab" },
  { key: "dashboard", slot: "AdminPanel" },
];

export function FeatureTour() {
  const t = useT();

  return (
    <Section id="features">
      <Container>
        <SectionHeading
          eyebrow={t("features.eyebrow")}
          title={t("features.title")}
          subtitle={t("features.subtitle")}
        />

        <div className="mt-16 flex flex-col gap-24 lg:gap-32">
          {TOUR.map((row, i) => {
            const f = t<FeatureItem>(`features.items.${row.key}`);
            const flip = i % 2 === 1;
            return (
              <div
                key={row.key}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Text */}
                <div
                  className={`reveal-css ${flip ? "lg:order-2 lg:pl-6" : "lg:pr-6"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-wider text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">{f.tag}</span>
                  </div>
                  <h3
                    className="mt-4 font-display"
                    style={{ fontSize: "var(--fs-h3)", color: "var(--color-paper-50)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-4 text-pretty leading-relaxed text-ink-300">
                    {f.body}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check />
                        <span className="text-sm text-paper-100/90">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Screenshot */}
                <div className={`reveal-css ${flip ? "lg:order-1" : ""}`}>
                  <ScreenshotFrame
                    slot={row.slot}
                    alt={f.title}
                    title={`Wolf — ${f.tag}`}
                    placeholderNote={t("features.placeholderNote")}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function Check() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
      style={{ background: "color-mix(in srgb, var(--color-ember-500) 18%, transparent)" }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2.5 6.5 5 9l4.5-5.5"
          stroke="var(--color-ember-400)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
