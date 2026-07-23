/**
 * Google Analytics 4 measurement ID ("G-…").
 *
 * Single switch for all analytics: while this is empty no GA script is
 * emitted at all (zero bytes shipped to visitors). Paste the real ID from
 * the GA4 property (Admin → Data streams → Web) to go live.
 */
export const GA_ID = "G-13JBTSR7PQ";

/**
 * Google Ads tag ID ("AW-…"), from the same Google tag as GA above.
 *
 * Same switch semantics: empty string ships nothing. The tag itself
 * only ever loads with marketing consent (see CookieConsent).
 */
export const ADS_ID = "AW-18345207747";

/**
 * Google Ads conversion label for a demo request ("AW-…/…" send_to).
 * Fired by track() on the events that constitute an actual request,
 * and only with marketing consent.
 */
export const ADS_CONVERSION_DEMO = "AW-18345207747/mAGvCN2Mv9UcEMPP1qtE";
