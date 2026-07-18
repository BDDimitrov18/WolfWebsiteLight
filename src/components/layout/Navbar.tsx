"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container } from "@/components/ui/Section";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";

/**
 * Fixed navbar that gets out of the way: slides up while you scroll
 * down, returns the moment you scroll back. An ember hairline along its
 * bottom edge charts overall page progress.
 */
export function Navbar() {
  const t = useT();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Only the home page opens on the night hero; every other route under
  // this navbar starts on paper, where the transparent light-on-dark
  // idle state would be illegible — go solid from scroll 0 there.
  const solid = scrolled || pathname !== "/";
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Solid backdrop once past the fold edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on scroll-down / reveal on scroll-up + progress hairline.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const yTo = gsap.quickTo(header, "yPercent", {
      duration: 0.6,
      ease: "expo.out",
    });

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (!openRef.current) {
        if (goingDown && y > 420) yTo(reduce ? 0 : -110);
        else if (goingUp || y <= 420) yTo(0);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      st.kill();
      gsap.killTweensOf(header);
    };
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The tab row is uniform: every tab navigates to its own page.
  // "Обиколка на софтуера" additionally drops down to its two pages.
  // Документация lives with the actions on the right, styled as a
  // button.
  const links: {
    href: string;
    label: string;
    children?: { href: string; label: string }[];
  }[] = [
    {
      href: "/features",
      label: t("nav.features"),
      children: [
        { href: "/features", label: t("nav.featuresTour") },
        { href: "/module", label: t("nav.module") },
      ],
    },
    { href: "/architecture", label: t("nav.architecture") },
    { href: "/pricing", label: t("nav.pricing") },
  ];

  // The static export serves trailing-slash URLs (/features/).
  const isActive = (href: string) => pathname === href || pathname === `${href}/`;
  const isBranchActive = (l: (typeof links)[number]) =>
    isActive(l.href) || (l.children?.some((c) => isActive(c.href)) ?? false);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 will-change-transform">
      <div
        className="relative border-b backdrop-blur-md transition-colors duration-400"
        style={{
          borderBottomWidth: 1,
          background: solid
            ? "color-mix(in srgb, var(--color-ink-950) 82%, transparent)"
            : "transparent",
          borderColor: solid
            ? "color-mix(in srgb, var(--color-paper-100) 9%, transparent)"
            : "transparent",
        }}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between gap-4">
            <Logo />

            {/* Inline links from lg: at md the Bulgarian labels + CTA
                overflow the 64px bar and wrap — tablets get the burger. */}
            <div className="hidden items-center gap-8 lg:flex">
              {links.map((l) =>
                l.children ? (
                  <div key={l.href} className="group relative">
                    <Link
                      href={l.href}
                      aria-current={isBranchActive(l) ? "page" : undefined}
                      className={`nav-link flex items-center gap-1.5 whitespace-nowrap text-sm transition-colors hover:text-paper-50 ${
                        isBranchActive(l) ? "text-paper-50" : "text-ink-300"
                      }`}
                    >
                      {l.label}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="transition-transform duration-200 group-hover:rotate-180">
                        <path d="m2 3.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    {/* pt-3 bridges the hover gap between tab and panel */}
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div
                        className="min-w-52 rounded-lg border p-1.5 shadow-ambient"
                        style={{
                          background:
                            "color-mix(in srgb, var(--color-ink-950) 96%, transparent)",
                        }}
                      >
                        {l.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            aria-current={isActive(c.href) ? "page" : undefined}
                            className={`block whitespace-nowrap rounded-md px-3.5 py-2.5 text-sm transition-colors hover:bg-ink-800 hover:text-paper-50 ${
                              isActive(c.href) ? "text-paper-50" : "text-ink-300"
                            }`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`nav-link whitespace-nowrap text-sm transition-colors hover:text-paper-50 ${
                      isActive(l.href) ? "text-paper-50" : "text-ink-300"
                    }`}
                  >
                    {l.label}
                  </Link>
                ),
              )}
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Link
                href="/docs"
                className="btn btn-ghost hidden h-9 whitespace-nowrap px-4 py-0 text-sm lg:inline-flex"
              >
                {t("nav.docs")}
              </Link>
              <Link
                href="/demo"
                className="btn btn-primary hidden h-9 whitespace-nowrap px-4 py-0 text-sm sm:inline-flex"
              >
                {t("nav.cta")}
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={t("nav.menu")}
                aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-600 text-paper-100 lg:hidden"
              >
                <Burger open={open} />
              </button>
            </div>
          </nav>
        </Container>

        {/* Page progress hairline */}
        <span ref={progressRef} aria-hidden className="scroll-progress" />
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden"
          style={{
            background: "var(--color-ink-950)",
            borderBottom:
              "1px solid color-mix(in srgb, var(--color-paper-100) 9%, transparent)",
            animation: "reveal-rise 0.3s var(--ease-out-expo) both",
          }}
        >
          <Container>
            <div className="flex flex-col gap-1 py-4">
              {links.map((l) =>
                l.children ? (
                  <div key={l.href}>
                    <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
                      {l.label}
                    </p>
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md py-3 pl-6 pr-3 text-base text-paper-100 transition-colors hover:bg-ink-800"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base text-paper-100 transition-colors hover:bg-ink-800"
                  >
                    {l.label}
                  </Link>
                ),
              )}
              {/* Separate destination, separated visually */}
              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-between rounded-md border border-ink-600 px-3 py-3 text-base text-paper-100 transition-colors hover:bg-ink-800"
              >
                {t("nav.docs")}
                <span aria-hidden className="font-mono text-xs text-ink-300">→</span>
              </Link>
              <div className="mt-3 flex items-center justify-between px-3">
                <LanguageToggle />
                <Link
                  href="/demo"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary h-9 px-4 py-0 text-sm"
                >
                  {t("nav.cta")}
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
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
