/**
 * Named GA4 events for the actions that matter commercially — demo
 * CTAs, the inquiry form, video engagement, the booking calendar.
 *
 * Thin wrapper over the gtag dataLayer push. When GA isn't running
 * (no GA_ID, or the visitor declined analytics) the push lands in an
 * inert array and nothing leaves the browser — consent enforcement
 * stays with CookieConsent, callers never need to check.
 */

import { ADS_CONVERSION_DEMO } from "./analytics";
import { getConsent } from "./consent";

/* gtag() must push the live `arguments` object — gtag.js ignores
   plain arrays — hence the old-style function and the disables. */
function gtag() {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

/**
 * The events that constitute an actual demo request — the three ways a
 * visitor really asks for one (demo-page form, inquiry modal, direct
 * email). Deliberately NOT cta_demo_click: those buttons only navigate
 * to /demo, and counting them would report visitors as conversions.
 */
const DEMO_REQUEST_EVENTS = new Set(["demo_form_submit", "inquiry_submit", "contact_email_click"]);

export function track(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  try {
    // @ts-expect-error -- gtag consumes untyped varargs by design
    gtag("event", name, params ?? {});

    /* Google Ads conversion, only with marketing consent — without it
       the AW destination was never configured and nothing may be sent. */
    if (ADS_CONVERSION_DEMO && DEMO_REQUEST_EVENTS.has(name) && getConsent()?.marketing) {
      // @ts-expect-error -- gtag consumes untyped varargs by design
      gtag("event", "conversion", { send_to: ADS_CONVERSION_DEMO });
    }
  } catch {
    /* analytics must never break the UI */
  }
}
