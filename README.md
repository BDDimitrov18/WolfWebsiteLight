# Wolf — Marketing Website

Marketing site + documentation scaffold for **Wolf**, a multi-user management
system for surveying, cadastral and legal-documentation practices (Bulgaria).

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**,
**GSAP** (ScrollTrigger + SplitText), **Lenis** smooth scrolling and a
**Three.js** hero scene. Bilingual **BG / EN** with a language toggle. Fully
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
                          LocaleProvider + ExperienceProvider, metadata,
                          no-JS fallback, grain overlay
    page.tsx              Landing page (sections + Cursor + CoordReadout)
    globals.css           Design tokens (§5): palette, type scale, spacing,
                          radius, shadows + experience-layer CSS (Lenis,
                          intro gating with failsafe, marquee, cursor, grain)
    docs/                 /docs scaffold (getting-started, model, filters, reports)
  components/
    providers/            ExperienceProvider — Lenis smooth scroll driven by the
                          GSAP ticker, capability flags, preloader hand-off
    three/                TerrainCanvas / TerrainScene — the "living survey"
                          Three.js hero terrain (code-split, client-only)
    layout/               Navbar (hide-on-scroll + progress hairline), Footer,
                          Logo, LanguageToggle
    sections/             Hero, TrustBar (marquee + counters), Pillars (tilt),
                          FeatureTour (sticky-frame tour), TitleChain,
                          Architecture (scrub-drawn net), Pricing, CTA
    motifs/               Geodesy SVG motifs (compass, contour lines,
                          triangulation, crosshair, compass rose, ideal-parts)
    ui/                   Section, Reveal (GSAP), SplitHeading, Magnetic,
                          Counter, Marquee, TiltCard, Cursor, CoordReadout,
                          Preloader, ScreenshotFrame
    docs/                 DocsShell, DocsSidebar, DocArticle
  lib/
    gsap.ts               Central GSAP registration (ScrollTrigger, SplitText)
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

## The experience layer

- **Preloader** — instrument-calibration plate (coordinates tick to Sofia),
  once per tab session, hands off into the hero intro.
- **Hero** — Three.js triangulated terrain with survey-station points, an
  ember LiDAR sweep and mouse parallax; SplitText headline choreography.
- **Scroll** — Lenis smooth scrolling synced to GSAP ScrollTrigger; the
  feature tour keeps a sticky product frame that crossfades per station.
- **Microinteractions** — magnetic buttons, tilt cards, reticle cursor
  (mouse-grade pointers only), count-up stats, module marquee, and a fixed
  coordinate HUD that ticks northing/easting as you traverse the page.

## Accessibility & performance

- `prefers-reduced-motion` honoured everywhere — no preloader, static terrain
  frame, instant reveals, no marquee/cursor.
- No-JS fallback: content ships visible in the HTML; intro-hidden elements are
  gated behind an `html.js` class **plus a CSS failsafe** that force-reveals
  after 2.8 s even if scripts crash.
- Three.js is code-split and client-only; the render loop pauses when the
  hero is offscreen or the tab is hidden; DPR is clamped; geometry is halved
  on mobile. No WebGL → SVG contours remain as the backdrop.
- All routes are statically prerendered.
