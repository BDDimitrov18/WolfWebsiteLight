"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { DOC_PAGES } from "@/lib/docs/content";

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { locale, t } = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("docs.title")} className="flex flex-col gap-1">
      <p className="mb-2 px-3 font-mono text-xs uppercase tracking-[0.18em] text-ember-800">
        {t("docs.title")}
      </p>
      {DOC_PAGES.map((page) => {
        const href = page.slug ? `/docs/${page.slug}` : "/docs";
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className="px-3 py-2 text-sm transition-colors"
            style={{
              color: active
                ? "var(--color-ink-950)"
                : "color-mix(in srgb, var(--color-ink-800) 76%, transparent)",
              background: active
                ? "color-mix(in srgb, var(--color-ember-500) 12%, transparent)"
                : "transparent",
              borderLeft: active
                ? "2px solid var(--color-ember-700)"
                : "2px solid color-mix(in srgb, var(--color-ink-700) 18%, transparent)",
            }}
          >
            {page.title[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
