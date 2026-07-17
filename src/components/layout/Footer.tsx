"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/LocaleProvider";
import { CONTACT } from "@/lib/contact";
import { Container } from "@/components/ui/Section";
import { Logo } from "./Logo";
import { CompassRose } from "@/components/motifs/GeodesyMotifs";

const noopSubscribe = () => () => {};

export function Footer() {
  const t = useT();
  // Prerendered HTML carries the build year; the client reads the real
  // year so the static export never goes stale.
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => 2026,
  );

  const cols = [
    {
      title: t("footer.product"),
      links: [
        { href: "/features", label: t("footer.links.features") },
        { href: "/architecture", label: t("footer.links.architecture") },
        { href: "/pricing", label: t("footer.links.pricing") },
        { href: "/#faq", label: t("footer.links.faq") },
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
        { href: CONTACT.demoHref, label: t("footer.links.demo"), external: true },
        { href: CONTACT.phoneHref, label: CONTACT.phoneDisplay, external: true },
        { href: `mailto:${CONTACT.email}`, label: CONTACT.email, external: true },
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
            <p className="mt-3 font-mono text-xs tracking-wide text-ink-300">
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
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        className="text-sm text-ink-300 transition-colors hover:text-paper-50"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-sm text-ink-300 transition-colors hover:text-paper-50"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-ink-700 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-300">
            © {year} Wolf · {t("footer.author")}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-ink-300 underline-offset-4 transition-colors hover:text-paper-50 hover:underline"
            >
              {t("footer.links.privacy")}
            </Link>
            <p className="font-mono text-xs tracking-wide text-ink-300">
              {t("footer.version")}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
