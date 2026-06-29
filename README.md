# Wolf — Marketing Website

Marketing site + documentation scaffold for **Wolf**, a multi-user management
system for surveying, cadastral and legal-documentation practices (Bulgaria).

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** and
**Framer Motion**. Bilingual **BG / EN** with a language toggle. Fully
responsive and reduced-motion / no-JS safe.

All product copy is grounded in `../Wolf.Desktop/PROJECT_OVERVIEW.md`
(see `VERIFICATION.md` for the claim-by-claim audit).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

## Project structure

```
src/
  app/
    layout.tsx            Root layout — fonts (Inter / Playfair / IBM Plex Mono),
                          LocaleProvider, metadata, no-JS fallback
    page.tsx              Landing page (composes the sections)
    globals.css           Design tokens (§5): palette, type scale, spacing,
                          radius, shadows + CSS scroll-reveal utilities
    docs/                 /docs scaffold (getting-started, model, filters, reports)
  components/
    layout/               Navbar, Footer, Logo, LanguageToggle
    sections/             Hero, TrustBar, Pillars, FeatureTour, TitleChain,
                          Architecture, Pricing, CTA
    motifs/               Geodesy SVG motifs (compass, contour lines,
                          triangulation, crosshair, compass rose, ideal-parts)
    ui/                   Section, Reveal, ScreenshotFrame
    docs/                 DocsShell, DocsSidebar, DocArticle
  lib/
    i18n/                 LocaleProvider + BG/EN dictionaries (all copy)
    docs/                 Bilingual docs content (data-driven, easy to extend)
public/
  brand/                  Logo files copied from Wolf.Desktop/Assets
  screenshots/            App screenshots (the feature-tour "slots")
```

## Design tokens (§5)

Defined in `src/app/globals.css` under `@theme`:

- **Palette** — `ink-*` (deep navy), `ember-*` (burnt orange — the compass
  pivot), `paper-*` (warm cream), `survey-*` (muted teal accent).
- **Type** — `--font-display` (Playfair Display), `--font-sans` (Inter),
  `--font-mono` (IBM Plex Mono). All carry Cyrillic for Bulgarian.
- **Scale / radius / shadows / easing** — fluid `--fs-*`, `--radius-*`,
  `--shadow-*`, `--ease-*`.

## Dropping in real screenshots & videos

The feature tour and hero use **named slots**. To replace an image, drop a PNG
into `public/screenshots/` matching the slot name (the slots in use:
`OrdersScreen`, `PlotsTab`, `Callendar`, `FiltersOrders`, `InqueriesTab`,
`AdminPanel`). The slot name is rendered on hover in the corner of each frame,
and stored as `data-screenshot-slot` on the figure element.

**Videos** — the `WolfVideos/*.mp4` demos can be added later: a `<video>` can
replace any `ScreenshotFrame` in `src/components/sections/FeatureTour.tsx`
(the `TOUR` config maps each feature to its slot). The frame chrome and layout
are reusable as-is.

## Internationalisation

`src/lib/i18n/dictionaries.ts` holds the full BG + EN copy with a 1:1 structure.
`useT()` resolves dot-paths (`t("hero.title")`); `useLocale()` exposes the
current locale and setter. Locale is persisted to `localStorage` and seeded
from the browser language (BG default).

## Accessibility & performance

- `prefers-reduced-motion` honoured — reveals render statically, no animation.
- No-JS fallback ensures all content is visible (see `layout.tsx` `<noscript>`).
- Scroll-reveal uses CSS scroll-driven animations (`.reveal-css`) — content is
  always visible by default; the animation is pure progressive enhancement.
- All routes are statically prerendered.
