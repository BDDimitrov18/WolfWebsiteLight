"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container } from "@/components/ui/Section";
import { Logo } from "./Logo";
import { CompassRose } from "@/components/motifs/GeodesyMotifs";

export function Footer() {
  const t = useT();
  const year = 2026; // build year (Date.now unavailable at runtime here)

  const cols = [
    {
      title: t("footer.product"),
      links: [
        { href: "/#features", label: t("footer.links.features") },
        { href: "/#architecture", label: t("footer.links.architecture") },
        { href: "/#pricing", label: t("footer.links.pricing") },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { href: "/docs", label: t("footer.links.docs") },
        { href: "/docs", label: t("footer.links.gettingStarted") },
        { href: "/docs/model", label: t("footer.links.model") },
        { href: "/docs/reports", label: t("footer.links.reports") },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { href: "/#contact", label: t("footer.links.demo") },
        { href: "/#contact", label: t("footer.links.contact") },
        { href: "/#contact", label: t("footer.links.privacy") },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-ink-700 bg-ink-950">
      <CompassRose className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 text-ink-500 opacity-30" />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
              {t("footer.tagline")}
            </p>
            <p className="mt-3 font-mono text-xs tracking-wide text-ink-400">
              {t("footer.madeIn")}
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ember-400">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l, i) => (
                  <li key={`${l.href}-${i}`}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-300 transition-colors hover:text-paper-50"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-ink-700 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-400">
            © {year} Wolf. {t("footer.rights")}
          </p>
          <p className="font-mono text-xs tracking-wide text-ink-500">
            {t("footer.version")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
