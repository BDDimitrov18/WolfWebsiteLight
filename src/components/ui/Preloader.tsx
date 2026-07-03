"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Instrument-calibration preloader: latitude/longitude tick up to the
 * Sofia coordinates while a hairline "level" fills, then the whole
 * plate wipes upward and hands off to the hero intro.
 *
 * Shown once per tab session, never under prefers-reduced-motion
 * (the provider decides). `onDone` fires as the wipe begins so the
 * hero can overlap it.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const latRef = useRef<HTMLSpanElement>(null);
  const lonRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // No scrolling underneath the plate.
    document.body.style.overflow = "hidden";

    const coords = { lat: 0, lon: 0 };
    const fmt = (v: number, axis: "N" | "E") =>
      `${axis} ${v.toFixed(4)}°`;

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete: () => setGone(true),
    });

    tl.fromTo(
      markRef.current,
      { rotate: -120, autoAlpha: 0, transformOrigin: "50% 50%" },
      { rotate: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out" },
      0,
    )
      .to(
        coords,
        {
          lat: 42.6977,
          lon: 23.3219,
          duration: 1.05,
          ease: "power3.inOut",
          onUpdate: () => {
            if (latRef.current) latRef.current.textContent = fmt(coords.lat, "N");
            if (lonRef.current) lonRef.current.textContent = fmt(coords.lon, "E");
          },
        },
        0.1,
      )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.15, ease: "power3.inOut" },
        0.1,
      )
      // Hand off: hero intro starts while the plate wipes away.
      .add(() => doneRef.current(), 1.3)
      .to(
        root,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.8,
          ease: "expo.inOut",
        },
        1.35,
      );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (gone) document.body.style.overflow = "";
  }, [gone]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[95] flex items-center justify-center"
      style={{
        background: "var(--color-ink-950)",
        clipPath: "inset(0% 0% 0% 0%)",
      }}
    >
      <div className="flex flex-col items-center gap-5 px-6">
        {/* Compass mark — a plotted point being oriented */}
        <svg
          ref={markRef}
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          className="text-paper-100"
        >
          <circle cx="26" cy="26" r="24" stroke="currentColor" strokeOpacity="0.25" />
          <circle cx="26" cy="26" r="16" stroke="currentColor" strokeOpacity="0.45" />
          <path d="M26 4v8M26 40v8M4 26h8M40 26h8" stroke="currentColor" strokeOpacity="0.6" />
          <circle cx="26" cy="26" r="3.4" fill="var(--color-ember-500)" />
        </svg>

        <p className="font-display text-2xl tracking-tight text-paper-50">Wolf</p>

        <p className="flex gap-4 font-mono text-[11px] tracking-[0.18em] text-ink-300">
          <span ref={latRef}>N 0.0000°</span>
          <span ref={lonRef}>E 0.0000°</span>
        </p>

        <span
          className="block h-px w-44 overflow-hidden"
          style={{ background: "color-mix(in srgb, var(--color-paper-100) 14%, transparent)" }}
        >
          <span
            ref={barRef}
            className="block h-full w-full origin-left"
            style={{ background: "var(--color-ember-500)", transform: "scaleX(0)" }}
          />
        </span>
      </div>
    </div>
  );
}
