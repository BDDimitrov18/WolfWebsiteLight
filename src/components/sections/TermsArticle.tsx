"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";

interface TermsSection {
  h: string;
  ps: string[];
}

/** The terms of use — a plain document, mirroring the privacy page. */
export function TermsArticle() {
  const t = useT();
  const sections = t<TermsSection[]>("termsPage.sections");

  return (
    <Section hud={t("termsPage.title")}>
      <Container>
        <article className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-[0.18em] text-ink-300">
            {t("termsPage.updated")}
          </p>
          <h1 className="mt-3 font-display" style={{ fontSize: "var(--fs-h2)" }}>
            {t("termsPage.title")}
          </h1>
          <p
            className="mt-6 text-pretty leading-relaxed"
            style={{
              color: "color-mix(in srgb, var(--color-paper-100) 90%, transparent)",
            }}
          >
            {t("termsPage.intro")}
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
                      "color-mix(in srgb, var(--color-paper-100) 86%, transparent)",
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
