"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LocaleProvider";
import { track } from "@/lib/track";
import { Container } from "@/components/ui/Section";

/**
 * Slim closing strip for the standalone pages: one line, one clear
 * action — so every page ends with a next step instead of dropping
 * straight into the footer.
 */
export function PageCta() {
  const t = useT();

  return (
    <section className="border-t">
      <Container className="flex flex-col items-start justify-between gap-5 py-10 sm:flex-row sm:items-center">
        <p
          className="text-pretty text-lg"
          style={{
            color: "color-mix(in srgb, var(--color-paper-100) 88%, transparent)",
          }}
        >
          {t("pageCta.line")}
        </p>
        <Link
          href="/demo"
          onClick={() => track("cta_demo_click", { location: "page_cta" })}
          className="btn btn-primary flex-none"
        >
          {t("nav.cta")}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </Container>
    </section>
  );
}
