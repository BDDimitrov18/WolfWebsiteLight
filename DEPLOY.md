# Deployment — WolfWebsite

Handoff runbook: everything needed to build, deploy, verify and maintain the
live site.

## Where it lives

- **Live site:** https://bddimitrov18.github.io/WolfWebsite/
- **Repo:** https://github.com/BDDimitrov18/WolfWebsite (public — never commit
  anything sensitive)
- **Hosting:** GitHub Pages, deployed by `.github/workflows/deploy.yml`

## How a deploy happens

Every push to `main` (or a manual `workflow_dispatch`) triggers the workflow:

1. `npm ci` on Node 22.
2. `npm run build` — Next.js **static export** to `./out`, with
   `PAGES_BASE_PATH` injected from `actions/configure-pages` (resolves to
   `/WolfWebsite`). All internal asset URLs must go through `src/lib/asset.ts`
   for this to work; `metadataBase` is `https://bddimitrov18.github.io`.
3. `actions/deploy-pages@v4` publishes the artifact.

There is no staging environment — `main` is production.

## Known issue: transient deploy failures

The Pages deploy step fails **often** with a transient "Deployment failed —
try again later" error (observed needing up to 3 attempts). Always watch a
push with this retry loop (Git Bash):

```bash
run=$(gh run list --workflow deploy.yml --limit 1 --json databaseId -q '.[0].databaseId')
for i in 1 2 3; do
  gh run watch "$run" --exit-status && { echo "attempt $i: success"; break; }
  echo "attempt $i: failure"; gh run rerun "$run" --failed; sleep 20
done
```

A failed deploy leaves the previous version live (no partial states).

## Verifying after deploy

Grep the live HTML for a string the change introduced, e.g.:

```bash
curl -s https://bddimitrov18.github.io/WolfWebsite/docs/invoicing/ | grep -c "Обща фактура"
```

For visual checks run the dev server (`npm run dev`, port 3000) and the
puppeteer scripts in the session scratchpad pattern (`puppeteer-core` +
system Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`).
Note: docs URLs need a **trailing slash** when curling (`/docs/invoicing/`);
without it you may hit a redirect status.

## Local commands

- `npm run dev` — dev server on :3000. If content looks stale, the watcher
  may have died: kill the node process holding :3000 and restart.
- `npm run build` — full static export incl. TypeScript check (this is the CI
  build).
- `npm run lint` — eslint.

## Content architecture (what to edit where)

- **All copy (BG + EN):** `src/lib/i18n/dictionaries.ts` — nav, hero, feature
  tour, pricing, footer (incl. `footer.version` — the "Описана версия" stamp,
  currently **1.0.24**), privacy page.
- **Docs pages:** `src/lib/docs/content.ts` (12 bilingual pages). Adding a page
  = append to `DOC_PAGES` + create `src/app/docs/<slug>/page.tsx` (5-line
  wrapper) + extend the `navKey` union.
- **Feature tour stops:** `TOUR` array in
  `src/components/sections/FeatureTour.tsx` (key → dictionary entry, slot →
  screenshot).
- **Screenshots:** `public/screenshots/<slot>.png`, native app aspect
  1919×1032. Placeholders awaiting real captures: `InvoiceDraft.png`,
  `TemplatesScreen.png`, `GenerateDocument.png`. Outdated: `InvoicesTab.png`,
  `OrdersScreen.png`, `FiltersOrders.png`, `InqueriesTab.png`,
  `LoginScreen.png` (shows v1.0.15). Owner drops new captures in
  `../Wolf.Desktop/Wolf.Desktop/WolfScreenshots/` — copy them over under the
  exact slot filenames.
- **Claim auditing:** every marketing/docs claim must be traceable —
  update `VERIFICATION.md` whenever copy changes. Several current claims are
  sourced to the app's *uncommitted working tree* (invoice generator, shared
  invoices, help, task colors); the app HEAD is Release 1.0.24.
- **Google Analytics:** wired via `@next/third-parties` behind `GA_ID` in
  `src/lib/analytics.ts` — currently `""` (nothing ships). Paste the real
  `G-…` measurement ID and redeploy to enable.

## Gotchas

- PowerShell 5.1 mangles quotes/UTF-8: use `git commit -F <file>` (never `-m`
  with Cyrillic), and don't round-trip UTF-8 files through PS string ops.
- The site is BG-first; EN mirrors BG 1:1 in structure (`typeof bg`).
- Product wording rules: „имот" not „парцел", „практика" not „кантора";
  invoice supplier requisites are "настройват се при внедряването" (hardcoded
  per deployment in the app — never claim a settings screen).
