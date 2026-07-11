"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";

interface PrivacySection {
  h: string;
  ps: string[];
}

/** The privacy policy — a plain document, set in ink on the sheet. */
export function PrivacyArticle() {
  const t = useT();
  const sections = t<PrivacySection[]>("privacyPage.sections");

  return (
    <Section hud={t("privacyPage.title")} className="register-paper">
      <Container>
        <article className="mx-auto max-w-3xl">
          <p
            className="font-mono text-xs tracking-[0.18em]"
            style={{
              color: "color-mix(in srgb, var(--color-ink-700) 72%, transparent)",
            }}
          >
            {t("privacyPage.updated")}
          </p>
          <h1 className="mt-3 font-display" style={{ fontSize: "var(--fs-h2)" }}>
            {t("privacyPage.title")}
          </h1>
          <p
            className="mt-6 text-pretty leading-relaxed"
            style={{
              color: "color-mix(in srgb, var(--color-ink-800) 90%, transparent)",
            }}
          >
            {t("privacyPage.intro")}
          </p>

          {sections.map((s) => (
            <section key={s.h} className="mt-10">
              <h2 className="font-display text-xl">{s.h}</h2>
              {s.ps.map((p) => (
                <p
                  key={p}
                  className="mt-4 text-pretty leading-relaxed"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-ink-800) 86%, transparent)",
                  }}
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </Container>
    </Section>
  );
}
