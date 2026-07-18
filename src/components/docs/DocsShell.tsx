"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { Logo } from "@/components/layout/Logo";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { DocsSidebar } from "./DocsSidebar";
import { useT } from "@/lib/i18n/LocaleProvider";
import { track } from "@/lib/track";
import { CONTACT } from "@/lib/contact";

export function DocsShell({ children }: { children: ReactNode }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  // Same tab row as the site navbar — every tab navigates to its own
  // page. Документация is not a tab but the page you're on (the button
  // next to the CTA).
  const links = [
    { href: "/features", label: t("nav.features") },
    { href: "/module", label: t("nav.module") },
    { href: "/architecture", label: t("nav.architecture") },
    { href: "/pricing", label: t("nav.pricing") },
  ];

  return (
    <div className="min-h-screen bg-ink-900">
      {/* Docs header */}
      <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-950/85 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={t("nav.menu")}
                aria-expanded={open}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-600 text-paper-100 lg:hidden"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              </button>
              <Logo />
              <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-ink-300 sm:inline">
                / {t("docs.title")}
              </span>
            </div>
            <div className="hidden items-center gap-8 lg:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-link whitespace-nowrap text-sm text-ink-300 transition-colors hover:text-paper-50"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {/* Checklist item 08: clickable phone in every header */}
              <a
                href={CONTACT.phoneHref}
                onClick={() => track("contact_phone_click", { location: "docs" })}
                className="hidden whitespace-nowrap font-mono text-sm text-ink-300 transition-colors hover:text-paper-50 xl:inline"
              >
                {CONTACT.phoneDisplay}
              </a>
              <LanguageToggle />
              <Link
                href="/docs"
                aria-current="page"
                className="btn btn-ghost hidden h-9 whitespace-nowrap px-4 py-0 text-sm lg:inline-flex"
              >
                {t("nav.docs")}
              </Link>
              <Link
                href="/demo"
                onClick={() => track("cta_demo_click", { location: "docs" })}
                className="btn btn-primary hidden h-9 whitespace-nowrap px-4 py-0 text-sm sm:inline-flex"
              >
                {t("nav.cta")}
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        <div className="flex gap-10 py-12">
          {/* Sidebar — desktop */}
          <aside className="hidden w-56 flex-none lg:block">
            <div className="sticky top-24">
              <DocsSidebar />
            </div>
          </aside>

          {/* Sidebar — mobile drawer */}
          {open && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-ink-950/70"
                onClick={() => setOpen(false)}
                aria-hidden
              />
              <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto border-r border-ink-700 bg-ink-900 p-6 shadow-ambient">
                <div className="mb-6 flex items-center justify-between">
                  <Logo />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t("nav.close")}
                    className="text-ink-300 transition-colors hover:text-paper-50"
                  >
                    ✕
                  </button>
                </div>
                {/* Site tabs first — same set as the homepage navbar */}
                <div className="mb-6 flex flex-col gap-1 border-b pb-6">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-2 text-sm text-ink-300 transition-colors hover:bg-ink-800 hover:text-paper-50"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <DocsSidebar onNavigate={() => setOpen(false)} />
              </div>
            </div>
          )}

          {/* Content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </Container>
    </div>
  );
}
