"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";

interface PrivacySection {
  h: string;
  ps: string[];
}

/** The privacy policy — plain long-form reading, same instrument styling. */
export function PrivacyArticle() {
  const t = useT();
  const sections = t<PrivacySection[]>("privacyPage.sections");

  return (
    <Section hud={t("privacyPage.title")}>
      <Container>
        <article className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-[0.18em] text-ink-400">
            {t("privacyPage.updated")}
          </p>
          <h1
            className="mt-3 font-display"
            style={{ fontSize: "var(--fs-h2)", color: "var(--color-paper-50)" }}
          >
            {t("privacyPage.title")}
          </h1>
          <p className="mt-6 text-pretty leading-relaxed text-paper-100/90">
            {t("privacyPage.intro")}
          </p>

          {sections.map((s) => (
            <section key={s.h} className="mt-10">
              <h2
                className="font-display text-xl"
                style={{ color: "var(--color-paper-50)" }}
              >
                {s.h}
              </h2>
              {s.ps.map((p) => (
                <p
                  key={p}
                  className="mt-4 text-pretty leading-relaxed"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-paper-100) 82%, transparent)",
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
