import type { ElementType, ReactNode } from "react";

/**
 * Formerly scroll-reveal primitives (GSAP fade-ups). The entrance
 * animations were removed on owner request (2026-07-16): text now
 * renders static and immediately visible — no scroll-triggered hiding
 * anywhere. The components remain so the many call sites keep their
 * grouping semantics; the old animation props are accepted and ignored.
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
  return <Tag className={className}>{children}</Tag>;
}

export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  y?: number;
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
  return <div className={className}>{children}</div>;
}
