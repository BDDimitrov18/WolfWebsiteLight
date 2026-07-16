"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useExperience } from "@/components/providers/ExperienceProvider";

/**
 * Headline that "plots itself" — SplitText line masks rising like survey
 * points being recorded.
 *
 * - `mode="load"`  → plays once the preloader hands off (hero).
 * - `mode="scroll"`→ RETIRED (owner request, 2026-07-16): scroll-triggered
 *   text entrances are gone site-wide; this mode now renders a plain,
 *   immediately-visible heading. Only the hero's one-time load
 *   choreography survives.
 *
 * Resilience (load mode): the element ships visible in HTML. It carries
 * `.intro-hide` (hidden only under `html.js`, with a CSS failsafe), and
 * we only remove that class at the exact moment GSAP takes over.
 * Reduced motion → no split, no hide, content simply shows.
 *
 * Re-mount on locale change (pass `key={locale}`) so lines re-split.
 */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className = "",
  mode = "scroll",
  delay = 0,
  stagger = 0.09,
  style,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  mode?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const { ready } = useExperience();
  // In load-mode we wait for the preloader hand-off.
  const armed = mode === "load" && ready;

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.remove("intro-hide");
      return;
    }

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line",
        onSplit(self) {
          // Class off only now — GSAP owns visibility from here.
          el.classList.remove("intro-hide");
          gsap.set(el, { opacity: 1 });
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.15,
            stagger,
            delay,
            ease: "expo.out",
            // Un-split once done: the overflow-clip line masks otherwise
            // shave serif descenders forever at our tight line-height.
            onComplete: () => self.revert(),
          });
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [armed, mode, delay, stagger]);

  return (
    <Tag
      // @ts-expect-error — ref is valid for every allowed tag
      ref={ref}
      // intro-hide only when an animation will actually lift it (hero
      // load mode); static headings must never carry a hiding class.
      className={`${mode === "load" ? "intro-hide split-mask" : ""} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
