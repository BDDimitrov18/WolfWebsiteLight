"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { track } from "@/lib/track";
import { Container, Section, SheetHeader } from "@/components/ui/Section";

interface FaqItem {
  q: string;
  a: string;
}

/**
 * Buyer FAQ — native <details> rows, zero JS: accessible, printable,
 * and every answer stays findable by in-page search engines.
 */
export function Faq() {
  const t = useT();
  const items = t<FaqItem[]>("faq.items");

  return (
    <Section id="faq" hud={t("faq.eyebrow")} className="relative bg-ink-950">
      <Container>
        <SheetHeader label={t("faq.eyebrow")} title={t("faq.title")} />

        {/* Two columns on desktop + tight rows: 8 questions in half the
            scroll height of the old single column. */}
        <div className="mt-8 grid border-t lg:grid-cols-2 lg:gap-x-14">
          {items.map((item, i) => (
            <details
              key={item.q}
              className="group border-b"
              onToggle={(e) => {
                if (e.currentTarget.open)
                  track("faq_open", { question: `${i + 1}. ${item.q}`.slice(0, 100) });
              }}
            >
              <summary className="flex cursor-pointer list-none items-baseline gap-3.5 py-3.5 pr-2 [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-xs tracking-wider text-ember-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-base leading-snug text-paper-50">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="flex-none font-mono text-base text-ink-300 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p
                className="pb-5 pl-8 pr-6 text-sm leading-relaxed"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-paper-100) 84%, transparent)",
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
