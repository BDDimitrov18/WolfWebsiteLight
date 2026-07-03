"use client";

import { lazy, Suspense, useSyncExternalStore } from "react";

/**
 * Client-only, code-split loader for the Three.js hero scene — three.js
 * stays out of the main bundle and never renders during SSR/export.
 */
const TerrainScene = lazy(() => import("./TerrainScene"));

const emptySubscribe = () => () => {};

export function TerrainCanvas({ className = "" }: { className?: string }) {
  // false during SSR/first paint, true once hydrated on the client
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <TerrainScene className={className} />
    </Suspense>
  );
}
