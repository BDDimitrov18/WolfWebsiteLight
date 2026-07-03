"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/** Sofia base station; scrolling "traverses" north-east from here. */
const BASE_LAT = 42.6977;
const BASE_LON = 23.3219;

/**
 * Fixed instrument HUD (bottom-left, desktop only): live northing/easting
 * that ticks as you scroll, the section currently in the crosshairs
 * (from `data-hud` on sections), and traverse progress. Pure DOM writes,
 * zero React re-renders.
 */
export function CoordReadout() {
  const latRef = useRef<HTMLSpanElement>(null);
  const lonRef = useRef<HTMLSpanElement>(null);
  const secRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const main = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        if (latRef.current)
          latRef.current.textContent = `N ${(BASE_LAT + p * 0.0421).toFixed(4)}°`;
        if (lonRef.current)
          lonRef.current.textContent = `E ${(BASE_LON + p * 0.0378).toFixed(4)}°`;
        if (pctRef.current)
          pctRef.current.textContent = `${Math.round(p * 100)
            .toString()
            .padStart(3, "0")}`;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      },
    });

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-hud]"));
    const triggers = sections.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive && secRef.current)
            secRef.current.textContent = el.getAttribute("data-hud") ?? "";
        },
      }),
    );

    return () => {
      main.kill();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 left-6 z-40 hidden select-none lg:block"
    >
      <div className="flex flex-col gap-1.5 font-mono text-[10px] tracking-[0.14em] text-ink-400">
        <span className="flex gap-3">
          <span ref={latRef}>N {BASE_LAT.toFixed(4)}°</span>
          <span ref={lonRef}>E {BASE_LON.toFixed(4)}°</span>
        </span>
        <span className="flex items-center gap-2">
          <span
            className="relative block h-px w-24 overflow-hidden"
            style={{
              background: "color-mix(in srgb, var(--color-paper-100) 14%, transparent)",
            }}
          >
            <span
              ref={barRef}
              className="absolute inset-0 origin-left"
              style={{ background: "var(--color-ember-500)", transform: "scaleX(0)" }}
            />
          </span>
          <span ref={pctRef}>000</span>
          <span className="text-ink-500">·</span>
          <span ref={secRef} className="uppercase text-ember-400/90" />
        </span>
      </div>
    </div>
  );
}
