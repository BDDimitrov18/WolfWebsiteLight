"use client";

import { lazy, Suspense, useSyncExternalStore } from "react";
import type { DocLabel } from "./TerrainScene";

/**
 * Client-only, code-split loader for the Three.js hero scene — three.js
 * stays out of the main bundle and never renders during SSR/export.
 */
const TerrainScene = lazy(() => import("./TerrainScene"));

const emptySubscribe = () => () => {};

export function TerrainCanvas({
  className = "",
  docLabels,
}: {
  className?: string;
  docLabels?: DocLabel[];
}) {
  // false during SSR/first paint, true once hydrated on the client
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <TerrainScene className={className} docLabels={docLabels} />
    </Suspense>
  );
}
