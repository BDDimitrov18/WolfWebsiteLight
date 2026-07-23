"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ADS_ID, GA_ID } from "@/lib/analytics";
import { CALENDAR_URL } from "@/lib/booking";
import {
  CONSENT_OPEN_EVENT,
  getConsent,
  saveConsent,
  type Consent,
} from "@/lib/consent";
import { useT } from "@/lib/i18n/LocaleProvider";

/* gtag() must push the live `arguments` object — gtag.js ignores
   plain arrays — hence the old-style function and the disables. */
function gtag() {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

/**
 * Google Ads tag ("AW-…"), mounted only with marketing consent. GA and
 * Ads are two destinations of the same Google tag, so when GA is already
 * running this just adds a config; the script itself is only fetched for
 * the visitor who granted marketing while declining analytics.
 */
function GoogleAds({ loadScript }: { loadScript: boolean }) {
  useEffect(() => {
    // @ts-expect-error -- gtag consumes untyped varargs by design
    gtag("js", new Date());
    // @ts-expect-error -- gtag consumes untyped varargs by design
    gtag("config", ADS_ID);
  }, []);
  return loadScript ? (
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} />
  ) : null;
}

/**
 * The consent banner + the analytics loader, in one place so the
 * enforcement is structural: <GoogleAnalytics> can only mount here,
 * and only when the stored consent grants analytics. While neither
 * GA_ID nor CALENDAR_URL is configured the site sets no cookies at
 * all, so the whole component renders nothing.
 */
export function CookieConsent() {
  const t = useT();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot post-mount storage read, intentional
    setMounted(true);
    const c = getConsent();
    setConsent(c);
    if (!c) setVisible(true);

    const onOpen = () => {
      const cur = getConsent();
      setAnalytics(cur?.analytics ?? true);
      setMarketing(cur?.marketing ?? true);
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  // Nothing external configured → no cookies exist → no banner.
  if (!GA_ID && !ADS_ID && !CALENDAR_URL) return null;
  if (!mounted) return null;

  const decide = (a: boolean, m: boolean) => {
    setConsent(saveConsent({ analytics: a, marketing: m }));
    setVisible(false);
    setExpanded(false);
  };

  return (
    <>
      {GA_ID && consent?.analytics ? <GoogleAnalytics gaId={GA_ID} /> : null}
      {ADS_ID && consent?.marketing ? (
        <GoogleAds loadScript={!(GA_ID && consent.analytics)} />
      ) : null}

      {visible && (
        <div
          role="dialog"
          aria-label={t("consent.title")}
          className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:p-5"
        >
          <div
            className="mx-auto max-w-3xl rounded-xl border p-5 shadow-ambient sm:p-6"
            style={{
              background: "color-mix(in srgb, var(--color-ink-950) 97%, transparent)",
            }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember-400">
              {t("consent.title")}
            </p>
            <p
              className="mt-2.5 text-sm leading-relaxed"
              style={{
                color: "color-mix(in srgb, var(--color-paper-100) 86%, transparent)",
              }}
            >
              {t("consent.body")}{" "}
              <Link href="/privacy" className="text-steel-300 underline underline-offset-4">
                {t("consent.privacy")}
              </Link>
            </p>

            {expanded && (
              <div className="mt-4 space-y-2.5 border-t pt-4">
                <label className="flex items-baseline gap-3 text-sm text-paper-100">
                  <input type="checkbox" checked disabled className="translate-y-px accent-current" />
                  {t("consent.catNecessary")}
                </label>
                <label className="flex cursor-pointer items-baseline gap-3 text-sm text-paper-100">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="translate-y-px accent-current"
                  />
                  {t("consent.catAnalytics")}
                </label>
                <label className="flex cursor-pointer items-baseline gap-3 text-sm text-paper-100">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="translate-y-px accent-current"
                  />
                  {t("consent.catMarketing")}
                </label>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {expanded ? (
                <button
                  type="button"
                  onClick={() => decide(analytics, marketing)}
                  className="btn btn-primary h-9 px-4 py-0 text-sm"
                >
                  {t("consent.save")}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => decide(true, true)}
                    className="btn btn-primary h-9 px-4 py-0 text-sm"
                  >
                    {t("consent.acceptAll")}
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(false, false)}
                    className="btn btn-ghost h-9 px-4 py-0 text-sm"
                  >
                    {t("consent.necessary")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="ml-auto text-sm text-ink-300 underline underline-offset-4 transition-colors hover:text-paper-50"
                  >
                    {t("consent.settings")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
