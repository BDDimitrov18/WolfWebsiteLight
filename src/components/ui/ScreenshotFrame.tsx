import Image from "next/image";
import { asset } from "@/lib/asset";

/**
 * App-window chrome around a product screenshot.
 *
 * `slot` is the clearly-named placeholder key (Deliverables §10): drop a
 * file named `<slot>.png` into /public/screenshots to replace the image.
 * The supplied screenshots are already wired in via `src`.
 */
export function ScreenshotFrame({
  src,
  alt,
  slot,
  title = "Wolf",
  priority = false,
  placeholderNote,
}: {
  src?: string;
  alt: string;
  slot: string;
  title?: string;
  priority?: boolean;
  placeholderNote?: string;
}) {
  const resolved = asset(src ?? `/screenshots/${slot}.png`);
  return (
    <figure
      className="group relative overflow-hidden rounded-xl border"
      style={{
        borderColor: "color-mix(in srgb, var(--color-paper-100) 12%, transparent)",
        background: "var(--color-ink-850)",
        boxShadow: "var(--shadow-frame)",
      }}
      data-screenshot-slot={slot}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 border-b px-4 py-2.5"
        style={{
          borderColor: "color-mix(in srgb, var(--color-paper-100) 9%, transparent)",
          background: "var(--color-ink-900)",
        }}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ember-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-400/40" />
        </span>
        <span className="ml-2 font-mono text-xs tracking-wide text-ink-300">
          {title}
        </span>
      </div>

      {/* Image / slot */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={resolved}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
        {placeholderNote && (
          <figcaption className="pointer-events-none absolute bottom-2 right-2 rounded bg-ink-950/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-300 opacity-0 transition-opacity group-hover:opacity-100">
            {placeholderNote}: {slot}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
