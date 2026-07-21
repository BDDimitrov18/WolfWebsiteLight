"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLocale, useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SheetHeader } from "@/components/ui/Section";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";
import { ScreenshotCarousel } from "@/components/ui/ScreenshotCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { CornerMarks } from "@/components/motifs/GeodesyMotifs";

// Station copy is deliberately SHORT (owner request, 2026-07-21:
// "return the text but shorten the long texts") — keep bodies to
// 1–2 sentences when editing the dictionaries.
interface FeatureItem {
  tag: string;
  title: string;
  body: string;
  bullets: string[];
}

// Each feature → its screenshot slot: <slot>.webp in /public/screenshots.
// `pages` turns the stop into a carousel — labels come from features.<pagesKey>.
const TOUR: { key: string; slot: string; pages?: string[]; pagesKey?: string }[] = [
  { key: "orders", slot: "OrdersScreen" },
  { key: "titleChain", slot: "PlotsAndDocsInOrderTab" },
  { key: "invoicing", slot: "InvoiceDraft" },
  { key: "templates", slot: "TemplateBuilder" },
  { key: "calendar", slot: "Calendar" },
  { key: "filters", slot: "FiltersOrders" },
  { key: "reports", slot: "InqueriesTab" },
  {
    key: "dashboard",
    slot: "AdminBoard",
    pages: ["AdminBoard", "AdminBoardFinance", "AdminBoardTeam"],
    pagesKey: "boardPages",
  },
  {
    // mirrors the app's Администрация tabs, like the Табло carousel
    key: "permissions",
    slot: "Administration",
    pages: ["Administration", "AuditLog", "CompanyProfile"],
    pagesKey: "adminPages",
  },
];

/**
 * The survey walk. On desktop the app's screens sit like plates pinned
 * inside a sticky frame with corner registration marks; the stations on
 * the left hang off a vertical traverse line, and scrolling crossfades
 * the matching screen and advances the "02 / 08" counter. On touch/small
 * screens it falls back to a clean stacked tour.
 */
export function FeatureTour() {
  const t = useT();
  const { locale } = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const flashRef = useRef<HTMLSpanElement>(null);

  // Station navigation: scroll so the chosen block's centre sits on
  // the 55% activation line the ScrollTriggers watch.
  const jumpTo = (i: number) => {
    const root = rootRef.current;
    if (!root) return;
    const block = root.querySelectorAll<HTMLElement>("[data-tour-block]")[i];
    if (!block) return;
    const r = block.getBoundingClientRect();
    const top = window.scrollY + r.top + r.height / 2 - window.innerHeight * 0.55;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dur = reduce ? 0 : 0.6;
      const blocks = gsap.utils.toArray<HTMLElement>("[data-tour-block]", root);
      const frames = gsap.utils.toArray<HTMLElement>("[data-tour-img]", root);
      const navBtns = gsap.utils.toArray<HTMLElement>("[data-tour-nav]", root);
      if (!blocks.length || !frames.length) return;

      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(frames[0], { autoAlpha: 1 });

      let active = 0;
      const activate = (i: number) => {
        if (i === active) return;
        // Review feedback: the old quiet crossfade read as a static
        // image. The plate change is now a directional slide with an
        // ember registration flash and a ticking counter.
        const dirIn = i > active ? 44 : -44;
        active = i;
        frames.forEach((f, j) => {
          if (j === i) {
            gsap.fromTo(
              f,
              { autoAlpha: 0, y: dirIn, scale: 0.98 },
              { autoAlpha: 1, y: 0, scale: 1, duration: dur, ease: "power3.out", overwrite: true },
            );
          } else {
            gsap.to(f, {
              autoAlpha: 0,
              y: -dirIn * 0.5,
              duration: dur * 0.6,
              ease: "power2.in",
              overwrite: true,
            });
          }
        });
        if (!reduce && flashRef.current)
          gsap.fromTo(
            flashRef.current,
            { opacity: 0.8 },
            { opacity: 0, duration: 0.9, ease: "power2.out", overwrite: true },
          );
        blocks.forEach((b, j) =>
          gsap.to(b, {
            // 0.73 keeps passive stations readable at WCAG AA on this
            // ground — checked in review, do not lower it
            opacity: j === i ? 1 : 0.73,
            duration: dur,
            ease: "power2.out",
            overwrite: true,
          }),
        );
        navBtns.forEach((n, j) => {
          n.dataset.active = j === i ? "true" : "false";
        });
        if (counterRef.current) {
          counterRef.current.textContent = String(i + 1).padStart(2, "0");
          if (!reduce)
            gsap.fromTo(
              counterRef.current,
              { yPercent: -45, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.35, ease: "power2.out", overwrite: true },
            );
        }
        if (tagRef.current)
          tagRef.current.textContent =
            blocks[i].getAttribute("data-tour-tag") ?? "";
      };

      // initial state for non-first blocks + the station navigation
      blocks.forEach((b, j) => gsap.set(b, { opacity: j === 0 ? 1 : 0.73 }));
      navBtns.forEach((n, j) => {
        n.dataset.active = j === 0 ? "true" : "false";
      });
      if (tagRef.current)
        tagRef.current.textContent = blocks[0].getAttribute("data-tour-tag") ?? "";

      const triggers = blocks.map((b, i) =>
        ScrollTrigger.create({
          trigger: b,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) activate(i);
          },
        }),
      );

      return () => {
        triggers.forEach((tr) => tr.kill());
        gsap.set(blocks, { clearProps: "opacity" });
        gsap.set(frames, { clearProps: "all" });
      };
    });

    // Re-run on locale change: the sticky tag/counter are written
    // imperatively and would otherwise keep the previous language.
    return () => mm.revert();
  }, [locale]);

  return (
    <Section id="features" hud={t("features.eyebrow")} className="relative">
      <Container>
        <SheetHeader
          label={t("features.eyebrow")}
          title={t("features.title")}
          subtitle={t("features.subtitle")}
        />
      </Container>

      {/* The tour breaks out of the standard container: on large screens
          the sticky frame should dominate the viewport, not sit inside a
          1280px column. */}
      <div className="mx-auto w-full max-w-[105rem] px-5 sm:px-8 lg:px-10">
        {/* ================= Desktop: sticky frame + scrolling stations ================= */}
        <div
          ref={rootRef}
          className="mt-6 hidden lg:grid lg:grid-cols-[minmax(20rem,2fr)_3fr] lg:gap-12 xl:grid-cols-[minmax(22rem,1fr)_2fr] xl:gap-16"
        >
          {/* Left: stations hung off a vertical traverse line */}
          <div className="relative">
            <span
              aria-hidden
              className="absolute bottom-0 left-[3px] top-0 w-px"
              style={{
                background:
                  "color-mix(in srgb, var(--color-ink-500) 70%, transparent)",
              }}
            />
            {TOUR.map((row, i) => {
              const f = t<FeatureItem>(`features.items.${row.key}`);
              // Station 0 top-aligns (pt-28 ≈ the sticky wrapper's pt-20
              // + its label row) so the heading opens level with the
              // plate; later stations center so the heading crosses the
              // 55% trigger line mid-block.
              return (
                <div
                  key={row.key}
                  data-tour-block
                  data-tour-tag={f.tag}
                  className={`relative flex flex-col pl-8 pr-6 ${
                    i === 0
                      ? "min-h-[62vh] justify-start pb-10 pt-28"
                      : "min-h-[78vh] justify-center py-10"
                  }`}
                >
                  <div className="relative flex items-baseline gap-3">
                    {/* survey point marker on the traverse */}
                    <span
                      aria-hidden
                      className="absolute -left-8 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rotate-45 border border-ember-500 bg-ink-900"
                    />
                    <span className="font-mono text-xs tracking-wider text-ember-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">{f.tag}</span>
                  </div>
                  <h3
                    className="mt-4 font-display"
                    style={{ fontSize: "var(--fs-h3)" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="mt-4 text-pretty leading-relaxed"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-paper-100) 84%, transparent)",
                    }}
                  >
                    {f.body}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check />
                        <span
                          className="text-sm"
                          style={{
                            color:
                              "color-mix(in srgb, var(--color-paper-100) 90%, transparent)",
                          }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Right: sticky plate. The wrapper is viewport-height and sticks
              at top-0. justify-start + pt-20 (not centering): the plate's
              top then lines up with the first station's text at rest —
              centering parked it ~200px lower than the copy beside it. */}
          <div>
            <div className="sticky top-0 flex h-screen flex-col justify-start pt-20">
              <div className="mb-3 flex items-center justify-between gap-4 font-mono text-xs tracking-[0.18em]">
                <span ref={tagRef} className="uppercase text-ember-400" />
                <div className="flex items-center gap-5">
                  {/* Station navigation — lives in the sticky plate so
                      it is visible for the entire tour. */}
                  <nav aria-label={t("features.navAria")} className="flex items-center">
                    {TOUR.map((row, i) => {
                      const f = t<FeatureItem>(`features.items.${row.key}`);
                      return (
                        <button
                          key={row.key}
                          type="button"
                          data-tour-nav
                          data-active={i === 0 ? "true" : "false"}
                          onClick={() => jumpTo(i)}
                          aria-label={f.tag}
                          title={f.tag}
                          className="px-1.5 py-1 text-ink-400 transition-colors hover:text-paper-50 data-[active=true]:font-semibold data-[active=true]:text-ember-400"
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </nav>
                  <span className="text-ink-300">
                    <span ref={counterRef} className="inline-block text-paper-50">01</span>
                    {" / "}
                    {String(TOUR.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="relative">
                <CornerMarks
                  className="text-ink-400"
                  inset={-11}
                />
                {/* Ember registration flash on plate change */}
                <span
                  ref={flashRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 rounded-xl border-2 border-ember-500 opacity-0"
                />
                {TOUR.map((row, i) => {
                  const f = t<FeatureItem>(`features.items.${row.key}`);
                  return (
                    <div
                      key={row.key}
                      data-tour-img
                      className={i === 0 ? "relative" : "absolute inset-0"}
                      style={i === 0 ? undefined : { opacity: 0 }}
                    >
                      <TourShot row={row} f={f} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================= Mobile / touch: stacked tour ================= */}
        <div className="mt-16 flex flex-col gap-20 lg:hidden">
          {TOUR.map((row, i) => {
            const f = t<FeatureItem>(`features.items.${row.key}`);
            return (
              <div key={row.key} className="flex flex-col gap-8">
                <Reveal>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs tracking-wider text-ember-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 self-center bg-ember-500/50" />
                    <span className="eyebrow">{f.tag}</span>
                  </div>
                  <h3
                    className="mt-4 font-display"
                    style={{ fontSize: "var(--fs-h3)" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="mt-4 text-pretty leading-relaxed"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-paper-100) 84%, transparent)",
                    }}
                  >
                    {f.body}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check />
                        <span
                          className="text-sm"
                          style={{
                            color:
                              "color-mix(in srgb, var(--color-paper-100) 90%, transparent)",
                          }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.08}>
                  <TourShot row={row} f={f} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/** One tour stop's visual: a single frame, or a paged carousel (Табло). */
function TourShot({
  row,
  f,
}: {
  row: (typeof TOUR)[number];
  f: FeatureItem;
}) {
  const t = useT();
  if (row.pages && row.pagesKey) {
    const labels = t<string[]>(`features.${row.pagesKey}`);
    return (
      <ScreenshotCarousel
        slides={row.pages.map((slot, i) => ({ slot, label: labels[i] ?? slot }))}
        alt={f.title}
        title={`Wolf — ${f.tag}`}
      />
    );
  }
  return (
    <ScreenshotFrame slot={row.slot} alt={f.title} title={`Wolf — ${f.tag}`} />
  );
}

function Check() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
      style={{ background: "color-mix(in srgb, var(--color-ember-500) 16%, transparent)" }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2.5 6.5 5 9l4.5-5.5"
          stroke="var(--color-ember-400)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
