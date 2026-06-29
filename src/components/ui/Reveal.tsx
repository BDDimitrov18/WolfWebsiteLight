import type { ElementType, ReactNode } from "react";

/**
 * Scroll-reveal primitives built on CSS scroll-driven animations
 * (see `.reveal-css` in globals.css). Content is ALWAYS visible by
 * default; where the browser supports view timelines and motion is
 * allowed, it fades/rises in on enter. No JS, no IntersectionObserver,
 * no hydration dependency — so content can never be stuck hidden.
 *
 * `delay`/`stagger` props are accepted for API compatibility but the
 * scroll timeline drives timing by element position instead.
 */
export function Reveal({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  once?: boolean;
}) {
  const Tag = as as ElementType;
  return <Tag className={`reveal-css ${className}`}>{children}</Tag>;
}

export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return <div className={`reveal-css ${className}`}>{children}</div>;
}
