import type { MetadataRoute } from "next";

// Required with `output: export` — the route renders once at build.
export const dynamic = "force-static";

/**
 * Built into out/robots.txt at export time.
 *
 * LIGHT edition: this site is a word-for-word duplicate of the main
 * (dark) WolfWebsite — if search engines index both, they compete for
 * the same queries and dilute the main site's ranking. So the light
 * twin asks crawlers to stay out and publishes no sitemap. If the
 * light site is ever promoted to be THE site, restore
 * `rules: { userAgent: "*", allow: "/" }` + the sitemap line, and
 * disallow the dark one instead.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
