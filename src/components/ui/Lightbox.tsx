"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

/**
 * Full-screen viewer for product screenshots. The dense desktop UI is
 * unreadable at column width — this shows it at (almost) full size.
 * Closes on backdrop click, ✕ or Escape. Focus moves into the dialog
 * on open, Tab is trapped inside it, and focus returns to the opener
 * on close.
 */
export function Lightbox({
  src,
  alt,
  title,
  onClose,
}: {
  src: string;
  alt: string;
  title?: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLElement>(null);

  // The dialog effect must run exactly once per open — a parent
  // re-render passing a fresh onClose closure must not re-run it
  // (that would replay the intro tween and re-steal focus).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "Tab") {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        // Clicking a non-focusable spot parks focus on <body>; pull the
        // next Tab back into the dialog instead of letting it escape.
        if (!panelRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
          return;
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      gsap.fromTo(
        "[data-lightbox-panel]",
        { autoAlpha: 0, scale: 0.965 },
        { autoAlpha: 1, scale: 1, duration: 0.45, ease: "expo.out" },
      );
      gsap.fromTo(
        "[data-lightbox-backdrop]",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3 },
      );
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      data-lenis-prevent
    >
      <div
        data-lightbox-backdrop
        className="absolute inset-0"
        style={{
          background: "color-mix(in srgb, var(--color-ink-950) 88%, transparent)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
        aria-hidden
      />
      {/* Sized by the image itself: as large as the viewport allows —
          the container's padding is the breathing margin, no width cap. */}
      <figure
        ref={panelRef}
        data-lightbox-panel
        className="relative flex max-h-full max-w-full flex-col overflow-hidden rounded-xl border"
        style={{
          borderColor: "color-mix(in srgb, var(--color-paper-100) 14%, transparent)",
          background: "var(--color-ink-900)",
          boxShadow: "var(--shadow-frame)",
        }}
      >
        <div
          className="flex items-center justify-between gap-3 border-b px-4 py-2.5"
          style={{
            borderColor: "color-mix(in srgb, var(--color-paper-100) 9%, transparent)",
            background: "var(--color-ink-950)",
          }}
        >
          <span className="truncate font-mono text-xs tracking-wide text-ink-300">
            {title ?? alt}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-md border border-ink-600 text-paper-100 transition-colors hover:border-ember-500/60 hover:text-ember-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="relative min-h-0 flex-1 overflow-auto">
          {/* Fill the screen: viewport height minus the container's
              margin and the title bar. Width follows via aspect ratio,
              capped by max-w-full on narrow screens. */}
          <Image
            src={src}
            alt={alt}
            width={1919}
            height={1032}
            sizes="95vw"
            className="block h-auto w-auto max-w-full"
            style={{ maxHeight: "calc(100vh - 7.5rem)" }}
            loading="eager"
          />
        </div>
      </figure>
    </div>,
    document.body,
  );
}
