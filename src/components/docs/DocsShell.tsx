"use client";

import { useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { Logo } from "@/components/layout/Logo";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { DocsSidebar } from "./DocsSidebar";
import { useT } from "@/lib/i18n/LocaleProvider";

export function DocsShell({ children }: { children: ReactNode }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <div className="register-paper min-h-screen">
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
              <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-ink-400 sm:inline">
                / {t("docs.title")}
              </span>
            </div>
            <LanguageToggle />
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

          {/* Sidebar — mobile drawer (a sheet sliding over the sheet) */}
          {open && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-ink-950/50"
                onClick={() => setOpen(false)}
                aria-hidden
              />
              <div className="register-paper absolute left-0 top-0 h-full w-72 overflow-y-auto border-r bg-paper-50 p-6 shadow-sheet">
                <div className="mb-6 flex items-center justify-between">
                  <Logo tone="dark" />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t("nav.close")}
                    className="text-ink-800 transition-colors hover:text-ink-950"
                  >
                    ✕
                  </button>
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
