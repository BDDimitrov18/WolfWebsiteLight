/**
 * Geodesy motifs — reusable SVG components (Deliverables §10).
 * The visual language of land surveying: topographic contour lines,
 * triangulation networks, registration crosshairs, a compass mark.
 *
 * All use `currentColor` so they tint with text color, and are purely
 * decorative (aria-hidden). Animations are transform/opacity only.
 */
import type { SVGProps } from "react";

/* ----------------------------------------------------------------
   Compass mark — a clean geometric echo of the Wolf logo (a drafting
   compass that draws a "W"). Used where the raster logo would be too
   heavy or needs to animate / tint.
   ---------------------------------------------------------------- */
export function CompassMark({
  className,
  pivot = "var(--color-ember-500)",
  animated = false,
  ...props
}: SVGProps<SVGSVGElement> & { pivot?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* left leg */}
      <path
        d="M60 30 L30 96 L40 96 L60 50 Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="none"
      />
      {/* right leg */}
      <path
        d="M60 30 L90 96 L80 96 L60 50 Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="none"
      />
      {/* the wide outer W strokes */}
      <path
        d="M22 38 L44 92 M98 38 L76 92"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* pivot ring */}
      <circle cx="60" cy="26" r="11" stroke="currentColor" strokeWidth="2.4" />
      {/* pivot dot */}
      <circle
        cx="60"
        cy="26"
        r="4.6"
        fill={pivot}
        className={animated ? "animate-pulse-pivot" : undefined}
      />
    </svg>
  );
}

/* ----------------------------------------------------------------
   Topographic contour lines — concentric, organic elevation rings.
   The signature background texture of the whole site.
   ---------------------------------------------------------------- */
export function ContourLines({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  // Concentric, slightly offset closed curves → elevation contours.
  const rings = [40, 78, 116, 154, 192, 230, 268, 306, 344];
  return (
    <svg
      viewBox="0 0 720 720"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
        transform="translate(360 360)"
      >
        {rings.map((r, i) => (
          <path
            key={r}
            d={contourPath(r, i)}
            transform={`translate(${(i % 2 === 0 ? 1 : -1) * i * 4} ${i * 3})`}
          />
        ))}
      </g>
    </svg>
  );
}

// Build a wobbly closed loop of radius r (deterministic — no Math.random).
function contourPath(r: number, seed: number): string {
  const pts = 16;
  const out: string[] = [];
  for (let k = 0; k <= pts; k++) {
    const a = (k / pts) * Math.PI * 2;
    const wobble =
      1 +
      0.06 * Math.sin(a * 3 + seed) +
      0.04 * Math.cos(a * 5 - seed * 1.7);
    const x = Math.cos(a) * r * wobble;
    const y = Math.sin(a) * r * 0.82 * wobble;
    out.push(`${k === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return out.join(" ") + " Z";
}

/* ----------------------------------------------------------------
   Triangulation network — survey control points joined into a mesh.
   ---------------------------------------------------------------- */
export function TriangulationField({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  const nodes = [
    [60, 80], [200, 40], [330, 120], [120, 210], [260, 240],
    [400, 200], [180, 330], [330, 330], [60, 300], [420, 90],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [2, 5],
    [3, 4], [4, 5], [3, 6], [4, 6], [4, 7], [6, 7], [3, 8],
    [6, 8], [5, 9], [2, 9],
  ];
  return (
    <svg
      viewBox="0 0 460 380"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.45">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      <g fill="currentColor">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.4 : 2.2} />
        ))}
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------
   Registration crosshair — a surveyor's benchmark / target mark.
   ---------------------------------------------------------------- */
export function Crosshair({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M32 2 V20 M32 44 V62 M2 32 H20 M44 32 H62"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ----------------------------------------------------------------
   Compass rose — a slow-rotating decorative bearing indicator.
   ---------------------------------------------------------------- */
export function CompassRose({ className, ...props }: SVGProps<SVGSVGElement>) {
  const ticks = Array.from({ length: 24 });
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <g className="animate-sweep" style={{ transformOrigin: "100px 100px" }}>
        {ticks.map((_, i) => {
          const major = i % 6 === 0;
          const a = (i / ticks.length) * Math.PI * 2;
          const r1 = major ? 78 : 84;
          // Rounded: Math.sin/cos results can differ in the last ulp between
          // JS engines (Node SSR vs browser) → hydration mismatch otherwise.
          const x1 = +(100 + Math.cos(a) * r1).toFixed(3);
          const y1 = +(100 + Math.sin(a) * r1).toFixed(3);
          const x2 = +(100 + Math.cos(a) * 92).toFixed(3);
          const y2 = +(100 + Math.sin(a) * 92).toFixed(3);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={major ? 2 : 1}
              opacity={major ? 0.7 : 0.4}
            />
          );
        })}
        {/* the bearing needle */}
        <path d="M100 24 L108 100 L100 116 L92 100 Z" fill="var(--color-ember-500)" opacity="0.9" />
        <path d="M100 176 L108 100 L92 100 Z" fill="currentColor" opacity="0.4" />
      </g>
      <circle cx="100" cy="100" r="4" fill="var(--color-ember-500)" />
    </svg>
  );
}

/* ----------------------------------------------------------------
   Corner marks — the registration crosses drawn at the corners of a
   survey plan sheet. Wrap any relatively-positioned box to make it
   read as a drafted cell rather than a generic card.
   ---------------------------------------------------------------- */
export function CornerMarks({
  className = "",
  size = 14,
  inset = -7,
}: {
  className?: string;
  size?: number;
  inset?: number;
}) {
  const arm = size / 2;
  const cross = (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={`M${arm} 0 V${size} M0 ${arm} H${size}`}
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
  const pos = `${inset}px`;
  return (
    <span aria-hidden className={`pointer-events-none ${className}`}>
      <span className="absolute" style={{ top: pos, left: pos }}>{cross}</span>
      <span className="absolute" style={{ top: pos, right: pos }}>{cross}</span>
      <span className="absolute" style={{ bottom: pos, left: pos }}>{cross}</span>
      <span className="absolute" style={{ bottom: pos, right: pos }}>{cross}</span>
    </span>
  );
}

/* ----------------------------------------------------------------
   Dimension rule — a drafting dimension line: hairline run between
   two vertical end ticks. Used as a measured section divider. Only
   axis-aligned strokes, so it stretches to any width cleanly
   (preserveAspectRatio none + non-scaling strokes).
   ---------------------------------------------------------------- */
export function DimensionRule({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M0.5 0 V12 M399.5 0 V12"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0.5 6 H399.5"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ----------------------------------------------------------------
   Sheet stamp — the round ink stamp of Bulgarian paperwork. Purely
   decorative (aria-hidden); the ring text is passed in so both
   locales can stamp their own wording.
   ---------------------------------------------------------------- */
export function SheetStamp({
  ring,
  center,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { ring: string; center: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="2" opacity="0.9" />
      <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="80" cy="80" r="46" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <defs>
        <path id="stamp-ring" d="M80 21 a59 59 0 1 1 -0.01 0" fill="none" />
      </defs>
      <text
        fontSize="11.5"
        letterSpacing="2.6"
        fill="currentColor"
        style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
      >
        <textPath href="#stamp-ring" startOffset="0">
          {ring}
        </textPath>
      </text>
      <text
        x="80"
        y="76"
        textAnchor="middle"
        fontSize="13"
        letterSpacing="1.5"
        fill="currentColor"
        style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
      >
        {center.split("\n").map((line, i) => (
          <tspan key={i} x="80" dy={i === 0 ? 0 : 16}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
}

/* ----------------------------------------------------------------
   Ideal-parts glyph — fractional ownership (e.g. 1/3), the heart of
   the cadastral title-chain model.
   ---------------------------------------------------------------- */
export function IdealPartsGlyph({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="6" y="6" width="68" height="68" rx="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 40 H74 M40 6 V74" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M6 6 L40 40 L6 40 Z"
        fill="var(--color-ember-500)"
        opacity="0.85"
      />
    </svg>
  );
}
