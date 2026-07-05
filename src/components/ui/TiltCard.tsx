"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Subtle 3D tilt toward the pointer with a tracking specular sheen.
 * Mouse-grade pointers only; plain container otherwise.
 */
export function TiltCard({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const glare = glareRef.current;
    if (!el || !glare) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    gsap.set(el, { transformPerspective: 700 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height;
      rx((0.5 - py) * max);
      ry((px - 0.5) * max);
      gsap.to(glare, {
        opacity: 1,
        x: (px - 0.5) * r.width * 0.6,
        y: (py - 0.5) * r.height * 0.6,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.7, ease: "power3.out" });
      gsap.to(glare, { opacity: 0, duration: 0.5 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf([el, glare]);
    };
  }, [max]);

  return (
    <div ref={ref} className={`relative will-change-transform ${className}`}>
      {children}
      <div
        ref={glareRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-ember-400) 22%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
