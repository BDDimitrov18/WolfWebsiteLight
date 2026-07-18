/**
 * The one place contact details live — CTA, footer and the privacy page all
 * read from here. Supplied by the owner (2026-07-06).
 */
export const CONTACT = {
  phoneDisplay: "+359 877 139 712",
  phoneHref: "tel:+359877139712",
  email: "bddimitrov18@gmail.com",
  /** Every demo-CTA button opens a pre-filled email — the site has
   *  no data server, matching the privacy policy's description. */
  demoHref: `mailto:bddimitrov18@gmail.com?subject=${encodeURIComponent(
    "Заявка за демонстративна среща — Wolf",
  )}`,
} as const;
