/**
 * The one place contact details live — CTA, footer and the privacy page all
 * read from here. Supplied by the owner (2026-07-06).
 */
export const CONTACT = {
  phoneDisplay: "+359 877 139 712",
  phoneHref: "tel:+359877139712",
  email: "bozhidar@wolfsoft.bg",
  /** Every demo-CTA button opens a pre-filled email — the site has
   *  no data server, matching the privacy policy's description. */
  demoHref: `mailto:bozhidar@wolfsoft.bg?subject=${encodeURIComponent(
    "Заявка за демонстративна среща — Wolf",
  )}`,
} as const;
