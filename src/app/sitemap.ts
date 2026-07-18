import type { MetadataRoute } from "next";

// Required with `output: export` — the route renders once at build.
export const dynamic = "force-static";

/**
 * Built into out/sitemap.xml at export time. The origin is the GitHub
 * Pages host; PAGES_BASE_PATH ("/WolfWebsite" in CI) prefixes every
 * path the same way the deploy serves them. When the custom domain
 * arrives, change ORIGIN and the base path handles itself (empty).
 */
const ORIGIN = "https://bddimitrov18.github.io";
const BASE = process.env.PAGES_BASE_PATH || "";

// Every indexable route; trailing slashes match `trailingSlash: true`.
const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "", priority: 1 },
  { path: "about", priority: 0.7 },
  { path: "features", priority: 0.9 },
  { path: "module", priority: 0.8 },
  { path: "architecture", priority: 0.8 },
  { path: "pricing", priority: 0.9 },
  { path: "demo", priority: 0.9 },
  { path: "docs", priority: 0.7 },
  { path: "docs/model", priority: 0.5 },
  { path: "docs/orders", priority: 0.5 },
  { path: "docs/plots", priority: 0.5 },
  { path: "docs/clients", priority: 0.5 },
  { path: "docs/calendar", priority: 0.5 },
  { path: "docs/filters", priority: 0.5 },
  { path: "docs/archive", priority: 0.5 },
  { path: "docs/reports", priority: 0.5 },
  { path: "docs/invoicing", priority: 0.5 },
  { path: "docs/templates", priority: 0.5 },
  { path: "docs/admin", priority: 0.5 },
  { path: "terms", priority: 0.3 },
  { path: "privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${ORIGIN}${BASE}/${path ? `${path}/` : ""}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
