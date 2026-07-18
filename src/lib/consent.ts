/**
 * Cookie-consent state, GDPR-real: the choice is enforced, not just
 * displayed. Google Analytics only mounts after analytics consent
 * (basic consent mode), and Google Consent Mode v2 signals are kept
 * in sync so a future Google Ads account inherits correct flags.
 *
 * The choice itself lives in localStorage — first-party, never sent
 * anywhere, removable by clearing site data (and documented in the
 * privacy policy).
 */

export interface Consent {
  analytics: boolean;
  marketing: boolean;
  ts: number;
}

const KEY = "wolf.consent.v1";
export const CONSENT_OPEN_EVENT = "wolf:consent-open";

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (typeof c.analytics !== "boolean" || typeof c.marketing !== "boolean") return null;
    return c;
  } catch {
    return null;
  }
}

/* gtag() must push the live `arguments` object — gtag.js ignores
   plain arrays — hence the old-style function and the disables. */
function gtag() {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

/** Google Consent Mode v2 update, mapped from our two categories. */
export function applyConsentToGtag(c: Consent) {
  if (typeof window === "undefined") return;
  // @ts-expect-error -- gtag consumes untyped varargs by design
  gtag("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  });
}

export function saveConsent(v: { analytics: boolean; marketing: boolean }): Consent {
  const c: Consent = { ...v, ts: Date.now() };
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* storage unavailable — the session still honours the choice */
  }
  applyConsentToGtag(c);
  return c;
}

/** Re-opens the banner (footer "Бисквитки" link). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
