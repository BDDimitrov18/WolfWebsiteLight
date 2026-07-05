"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

interface Item {
  title: string;
  body: string;
}

interface Featured extends Item {
  points: string[];
}

const ICONS = ["sync", "stopwatch", "selfcare", "sheet"] as const;

export function Pillars() {
  const t = useT();
  const items = t<Item[]>("pillars.items");
  const featured = t<Featured>("pillars.featured");

  return (
    <Section id="why" hud={t("pillars.eyebrow")} className="relative overflow-hidden">
      {/* Cadastral graph paper: a faint dot grid fading toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--color-paper-100) 9%, transparent) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 78%)",
        }}
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={t("pillars.eyebrow")}
          title={t("pillars.title")}
          subtitle={t("pillars.subtitle")}
        />

        {/* The headline differentiator: individual work accounting */}
        <RevealGroup className="mt-14">
          <RevealItem>
            <TiltCard>
              <article
                className="group relative overflow-hidden rounded-xl border p-6 transition-colors duration-300 hover:border-ember-500/50 sm:p-8"
                style={{
                  borderColor: "color-mix(in srgb, var(--color-ember-500) 30%, transparent)",
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--color-ember-600) 10%, transparent), color-mix(in srgb, var(--color-ink-800) 60%, transparent) 55%)",
                }}
              >
                <div className="grid gap-6 lg:grid-cols-[3fr_2fr] lg:gap-10">
                  <div>
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-lg text-ember-400 transition-transform duration-500 group-hover:scale-110 group-hover:text-ember-300"
                      style={{ background: "color-mix(in srgb, var(--color-ember-500) 14%, transparent)" }}
                    >
                      <PersonCheckIcon />
                    </span>
                    <h3 className="mt-5 text-xl" style={{ color: "var(--color-paper-50)" }}>
                      {featured.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-300">{featured.body}</p>
                  </div>
                  <ul className="flex flex-col justify-center gap-3 border-t border-ink-700 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    {featured.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-ink-200">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-ember-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </TiltCard>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <RevealItem key={item.title} className="h-full">
              <TiltCard className="h-full">
                <article
                  className="group relative h-full overflow-hidden rounded-xl border p-6 transition-colors duration-300 hover:border-ember-500/40"
                  style={{
                    borderColor: "color-mix(in srgb, var(--color-paper-100) 10%, transparent)",
                    background: "color-mix(in srgb, var(--color-ink-800) 60%, transparent)",
                  }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-lg text-ember-400 transition-transform duration-500 group-hover:scale-110 group-hover:text-ember-300"
                    style={{ background: "color-mix(in srgb, var(--color-ember-500) 14%, transparent)" }}
                  >
                    <PillarIcon name={ICONS[i % ICONS.length]} />
                  </span>
                  <h3 className="mt-5 text-lg" style={{ color: "var(--color-paper-50)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    {item.body}
                  </p>
                </article>
              </TiltCard>
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
