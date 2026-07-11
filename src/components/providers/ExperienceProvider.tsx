"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Preloader } from "@/components/ui/Preloader";

/**
 * Experience layer: Lenis smooth scrolling driven by the GSAP ticker
 * (so ScrollTrigger and the scroll position never disagree), plus the
 * global capability flags every animated component needs.
 *
 * `ready` flips true once the preloader finishes (or is skipped) —
 * above-the-fold intro timelines wait for it; scroll-triggered work
 * below the fold does not need to.
 */
interface ExperienceState {
  /** prefers-reduced-motion — kill everything non-essential. */
  reducedMotion: boolean;
  /** Mouse-grade pointer — gate cursor/magnetic/tilt effects. */
  finePointer: boolean;
  /** Preloader finished; hero intro may play. */
  ready: boolean;
}

const ExperienceContext = createContext<ExperienceState>({
  reducedMotion: false,
  finePointer: false,
  ready: false,
});

export function useExperience() {
  return useContext(ExperienceContext);
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [ready, setReady] = useState(false);
  // null = not decided yet (SSR/first paint renders nothing extra)
  const [showPreloader, setShowPreloader] = useState<boolean | null>(null);

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

  // ---- Preloader decision (first visit only) -----------------------------
  // The calibration intro is a first-impression device: returning
  // visitors (localStorage) skip straight to the hero. The old
  // per-tab-session key is honoured so mid-session upgrades don't
  // replay it either.
  useEffect(() => {
    let seen = false;
    try {
      seen =
        localStorage.getItem("wolf.introSeen") === "1" ||
        sessionStorage.getItem("wolf-intro") === "1";
    } catch {
      /* storage unavailable → treat as first visit */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot post-mount environment read (storage/media query), intentional
      setShowPreloader(false);
      setReady(true);
    } else {
      try {
        localStorage.setItem("wolf.introSeen", "1");
        sessionStorage.setItem("wolf-intro", "1");
      } catch {
        /* best effort */
      }
      setShowPreloader(true);
    }
  }, []);

  // ---- Lenis <-> ScrollTrigger ------------------------------------------
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.115,
      anchors: { offset: -72 }, // clear the fixed navbar on #hash scrolls
    });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Re-measure triggers once web fonts settle (metrics shift line breaks).
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reducedMotion]);

  const value = useMemo(
    () => ({ reducedMotion, finePointer, ready }),
    [reducedMotion, finePointer, ready],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {showPreloader === true && (
        <Preloader onDone={() => setReady(true)} />
      )}
      {children}
    </ExperienceContext.Provider>
  );
}
