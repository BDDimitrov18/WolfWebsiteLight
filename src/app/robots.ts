import type { MetadataRoute } from "next";

// Required with `output: export` — the route renders once at build.
export const dynamic = "force-static";

/**
 * Built into out/robots.txt at export time.
 *
 * The light edition is THE site (owner decision, 2026-07-21): it
 * serves https://wolfsoft.bg, is fully crawlable and publishes the
 * sitemap. The dark twin on github.io is the no-index copy.
 */
const ORIGIN = "https://wolfsoft.bg";
const BASE = process.env.PAGES_BASE_PATH || "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${ORIGIN}${BASE}/sitemap.xml`,
  };
}
