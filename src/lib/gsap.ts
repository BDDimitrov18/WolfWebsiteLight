/**
 * Central GSAP setup. Import gsap/plugins from here, never from "gsap"
 * directly, so registration happens exactly once and only in the browser
 * (the site is a static export — everything animated is client-side).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

/** House easing — matches --ease-out-expo in globals.css. */
export const EASE_OUT = "expo.out";
/** For scrubbed/scroll-linked motion. */
export const EASE_NONE = "none";

export { gsap, ScrollTrigger, SplitText };
