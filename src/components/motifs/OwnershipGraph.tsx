"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * The ownership graph: one plot fanning out into its ownership documents,
 * each document into the owners it names — with their ideal parts — and a
 * power of attorney hanging off one of them. The data model drawn as the
 * register itself, rather than described in prose.
 *
 * Scroll-in: the joins draw themselves stroke by stroke and the cards
 * settle on. Then ember pulses run the joins continuously, the way the
 * hero's scan sweep crosses the terrain — the record is live, not a still.
 *
 * TWO layouts, because one does not fit. "wide" fans left-to-right for the
 * desktop column; "tall" is an indented tree for narrow screens — squeezing
 * the wide one into 350px would render its labels at ~6px, which is exactly
 * the unreadable-diagram problem it exists to avoid. Only the visible one
 * animates (the other is display:none and simply renders in its final state).
 *
 * All coordinates are literal constants — no measurement, no randomness —
 * so SSR and the client produce byte-identical markup.
 */

export interface OwnershipGraphData {
  caption: string;
  flow: string;
  plot: { label: string; id: string; sub: string };
  docs: { label: string; ref: string }[];
  owners: { name: string; part: string }[];
  poa: { label: string; ref: string };
}

interface Node {
  x: number;
  y: number;
  w: number;
  h: number;
  /** mono ember line: the record's type, or — for an owner — his ideal part */
  eyebrow: string;
  value: string;
  sub?: string;
  mono?: boolean;
  /** the plot is the root record and carries the ember edge */
  root?: boolean;
}

type Layout = "wide" | "tall";

function build(d: OwnershipGraphData, layout: Layout): { nodes: Node[]; links: string[]; viewBox: string } {
  const [d1, d2] = d.docs;
  const [o1, o2, o3] = d.owners;

  if (layout === "wide") {
    return {
      viewBox: "0 0 548 400",
      nodes: [
        { x: 6, y: 168, w: 156, h: 76, eyebrow: d.plot.label, value: d.plot.id, sub: d.plot.sub, mono: true, root: true },
        { x: 208, y: 88, w: 140, h: 56, eyebrow: d1.label, value: d1.ref },
        { x: 208, y: 250, w: 140, h: 56, eyebrow: d2.label, value: d2.ref },
        { x: 402, y: 30, w: 132, h: 52, eyebrow: o1.part, value: o1.name },
        { x: 402, y: 112, w: 132, h: 52, eyebrow: o2.part, value: o2.name },
        { x: 402, y: 244, w: 132, h: 52, eyebrow: o3.part, value: o3.name },
        { x: 402, y: 330, w: 132, h: 50, eyebrow: d.poa.label, value: d.poa.ref },
      ],
      links: [
        "M162,190 C186,190 186,116 208,116", // plot → deed
        "M162,222 C186,222 186,278 208,278", // plot → split agreement
        "M348,106 C375,106 375,56 402,56", // deed → owner 1
        "M348,126 C375,126 375,138 402,138", // deed → owner 2
        "M348,278 C375,278 375,270 402,270", // split agreement → owner 3
        "M468,296 L468,330", // owner 3 → power of attorney
      ],
    };
  }

  // Indented tree: each level steps right, elbow connectors from the
  // parent's spine. Cards stay near their natural size, so the labels
  // stay readable at phone width.
  return {
    viewBox: "0 0 340 458",
    nodes: [
      { x: 8, y: 6, w: 300, h: 68, eyebrow: d.plot.label, value: d.plot.id, sub: d.plot.sub, mono: true, root: true },
      { x: 40, y: 98, w: 268, h: 48, eyebrow: d1.label, value: d1.ref },
      { x: 76, y: 162, w: 232, h: 44, eyebrow: o1.part, value: o1.name },
      { x: 76, y: 218, w: 232, h: 44, eyebrow: o2.part, value: o2.name },
      { x: 40, y: 282, w: 268, h: 48, eyebrow: d2.label, value: d2.ref },
      { x: 76, y: 346, w: 232, h: 44, eyebrow: o3.part, value: o3.name },
      { x: 112, y: 402, w: 196, h: 44, eyebrow: d.poa.label, value: d.poa.ref },
    ],
    links: [
      "M24,74 V122 H40", // plot → deed
      "M24,74 V306 H40", // plot → split agreement
      "M56,146 V184 H76", // deed → owner 1
      "M56,146 V240 H76", // deed → owner 2
      "M56,330 V368 H76", // split agreement → owner 3
      "M92,390 V424 H112", // owner 3 → power of attorney
    ],
  };
}

export function OwnershipGraph({
  data,
  layout,
}: {
  data: OwnershipGraphData;
  layout: Layout;
}) {
  const rootRef = useRef<SVGSVGElement>(null);
  const { nodes, links, viewBox } = build(data, layout);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // The other layout is display:none — leave it in its final, visible
    // state rather than animating something nobody can see.
    if (!root.getBoundingClientRect().width) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const joins = gsap.utils.toArray<SVGPathElement>("[data-link]", root);
      const pulses = gsap.utils.toArray<SVGPathElement>("[data-pulse]", root);
      const cards = gsap.utils.toArray<SVGGElement>("[data-card]", root);

      joins.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
      tl.fromTo(
        cards,
        { autoAlpha: 0, scale: 0.94, transformOrigin: "center" },
        { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.09, ease: "back.out(1.7)" },
        0,
      ).to(
        joins,
        { strokeDashoffset: 0, duration: 0.85, stagger: 0.08, ease: "power2.inOut" },
        0.15,
      );

      // The record breathes: a short ember dash runs each join, the pulses
      // cascading outward from the plot.
      pulses.forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: `14 ${len}`, strokeDashoffset: len + 14 });
        tl.to(
          p,
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "none",
            repeat: -1,
            repeatDelay: 1.4,
          },
          `>-0.6+=${i * 0.22}`,
        );
      });
    }, root);
    return () => ctx.revert();
  }, [data, layout]);

  return (
    <svg
      ref={rootRef}
      viewBox={viewBox}
      fill="none"
      role="img"
      aria-label={data.flow}
      className="h-auto w-full"
    >
      {links.map((d, i) => (
        <path
          key={`j${i}`}
          data-link
          d={d}
          stroke="color-mix(in srgb, var(--color-ink-500) 85%, transparent)"
          strokeWidth="1.2"
        />
      ))}
      {links.map((d, i) => (
        <path
          key={`p${i}`}
          data-pulse
          d={d}
          stroke="var(--color-steel-400)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i} data-card>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height={n.h}
            rx="2"
            fill="var(--color-ink-900)"
            stroke="color-mix(in srgb, var(--color-ink-500) 70%, transparent)"
            strokeWidth="1"
          />
          {n.root && (
            <rect x={n.x} y={n.y} width={3} height={n.h} fill="var(--color-steel-400)" />
          )}
          <text
            x={n.x + 14}
            y={n.y + 20}
            fontSize="8.6"
            letterSpacing="1"
            fill="var(--color-steel-300)"
            style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
          >
            {n.eyebrow}
          </text>
          <text
            x={n.x + 14}
            y={n.y + 41}
            fontSize="12.5"
            fill="var(--color-paper-50)"
            style={{ fontFamily: n.mono ? "var(--font-mono)" : "var(--font-sans)" }}
          >
            {n.value}
          </text>
          {n.sub && (
            <text
              x={n.x + 14}
              y={n.y + 59}
              fontSize="9.2"
              fill="var(--color-ink-300)"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {n.sub}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
