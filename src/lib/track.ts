/**
 * Named GA4 events for the actions that matter commercially — demo
 * CTAs, the inquiry form, video engagement, the booking calendar.
 *
 * Thin wrapper over the gtag dataLayer push. When GA isn't running
 * (no GA_ID, or the visitor declined analytics) the push lands in an
 * inert array and nothing leaves the browser — consent enforcement
 * stays with CookieConsent, callers never need to check.
 */

/* gtag() must push the live `arguments` object — gtag.js ignores
   plain arrays — hence the old-style function and the disables. */
function gtag() {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

export function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  try {
    // @ts-expect-error -- gtag consumes untyped varargs by design
    gtag("event", name, params ?? {});
  } catch {
    /* analytics must never break the UI */
  }
}
