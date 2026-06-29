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
