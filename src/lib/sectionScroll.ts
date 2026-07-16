import type { MouseEvent } from "react";

/**
 * Same-page section navigation. `el.scrollIntoView()` honours the
 * sections' `scroll-mt` exactly; routing the click through the app
 * router verifiably lands ~72px short of it. Only intercepts when the
 * target is on the current page — otherwise the caller's <Link> does
 * its normal cross-page navigation.
 *
 * The rAF delay lets a closing mobile menu release its scroll lock
 * before the scroll starts.
 */
export function scrollToSection(e: MouseEvent, href: string) {
  const hash = href.startsWith("/#") ? href.slice(1) : href;
  if (!hash.startsWith("#")) return;
  const el = document.getElementById(hash.slice(1));
  if (!el) return;
  e.preventDefault();
  history.pushState(null, "", hash);
  requestAnimationFrame(() => {
    el.scrollIntoView();
    // Late layout (the hero's load choreography, fonts) can move the
    // target while the smooth scroll is in flight, stranding it ~200px
    // off. When the scroll ends, settle onto the section — unless the
    // reader visibly took over (large divergence = they scrolled away).
    const settle = () => {
      const top = el.getBoundingClientRect().top;
      const want = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const off = Math.abs(top - want);
      if (off > 2 && off < 480) el.scrollIntoView();
    };
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", settle, { once: true });
    } else {
      setTimeout(settle, 900); // Safari < 26
    }
  });
}
