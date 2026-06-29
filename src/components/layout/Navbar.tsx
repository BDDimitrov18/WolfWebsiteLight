"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container } from "@/components/ui/Section";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/#features", label: t("nav.features") },
    { href: "/#architecture", label: t("nav.architecture") },
    { href: "/#pricing", label: t("nav.pricing") },
    { href: "/docs", label: t("nav.docs") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--color-ink-950) 82%, transparent)"
            : "rgba(0,0,0,0)",
          borderColor: scrolled
            ? "color-mix(in srgb, var(--color-paper-100) 9%, transparent)"
            : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4 }}
        className="border-b backdrop-blur-md"
        style={{ borderBottomWidth: 1 }}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between gap-4">
            <Logo />

            <div className="hidden items-center gap-8 md:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-ink-300 transition-colors hover:text-paper-50"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Link
                href="/#contact"
                className="btn btn-primary hidden h-9 px-4 py-0 text-sm sm:inline-flex"
              >
                {t("nav.cta")}
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={t("nav.menu")}
                aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-600 text-paper-100 md:hidden"
              >
                <Burger open={open} />
              </button>
            </div>
          </nav>
        </Container>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
            style={{
              background: "var(--color-ink-950)",
              borderBottom: "1px solid color-mix(in srgb, var(--color-paper-100) 9%, transparent)",
            }}
          >
            <Container>
              <div className="flex flex-col gap-1 py-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base text-paper-100 transition-colors hover:bg-ink-800"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="mt-3 flex items-center justify-between px-3">
                  <LanguageToggle />
                  <Link
                    href="/#contact"
                    onClick={() => setOpen(false)}
                    className="btn btn-primary h-9 px-4 py-0 text-sm"
                  >
                    {t("nav.cta")}
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span
        className="absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300"
        style={{ top: open ? 7 : 2, transform: open ? "rotate(45deg)" : "none" }}
      />
      <span
        className="absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition-all duration-300"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300"
        style={{ top: open ? 7 : 12, transform: open ? "rotate(-45deg)" : "none" }}
      />
    </span>
  );
}
