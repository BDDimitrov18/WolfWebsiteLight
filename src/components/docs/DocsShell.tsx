"use client";

import { useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { Navbar } from "@/components/layout/Navbar";
import { Logo } from "@/components/layout/Logo";
import { DocsSidebar } from "./DocsSidebar";
import { useT } from "@/lib/i18n/LocaleProvider";

/**
 * Docs chrome. The header is the SAME <Navbar> as every other page —
 * one navigation, zero drift between the site and the documentation
 * (the old docs-only header had its own tab set and kept falling out
 * of sync). Docs-specific chrome lives in a slim strip beneath it:
 * the "/ Документация" location label and, on small screens, the
 * contents-drawer trigger.
 */
export function DocsShell({ children }: { children: ReactNode }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    // pt-16 clears the fixed navbar.
    <div className="min-h-screen bg-ink-900 pt-16">
      <Navbar />

      {/* Docs strip: where you are + the mobile contents trigger */}
      <div className="border-b border-ink-700 bg-ink-950">
        <Container>
          <div className="flex h-11 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-300">
              / {t("docs.title")}
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("nav.menu")}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-300 transition-colors hover:text-paper-50 lg:hidden"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
              {t("nav.menu")}
            </button>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex gap-10 py-12">
          {/* Sidebar — desktop */}
          <aside className="hidden w-56 flex-none lg:block">
            <div className="sticky top-24">
              <DocsSidebar />
            </div>
          </aside>

          {/* Sidebar — mobile drawer (docs contents only: the site
              menu lives in the navbar's own burger) */}
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
