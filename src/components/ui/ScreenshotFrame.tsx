"use client";

import { useState } from "react";
import Image from "next/image";
import { asset, screenshot } from "@/lib/asset";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Lightbox } from "@/components/ui/Lightbox";

/**
 * App-window chrome around a product screenshot. Click to open the
 * full-size lightbox — the desktop UI is dense, so the inline frame is
 * a preview, not the reading copy.
 *
 * `slot` is the clearly-named placeholder key (Deliverables §10): drop a
 * file named `<slot>.png` into /public/screenshots to replace the image.
 */
export function ScreenshotFrame({
  src,
  alt,
  slot,
  title = "Wolf",
  preload = false,
}: {
  src?: string;
  alt: string;
  slot: string;
  title?: string;
  preload?: boolean;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const resolved = src ? asset(src) : screenshot(slot);

  return (
    <>
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
          <span className="ml-2 truncate font-mono text-xs tracking-wide text-ink-300">
            {title}
          </span>
        </div>

        {/* Image — native app aspect, nothing cropped, click to enlarge */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${t("features.zoomHint")}: ${alt}`}
          className="relative block aspect-[1919/1032] w-full cursor-zoom-in"
        >
          <Image
            src={resolved}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            preload={preload}
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
          {/* Zoom affordance: always visible on touch (no hover to reveal
              it), hover/focus-revealed on fine pointers */}
          <span
            className="pointer-events-none absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-paper-100 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
            style={{ background: "color-mix(in srgb, var(--color-ink-950) 82%, transparent)" }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.4 9.4 12.6 12.6M6 4v4M4 6h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {t("features.zoomHint")}
          </span>
        </button>
      </figure>

      {open && (
        <Lightbox
          src={resolved}
          alt={alt}
          title={title}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
