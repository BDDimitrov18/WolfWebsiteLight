"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Experience layer: the global capability flags every animated
 * component needs. Scrolling is NATIVE — Lenis was removed on review
 * (2026-07-16): its per-frame loop taxed office PCs, it swallowed
 * Home/End/PageDown keys, and its `anchors` offset fought the
 * sections' scroll-mt. CSS `scroll-behavior: smooth` covers anchor
 * scrolling; ScrollTrigger listens to native scroll by itself.
 *
 * The calibration preloader and the hero load choreography were
 * removed (owner request, 2026-07-17) — the page renders its content
 * immediately, so `ready` is simply always true.
 */
interface ExperienceState {
  /** prefers-reduced-motion — kill everything non-essential. */
  reducedMotion: boolean;
  /** Mouse-grade pointer — gate cursor/magnetic/tilt effects. */
  finePointer: boolean;
  /** Always true — kept for components that gated on the old preloader. */
  ready: boolean;
}

const ExperienceContext = createContext<ExperienceState>({
  reducedMotion: false,
  finePointer: false,
  ready: true,
});

export function useExperience() {
  return useContext(ExperienceContext);
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  // ---- Capability flags -------------------------------------------------
  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqPointer = window.matchMedia("(pointer: fine)");
    const sync = () => {
      setReducedMotion(mqMotion.matches);
      setFinePointer(mqPointer.matches);
    };
    sync();
    mqMotion.addEventListener("change", sync);
    mqPointer.addEventListener("change", sync);
    return () => {
      mqMotion.removeEventListener("change", sync);
      mqPointer.removeEventListener("change", sync);
    };
  }, []);

  // Re-measure triggers once web fonts settle (metrics shift line breaks).
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  const value = useMemo(
    () => ({ reducedMotion, finePointer, ready: true }),
    [reducedMotion, finePointer],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}
