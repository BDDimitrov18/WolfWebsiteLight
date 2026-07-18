/**
 * Prefix a public-asset path with the deploy base path.
 *
 * On GitHub Pages the site is served under a subpath (e.g. "/WolfWebsite").
 * Because we use `images.unoptimized`, next/image does not prepend the base
 * path to `src`, so every reference to a file in /public must go through here.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}

/**
 * Screenshot files are replaced in place under stable names, so browsers
 * that cached an old capture (or a placeholder plate) keep showing it.
 * Bump this once per screenshot batch — the query string changes every
 * /screenshots URL and forces a fresh fetch.
 *
 * Served as WebP (~47% lighter than the PNG originals). New captures
 * arrive as PNG — convert with sharp ({ quality: 84 }) into
 * /public/screenshots/<slot>.webp and bump the version.
 */
const SCREENSHOT_VERSION = 3;

export function screenshot(slot: string): string {
  return asset(`/screenshots/${slot}.webp?v=${SCREENSHOT_VERSION}`);
}

/**
 * Inline previews render at most ~900px wide, so they get a srcset
 * with the pre-generated 960px variant (`<slot>-960.webp`, ~22KB vs
 * ~70KB full) — the full capture stays reserved for the lightbox.
 */
export function screenshotSrcSet(slot: string): string {
  return [
    `${asset(`/screenshots/${slot}-960.webp?v=${SCREENSHOT_VERSION}`)} 960w`,
    `${screenshot(slot)} 1919w`,
  ].join(", ");
}
