import type { MetadataRoute } from "next";

// Required with `output: export` — the route renders once at build.
export const dynamic = "force-static";

/** Built into out/robots.txt at export time; everything is public. */
const ORIGIN = "https://bddimitrov18.github.io";
const BASE = process.env.PAGES_BASE_PATH || "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${ORIGIN}${BASE}/sitemap.xml`,
  };
}
