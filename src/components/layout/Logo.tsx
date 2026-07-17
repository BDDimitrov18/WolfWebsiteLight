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
  const src =
    tone === "light"
      ? "/brand/wolf_logo_white_tight.png"
      : "/brand/wolf_logo_black_transparent.png";

  const onClick = (e: React.MouseEvent) => {
    if (href !== "/" || pathname !== "/") return;
    e.preventDefault();
    // Drop any /#section hash so the URL matches where we land.
    history.pushState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0 });
  };

  const inner = (
    <span className="flex items-center gap-2.5">
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
          className="font-display text-2xl tracking-tight"
          style={{ color: tone === "light" ? "var(--color-paper-50)" : "var(--color-ink-900)" }}
        >
          Wolf
        </span>
      )}
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} onClick={onClick} aria-label="Wolf — home" className="inline-flex">
      {inner}
    </Link>
  );
}
