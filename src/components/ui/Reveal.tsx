"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-reveal primitives, GSAP edition.
 *
 * Resilience contract (learned the hard way): content ships VISIBLE in
 * the HTML. It is hidden only inside a client effect — i.e. only after
 * JS has actually executed — and revealed by ScrollTrigger. No JS, no
 * hydration, reduced motion → content simply stays visible.
 */

const START = "top 88%";

export function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: START, once },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, once]);

  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Parent that staggers all descendant `<RevealItem>`s as one batch when
 * the group scrolls in.
 */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y });
      ScrollTrigger.batch(items, {
        start: START,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            stagger,
            ease: "expo.out",
            overwrite: true,
          }),
      });
    }, el);
    return () => ctx.revert();
  }, [stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <div data-reveal-item className={className}>
      {children}
    </div>
  );
}
