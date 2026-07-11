"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SheetHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CornerMarks } from "@/components/motifs/GeodesyMotifs";

interface Item {
  title: string;
  body: string;
}

interface Featured extends Item {
  points: string[];
}

const ICONS = ["sync", "stopwatch", "selfcare", "sheet"] as const;

/**
 * Paper register. The featured pillar is the sheet's primary cell —
 * a drafted frame with corner registration marks; the four supporting
 * pillars form one hairline-divided ledger strip rather than four
 * floating cards.
 */
export function Pillars() {
  const t = useT();
  const items = t<Item[]>("pillars.items");
  const featured = t<Featured>("pillars.featured");

  return (
    <Section id="why" hud={t("pillars.eyebrow")} className="register-paper relative overflow-hidden">
      {/* Millimeter grid along the sheet's left margin, fading out well
          before the section seams */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mm-grid"
        style={{
          maskImage:
            "radial-gradient(90% 60% at 0% 30%, black 0%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(90% 60% at 0% 30%, black 0%, transparent 68%)",
        }}
      />
      <Container className="relative">
        <SheetHeader
          label={t("pillars.eyebrow")}
          title={t("pillars.title")}
          subtitle={t("pillars.subtitle")}
        />

        {/* The headline differentiator: individual work accounting */}
        <RevealGroup className="mt-16">
          <RevealItem>
            <article className="group relative border bg-paper-50 p-6 shadow-sheet sm:p-9">
              <CornerMarks className="text-ember-700" />
              <div className="grid gap-6 lg:grid-cols-[3fr_2fr] lg:gap-12">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center border border-ember-700/30 bg-ember-500/10 text-ember-700 transition-transform duration-500 group-hover:scale-110">
                    <PersonCheckIcon />
                  </span>
                  <h3 className="mt-5 text-xl">{featured.title}</h3>
                  <p
                    className="mt-3 leading-relaxed"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink-800) 84%, transparent)",
                    }}
                  >
                    {featured.body}
                  </p>
                </div>
                <ul className="flex flex-col justify-center border-t lg:border-l lg:border-t-0 lg:pl-10">
                  {featured.points.map((point, i) => (
                    <li
                      key={point}
                      className={`flex items-baseline gap-4 py-3.5 text-sm ${
                        i > 0 ? "border-t" : "lg:pt-0"
                      }`}
                      style={{
                        color:
                          "color-mix(in srgb, var(--color-ink-800) 88%, transparent)",
                      }}
                    >
                      <span className="flex-none font-mono text-[0.7rem] text-ember-800">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </RevealItem>
        </RevealGroup>

        {/* Supporting pillars: one ledger strip, hairline-divided */}
        <RevealGroup className="mt-6 grid border-y sm:grid-cols-2 lg:grid-cols-4 lg:border lg:bg-paper-50/40">
          {items.map((item, i) => (
            <RevealItem key={item.title} className="h-full">
              <article
                className={`group h-full p-6 transition-colors duration-300 hover:bg-paper-50 ${
                  i === 1 ? "border-t sm:border-t-0" : ""
                } ${i >= 2 ? "border-t lg:border-t-0" : ""} ${
                  i % 2 === 1 ? "sm:border-l" : ""
                } ${i === 2 ? "lg:border-l" : ""}`}
              >
                <span className="flex h-10 w-10 items-center justify-center text-ember-700 transition-colors duration-300 group-hover:text-ember-600">
                  <PillarIcon name={ICONS[i % ICONS.length]} />
                </span>
                <h3 className="mt-5 text-lg">{item.title}</h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-ink-800) 80%, transparent)",
                  }}
                >
                  {item.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function PersonCheckIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M3 20c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5" />
      <path d="m15 8.5 2.2 2.2L21.5 6" />
    </svg>
  );
}

/**
 * Icons in the site's instrument language: thin strokes, small datum
 * dots and tick details — drawn for these four pillars, not picked
 * from a generic set.
 */
function PillarIcon({ name }: { name: (typeof ICONS)[number] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "sync":
      // two arcs around a shared datum: everyone reads the same point
      return (
        <svg {...common}>
          <path d="M4.5 10.2A8 8 0 0 1 18 6.9" />
          <path d="M18.6 3.4v3.6H15" />
          <path d="M19.5 13.8A8 8 0 0 1 6 17.1" />
          <path d="M5.4 20.6V17H9" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "stopwatch":
      return (
        <svg {...common}>
          <circle cx="12" cy="13.6" r="6.9" />
          <path d="M12 10v3.8l2.9 1.7" />
          <path d="M9.9 2.9h4.2M12 2.9v3.5" />
          <path d="m18.4 6.9 1.4-1.4" />
        </svg>
      );
    case "selfcare":
      // closes its own loop: installs and updates itself
      return (
        <svg {...common}>
          <path d="M19.5 12a7.5 7.5 0 1 1-2.1-5.2" />
          <path d="M19.9 3.6v3.6h-3.6" />
          <path d="m8.9 12.3 2.2 2.2 4-4.4" />
        </svg>
      );
    case "sheet":
      // spreadsheet with a header row, a column and a tiny bar chart
      return (
        <svg {...common}>
          <rect x="4.2" y="3.4" width="15.6" height="17.2" rx="2" />
          <path d="M4.2 8.8h15.6M9.8 8.8v11.8" />
          <path d="M6.6 6.1h4" />
          <path d="M13 17.4v-2.6M16.2 17.4v-5" />
        </svg>
      );
  }
}
