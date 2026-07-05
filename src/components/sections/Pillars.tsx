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

const ICONS = ["sync", "bolt", "window", "sheet"] as const;

export function Pillars() {
  const t = useT();
  const items = t<Item[]>("pillars.items");
  const featured = t<Featured>("pillars.featured");

  return (
    <Section id="why" hud={t("pillars.eyebrow")}>
      <Container>
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
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M3 20c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5" />
      <path d="m15 8.5 2.2 2.2L21.5 6" />
    </svg>
  );
}

function PillarIcon({ name }: { name: (typeof ICONS)[number] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "sync":
      return (
        <svg {...common}>
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5M3 21v-5h5" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      );
    case "window":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M7 6.5h.01" />
        </svg>
      );
    case "sheet":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
  }
}
