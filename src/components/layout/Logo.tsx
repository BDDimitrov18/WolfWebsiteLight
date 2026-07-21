"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";

/**
 * Brand lockup. Uses the existing logo files from Wolf.Desktop/Assets
 * directly (copied into /public/brand), per Deliverables §10.
 * `tone="light"` → white mark for dark surfaces. Clicking it always
 * lands at the top of the homepage — already there, it scrolls up
 * instead of re-navigating (which would restore the scroll position).
 */
export function Logo({
  tone = "light",
  href = "/",
  withWordmark = true,
}: {
  tone?: "light" | "dark";
  href?: string | null;
  withWordmark?: boolean;
}) {
  const pathname = usePathname();
  // 128px WebP renders — the marks display at 36px, and the original
  // PNGs were 168KB of header weight on every page.
  // LIGHT edition: `tone="light"` still means "the site's default
  // surface" at every call site — but that surface is now paper, so
  // it maps to the BLACK mark (the wordmark color already flips via
  // the remapped paper-50/ink-900 tokens).
  const src =
    tone === "light"
      ? "/brand/wolf_logo_black_transparent.webp"
      : "/brand/wolf_logo_white_tight.webp";

  const onClick = (e: React.MouseEvent) => {
    if (href !== "/" || pathname !== "/") return;
    e.preventDefault();
    // Drop any /#section hash so the URL matches where we land.
    history.pushState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0 });
  };

  const inner = (
    // flex-none: in a crowded header row the logo must never be the
    // element that shrinks — a squeezed link lets the wordmark paint
    // over its neighbours (seen in the docs header).
    <span className="flex flex-none items-center gap-2.5">
      <Image
        src={asset(src)}
        alt="Wolf"
        width={40}
        height={40}
        preload
        className="h-9 w-9 object-contain"
      />
      {withWordmark && (
        <span
          className="whitespace-nowrap font-display text-2xl tracking-tight"
          style={{ color: tone === "light" ? "var(--color-paper-50)" : "var(--color-ink-900)" }}
        >
          Wolf
        </span>
      )}
    </span>
  );

  if (href === null) return inner;
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="Wolf — home"
      className="inline-flex flex-none"
    >
      {inner}
    </Link>
  );
}
