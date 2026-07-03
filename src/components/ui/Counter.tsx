"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Stat that counts up when it enters the viewport, keeping any prefix or
 * suffix ("100+", "0 ms", "58"). SSR/no-JS shows the final value; the
 * count-down-to-zero setup only happens after JS proves it runs.
 */
export function Counter({
  value,
  className = "",
  style,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const match = value.match(/([\d.,]+)/);
    if (!match) return; // nothing numeric — leave as-is
    const target = parseFloat(match[1].replace(",", "."));
    const decimals = match[1].includes(".") ? 1 : 0;
    const [prefix, suffix] = value.split(match[1]);

    const obj = { n: 0 };
    const render = () => {
      el.textContent = `${prefix}${obj.n.toFixed(decimals)}${suffix}`;
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          obj,
          { n: 0 },
          { n: target, duration, ease: "power2.out", onUpdate: render },
        );
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(obj);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {value}
    </span>
  );
}
