"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";

// Enabled only for mouse-grade pointers with motion allowed — tracked
// live via useSyncExternalStore so plugging in/removing a mouse or
// flipping the OS motion setting updates the cursor without a reload.
function subscribeMedia(cb: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", cb);
  reduce.addEventListener("change", cb);
  return () => {
    fine.removeEventListener("change", cb);
    reduce.removeEventListener("change", cb);
  };
}
const getEnabled = () =>
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getEnabledServer = () => false;

/**
 * Surveyor's reticle cursor: an ember dot that tracks the pointer
 * directly, inside a lagging ring with crosshair ticks. Over anything
 * interactive the ring widens and the ticks swing 45° — like an
 * instrument acquiring a target.
 *
 * Only mounts for mouse-grade pointers with motion allowed. The native
 * cursor is suppressed via `html.wolf-cursor` (inputs keep theirs).
 */
export function Cursor() {
  const enabled = useSyncExternalStore(subscribeMedia, getEnabled, getEnabledServer);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("wolf-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
    };

    const onMove = (e: MouseEvent) => {
      show();
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const INTERACTIVE =
      "a, button, [role='button'], label, input, textarea, select, [data-cursor]";
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE);
      gsap.to(ring, {
        scale: hit ? 1.55 : 1,
        rotate: hit ? 45 : 0,
        borderColor: hit
          ? "color-mix(in srgb, var(--color-ember-400) 85%, transparent)"
          : "color-mix(in srgb, var(--color-paper-100) 38%, transparent)",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onDown = () => gsap.to(ring, { scale: 0.82, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
    const onLeaveDoc = () => {
      shown = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);

    return () => {
      document.documentElement.classList.remove("wolf-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      gsap.killTweensOf([dot, ring]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{ background: "var(--color-ember-400)" }}
      />
      {/* reticle ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0"
        style={{
          borderColor: "color-mix(in srgb, var(--color-paper-100) 38%, transparent)",
        }}
      >
        {/* crosshair ticks */}
        <span className="absolute left-1/2 top-[-3px] h-[7px] w-px -translate-x-1/2 bg-current text-paper-100/50" />
        <span className="absolute bottom-[-3px] left-1/2 h-[7px] w-px -translate-x-1/2 bg-current text-paper-100/50" />
        <span className="absolute left-[-3px] top-1/2 h-px w-[7px] -translate-y-1/2 bg-current text-paper-100/50" />
        <span className="absolute right-[-3px] top-1/2 h-px w-[7px] -translate-y-1/2 bg-current text-paper-100/50" />
      </div>
    </>
  );
}
