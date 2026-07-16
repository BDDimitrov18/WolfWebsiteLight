"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
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

        <div className="mt-10 max-w-3xl border-t">
          {items.map((item, i) => (
            <details key={item.q} className="group border-b">
              <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 pr-2 [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-xs tracking-wider text-ember-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-lg leading-snug text-paper-50">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="flex-none font-mono text-lg text-ink-300 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p
                className="pb-6 pl-9 pr-8 leading-relaxed"
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
