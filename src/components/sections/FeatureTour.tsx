"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SheetHeader } from "@/components/ui/Section";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";
import { Reveal } from "@/components/ui/Reveal";
import { CornerMarks } from "@/components/motifs/GeodesyMotifs";

interface FeatureItem {
  tag: string;
  title: string;
  body: string;
  bullets: string[];
}

// Each feature → its screenshot slot. Drop <slot>.png into /public/screenshots.
const TOUR: { key: string; slot: string }[] = [
  { key: "orders", slot: "OrdersScreen" },
  { key: "titleChain", slot: "PlotsAndDocsInOrderTab" },
  { key: "invoicing", slot: "InvoiceDraft" },
  { key: "templates", slot: "TemplatesScreen" },
  { key: "calendar", slot: "Callendar" },
  { key: "filters", slot: "FiltersOrders" },
  { key: "reports", slot: "InqueriesTab" },
  { key: "dashboard", slot: "AdminBoard" },
];

/**
 * The survey walk, drafted on the sheet. On desktop the app's dark
 * screens sit like plates pinned to the drafting table inside a sticky
 * frame with corner registration marks; the stations on the left hang
 * off a vertical traverse line, and scrolling crossfades the matching
 * screen and advances the "02 / 08" counter. On touch/small screens it
 * falls back to a clean stacked tour.
 */
export function FeatureTour() {
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dur = reduce ? 0 : 0.6;
      const blocks = gsap.utils.toArray<HTMLElement>("[data-tour-block]", root);
      const frames = gsap.utils.toArray<HTMLElement>("[data-tour-img]", root);
      if (!blocks.length || !frames.length) return;

      gsap.set(frames, { autoAlpha: 0, scale: 1.035 });
      gsap.set(frames[0], { autoAlpha: 1, scale: 1 });

      let active = 0;
      const activate = (i: number) => {
        if (i === active) return;
        active = i;
        frames.forEach((f, j) =>
          gsap.to(f, {
            autoAlpha: j === i ? 1 : 0,
            scale: j === i ? 1 : 1.035,
            duration: dur,
            ease: "power2.out",
            overwrite: true,
          }),
        );
        blocks.forEach((b, j) =>
          gsap.to(b, {
            opacity: j === i ? 1 : 0.38,
            duration: dur,
            ease: "power2.out",
            overwrite: true,
          }),
        );
        if (counterRef.current)
          counterRef.current.textContent = String(i + 1).padStart(2, "0");
        if (tagRef.current)
          tagRef.current.textContent =
            blocks[i].getAttribute("data-tour-tag") ?? "";
      };

      // initial dim state for non-first blocks
      blocks.forEach((b, j) => gsap.set(b, { opacity: j === 0 ? 1 : 0.38 }));
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

    return () => mm.revert();
  }, []);

  return (
    <Section id="features" hud={t("features.eyebrow")} className="register-paper relative">
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
                  "color-mix(in srgb, var(--color-ink-700) 25%, transparent)",
              }}
            />
            {TOUR.map((row, i) => {
              const f = t<FeatureItem>(`features.items.${row.key}`);
              return (
                <div
                  key={row.key}
                  data-tour-block
                  data-tour-tag={f.tag}
                  className="relative flex min-h-[78vh] flex-col justify-center py-10 pl-8 pr-6"
                >
                  <div className="relative flex items-baseline gap-3">
                    {/* survey point marker on the traverse */}
                    <span
                      aria-hidden
                      className="absolute -left-8 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rotate-45 border border-ember-700 bg-paper-100"
                    />
                    <span className="font-mono text-xs tracking-wider text-ember-800">
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
                        "color-mix(in srgb, var(--color-ink-800) 84%, transparent)",
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
                              "color-mix(in srgb, var(--color-ink-800) 90%, transparent)",
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
              at top-0 with its content flex-centered — this centers the
              frame while stuck WITHOUT a translate, which would shift it up
              into the section heading before sticking. */}
          <div>
            <div className="sticky top-0 flex h-screen flex-col justify-center">
              <div className="mb-3 flex items-center justify-between font-mono text-xs tracking-[0.18em]">
                <span ref={tagRef} className="uppercase text-ember-800" />
                <span style={{ color: "color-mix(in srgb, var(--color-ink-700) 60%, transparent)" }}>
                  <span ref={counterRef} className="text-ink-900">01</span>
                  {" / "}
                  {String(TOUR.length).padStart(2, "0")}
                </span>
              </div>
              <div className="relative">
                <CornerMarks
                  className="text-ink-700/50"
                  inset={-11}
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
                      <ScreenshotFrame
                        slot={row.slot}
                        alt={f.title}
                        title={`Wolf — ${f.tag}`}
                      />
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
                    <span className="font-mono text-xs tracking-wider text-ember-800">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 self-center bg-ember-700/50" />
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
                        "color-mix(in srgb, var(--color-ink-800) 84%, transparent)",
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
                              "color-mix(in srgb, var(--color-ink-800) 90%, transparent)",
                          }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.08}>
                  <ScreenshotFrame
                    slot={row.slot}
                    alt={f.title}
                    title={`Wolf — ${f.tag}`}
                  />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function Check() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
      style={{ background: "color-mix(in srgb, var(--color-ember-600) 14%, transparent)" }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2.5 6.5 5 9l4.5-5.5"
          stroke="var(--color-ember-700)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
