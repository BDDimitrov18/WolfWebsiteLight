"use client";

import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee (pure CSS — see `.marquee-track`).
 * Children are duplicated once; the track translates -50% and loops.
 * Pauses on hover; static under prefers-reduced-motion.
 */
export function Marquee({
  children,
  className = "",
  duration = 46,
}: {
  children: ReactNode;
  className?: string;
  /** seconds per loop */
  duration?: number;
}) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={{ ["--marquee-dur" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
