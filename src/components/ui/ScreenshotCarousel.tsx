"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Lightbox } from "@/components/ui/Lightbox";

export interface CarouselSlide {
  slot: string;
  /** Short page name shown in the title bar and read by screen readers. */
  label: string;
}

/**
 * ScreenshotFrame's multi-page sibling: one app-window chrome, several
 * screenshots crossfading inside it. Auto-advances until the reader
 * takes over with the arrows or the dots — a deliberate choice sticks.
 * Hover pauses the rotation; reduced motion disables it entirely.
 */
export function ScreenshotCarousel({
  slides,
  alt,
  title = "Wolf",
  interval = 5000,
}: {
  slides: CarouselSlide[];
  alt: string;
  title?: string;
  interval?: number;
}) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!auto || hover || open || slides.length < 2) return;
    // Reduced motion → no self-advancing UI, arrows still work.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      interval,
    );
    return () => clearInterval(id);
  }, [auto, hover, open, slides.length, interval]);

  const goTo = (i: number) => {
    setAuto(false); // the reader took the wheel
    setIndex((i + slides.length) % slides.length);
  };

  const current = slides[index];
  const slideAlt = (s: CarouselSlide) => `${alt} — ${s.label}`;

  return (
    <>
      <figure
        role="group"
        aria-roledescription="carousel"
        aria-label={alt}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative overflow-hidden rounded-xl border"
        style={{
          borderColor: "color-mix(in srgb, var(--color-paper-100) 12%, transparent)",
          background: "var(--color-ink-850)",
          boxShadow: "var(--shadow-frame)",
        }}
        data-screenshot-slot={current.slot}
      >
        {/* Title bar — same chrome as ScreenshotFrame, plus page + counter */}
        <div
          className="flex items-center gap-2 border-b px-4 py-2.5"
          style={{
            borderColor: "color-mix(in srgb, var(--color-paper-100) 9%, transparent)",
            background: "var(--color-ink-900)",
          }}
        >
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-ember-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-400/40" />
          </span>
          <span className="ml-2 truncate font-mono text-xs tracking-wide text-ink-300">
            {title} · <span className="text-paper-100">{current.label}</span>
          </span>
          <span
            className="ml-auto flex-none font-mono text-[11px] text-ink-300"
            aria-hidden="true"
          >
            {index + 1} / {slides.length}
          </span>
        </div>

        {/* Image stack — every page mounted, current one visible */}
        <div className="relative aspect-[1919/1032] w-full">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`${t("features.zoomHint")}: ${slideAlt(current)}`}
            className="absolute inset-0 cursor-zoom-in"
          >
            {slides.map((s, i) => (
              <span
                key={s.slot}
                aria-hidden={i !== index}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  i === index ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <Image
                  src={asset(`/screenshots/${s.slot}.png`)}
                  alt={slideAlt(s)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                />
              </span>
            ))}
          </button>

          {/* Arrows — siblings of the zoom button, never nested in it */}
          <CarouselArrow
            dir="prev"
            label={t("features.shotPrev")}
            onClick={() => goTo(index - 1)}
          />
          <CarouselArrow
            dir="next"
            label={t("features.shotNext")}
            onClick={() => goTo(index + 1)}
          />

          {/* Dots — direct jump. Dark pill behind them: the app's
              screenshots are light, bare dots would drown on white. */}
          <span
            className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1 rounded-full px-2 py-0.5"
            style={{
              background: "color-mix(in srgb, var(--color-ink-950) 72%, transparent)",
            }}
          >
            {slides.map((s, i) => (
              <button
                key={s.slot}
                type="button"
                onClick={() => goTo(i)}
                aria-label={s.label}
                aria-current={i === index ? "true" : undefined}
                className="flex h-5 w-5 items-center justify-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-5 bg-ember-500" : "w-1.5 bg-paper-100/45"
                  }`}
                />
              </button>
            ))}
          </span>
        </div>
      </figure>

      {open && (
        <Lightbox
          src={asset(`/screenshots/${current.slot}.png`)}
          alt={slideAlt(current)}
          title={`${title} · ${current.label}`}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function CarouselArrow({
  dir,
  label,
  onClick,
}: {
  dir: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border text-paper-100 transition-colors hover:text-ember-400 ${
        dir === "prev" ? "left-2.5" : "right-2.5"
      }`}
      style={{
        background: "color-mix(in srgb, var(--color-ink-950) 78%, transparent)",
        borderColor: "color-mix(in srgb, var(--color-paper-100) 16%, transparent)",
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className={dir === "prev" ? "rotate-180" : undefined}
      >
        <path
          d="M5 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
