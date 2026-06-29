import type { NextConfig } from "next";

// For GitHub Pages we ship a fully static export. The base path is injected by
// the deploy workflow (actions/configure-pages outputs it, e.g. "/WolfWebsite")
// so links and assets resolve under the project-site subpath. Locally it is
// empty, so `npm run dev` works at the root.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // The Next image optimizer isn't available on a static host.
    unoptimized: true,
  },
  // With `unoptimized` images, next/image does NOT prefix the base path onto
  // the src, so we do it ourselves via `asset()` — expose the value here.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
