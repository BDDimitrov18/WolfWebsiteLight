"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Locale } from "./dictionaries";

type Dict = (typeof dictionaries)["bg"];

/**
 * Translation accessor. Overloaded so that the bare call returns `string`
 * (keeps JSX children typing tight), while `t<T>(path)` returns the
 * typed value for arrays/objects.
 */
export interface Translate {
  (path: string): string;
  <T>(path: string): T;
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: Translate;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "wolf.locale";

function resolve(dict: Dict, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      dict,
    );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bg");

  // Hydrate from storage / browser preference after mount. This deliberately
  // runs in an effect (not a render-time initializer) so the server and the
  // first client render agree on the default ("bg") — reading localStorage /
  // navigator during render would cause a hydration mismatch.
  useEffect(() => {
    // Guarded: merely touching localStorage throws under "block all
    // cookies" / some webviews, and an uncaught throw here would tear
    // down the entire hydrated tree.
    let stored: Locale | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    } catch {
      /* storage blocked — fall through to browser language */
    }
    const next: Locale =
      stored === "bg" || stored === "en"
        ? stored
        : typeof navigator !== "undefined" &&
            navigator.language.startsWith("bg")
          ? "bg"
          : "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-mount preference hydration, intentional
    setLocaleState(next);
  }, []);

  // Keep <html lang> and storage in sync.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    () => setLocale(locale === "bg" ? "en" : "bg"),
    [locale, setLocale],
  );

  const tFn = useCallback(
    (path: string) => {
      const dict = dictionaries[locale];
      const value = resolve(dict, path);
      if (value === undefined) {
        // Fall back to BG, then surface the missing key in dev.
        return resolve(dictionaries.bg, path) ?? path;
      }
      return value;
    },
    [locale],
  );
  const t = tFn as unknown as Translate;

  const value = useMemo(
    () => ({ locale, setLocale, toggle, t }),
    [locale, setLocale, toggle, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}

/** Convenience hook returning just the translator. */
export function useT() {
  return useLocale().t;
}
