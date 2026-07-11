"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed preference hook. The personalization layer
 * runs entirely on it — no backend, no cookies, nothing leaves the
 * browser. SSR and storage-less browsers read `null`, so every use
 * must degrade to the default experience.
 *
 * useSyncExternalStore keeps this hydration-safe (the server snapshot
 * is used for the first client render) and satisfies the project's
 * no-setState-in-effect lint contract.
 */

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function usePref(
  key: string,
): [string | null, (value: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );

  const set = useCallback(
    (v: string | null) => {
      try {
        if (v === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, v);
        }
      } catch {
        /* storage unavailable — the UI simply stays un-personalized */
      }
      emit();
    },
    [key],
  );

  return [value, set];
}

/** Write a preference outside React (e.g. from an effect). */
export function setPref(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* best effort */
  }
  emit();
}
