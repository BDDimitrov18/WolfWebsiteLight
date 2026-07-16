# Copy verification

Per the brief: every feature claim in the site was checked against the source
of truth, `../Wolf.Desktop/PROJECT_OVERVIEW.md`. Section references (§) point
into that document. ✅ = directly supported. ⚠️ = flagged (see notes).

*Updated after the product-first copy revision (tech framing → product
outcomes) and the docs completion.*

## Hero
| Claim | Source | |
|---|---|---|
| Unifies orders, activities & tasks, plots, ownership documents, invoices, reports | §1, §2, §8 | ✅ |
| "one native Windows system" | §1, §3.2 (Avalonia, self-contained) | ✅ |
| "real-time sync across every member of staff" | §4.3, §6.3, §7.4 (SignalR) | ✅ |
| Tagline "traced down to the ideal part" | §5.2 (ideal parts / fractional ownership) | ✅ |

## Story band (replaced the stats bar)
| Claim | Source | |
|---|---|---|
| Began in the founders' family design practice | Owner's statement (2026-07-05): commissioned by the owner's father for his practice | ⚠️ Biographical claim, not verifiable against PROJECT_OVERVIEW — attested by the owner. |
| Two years of daily production use | Owner's statement (2026-07-05); §1 describes a production LOB system | ⚠️ Duration attested by the owner ("used for 2 years"). Wording deliberately means *use*, not development time (core build was ~3–4 months, not stated on the site). |
| Refined at the request of its users | Owner's statement (2026-07-05): tweaks were requested and implemented throughout the 2 years of use | ⚠️ Attested by the owner. |
| "More than once caught unpaid sums" | Owner's statement (2026-07-05): "It caught unpaid money many times" | ⚠️ Attested by the owner; supported indirectly by §8.3/§8.11 (auto-calculated payment status, Obligations report). |
| Made each person's contribution measurable | §8.3 (per-employee stars), §8.11 (monthly per-employee report), dashboard team-workload panel (2026-07-06 rebuild) + owner's statement | ✅ |

## Pillars / Why Wolf
| Claim | Source | |
|---|---|---|
| Featured: every employee reports their own work individually; you see individual as well as overall output | §8.3 (per-employee priority stars), §8.11 (monthly per-employee report, one sheet per employee), §6.3–6.4 (audit log of who changed what) | ✅ (the "stars" are described to visitors as a personal priority marker per order — owner's framing, 2026-07-05) |
| …used for fairer distribution of remuneration against work done, and for firm accountability | Owner's statement (2026-07-05): this is the intended purpose of individual accounting; not a computed payroll feature in §8 | ⚠️ Purpose framing supplied by the owner — the product provides the per-employee data; it does not itself calculate remuneration. |
| The whole team on one order — simultaneous work, even on the same activity; changes appear instantly; protected from overwriting each other | §4.3 (optimistic concurrency, simultaneous editing, "friendly 409"), §7.4, §8.13 | ✅ |
| Subtitle: covers the base (clients, orders, invoices, reports) + adds practice-specific (properties, ownership documents) | §2, §8.3–8.11 (base modules), §5.2/§8.9 (ownership specifics) | ✅ |
| No waiting — instant search/filters/lists even with thousands of records | §7.3 (in-memory cache, O(1) indexes, virtualization §8.13) | ✅ |
| Takes care of itself — installs in minutes, auto-updates | §3.2, §7.5 | ✅ ("minutes" is a reasonable characterization of a self-contained installer, not a measured figure) |
| Reports your accountant can open — .xlsx, no Office install | §3.2, §8.11 | ✅ |

## Feature tour
| Claim | Source | |
|---|---|---|
| Orders: one grid, create/edit/archive, search, per-employee stars, auto-calc payment status, detail panel | §8.3 | ✅ |
| Title chain: plot ↔ document ↔ owner ↔ PoA, ideal parts, cadastral fields, deed types | §5.2, §8.9 | ✅ |
| Calendar: monthly grid, overdue indicators, today's-tasks bell, employee switcher | §8.6 | ✅ |
| Filters: quick toggles, status dropdowns, text searches, multi-selects, active-filters indicator | §8.3 | ✅ |
| Reports: All Tasks, Obligations, Task-Type Payment, monthly per-employee; .xlsx | §8.11 | ✅ |
| Invoicing: PDF invoice from order data — auto-suggested sequential number (max+1, 10 digits), VAT (default 20%), dual currency EUR/BGN, amount in words (Bulgarian, auto + editable), line items suggested from activities, live preview = same renderer as the file | Verified in code, 2026-07-07: `Wolf.Invoicing/` (InvoiceComposer, InvoicePdfDocument, CurrencyConverter, BulgarianNumberToWords), `Views/InvoiceDraftView.axaml`, `ViewModels/InvoiceDraftViewModel.cs`. Shipped in 1.0.26. **Supplier details are no longer hardcoded** — since `6ee1cdc` they come from Администрация → „Фирмени данни“ and are frozen as a snapshot on each issued invoice (item 13). | ✅ |
| Templates: assembled in the „Конструктор“ builder — 7 block types (Заглавие/Текст/Ред с данни/Таблица със списък/Повтарящ се раздел/Подписи/Празен ред), fields inserted from a searchable Bulgarian picker (never typed), live preview against sample data or a real order with an empty-field count, „Отвори в Word“, draft → publish (one-way), mechanical .docx import, „№ по ред“, nested repeating sections (plot→its owners, owner→their plots), first-item („основен“) fields with a multi-item warning at generation, three separate rights (use / manage own / manage all), admin-only raw Word upload, legacy Word templates keep working + „Провери шаблона“ | Verified in code, 2026-07-11: `Views/TemplateBuilderView.axaml`, `Views/DocumentTemplatesView.axaml`, `Controls/FieldPickerFlyout.axaml`, `Documents/{TemplateDesign,DocxBlockImporter,TemplateImportFlow,OrderMergeContextBuilder,FirstItemBindingLint}.cs`, `Api/Controllers/TemplatesController.cs`, `Wolf.Dtos/Permissions.cs`; commits `e4e7eaf`→`0fc26f4` (M1–M5 + UI audit). **Shipped in 1.0.26 (2026-07-13) — item 11 resolved.** Since `1c2ba10` also: per-column „Заглавие“/„Суфикс“, deeper nesting, revision-guarded saves. | ✅ |
| Roles & rights: „Администрация“ with Потребители / Роли и права / Одитен журнал / Фирмени данни tabs, per-module permission matrix incl. data scope (viewAll vs viewParticipating), seeded roles (Админ / Деловодител / Изпълнител / Счетоводител / Потребител), custom roles, locked Admin role, user↔employee link, password reset, disable account | Verified in code, 2026-07-11 and re-verified 2026-07-13: `Views/AdministrationView.axaml`, `Wolf.Api/Authorization/*`, `Wolf.Dtos/Permissions.cs`, `Services/{DesktopPermissionPolicy,DownstreamDataScope}.cs`; commits `e4e7eaf`, `6ee1cdc`. **Shipped in 1.0.26; server-side enforcement is now ON (`"Authorization": {"Mode": "Enforce"}`) — item 11 resolved.** | ✅ |
| Teamwork: simultaneous work, instant propagation, conflict warning instead of data loss | §4.3 (optimistic concurrency, "friendly 409"), §7.4, §6.4 (audit log) | ✅ |
| Dashboard: attention cards (overdue / due in 7 days / open), tasks by status, team workload, issued invoices, payers by invoiced value, orders with an unbilled remainder, largest current balances, selectable analytics period, rights-scoped panels, real-time | Dashboard rebuilt AGAIN in `6ee1cdc` (`DashboardView.axaml`, ~986 lines) — verified in code 2026-07-13. **The receivables aging buckets (до 30 / 30–60 / 60–90 / над 90 дни) no longer exist in the app** and were removed from the site's tour + `/docs/admin` the same day. 2026-07-16: real captures of all three dashboard tabs landed (`AdminBoard` / `AdminBoardFinance` / `AdminBoardTeam`) and the Табло stop is now a 3-page carousel with arrows (item 14). | ✅ |
| Clients: searchable list, all-time financials, per-order breakdown, Excel export, legal type | §8.4 | ✅ |

## How it works (formerly Architecture)
| Claim | Source | |
|---|---|---|
| Desktop app on every workstation; installs in minutes; auto-updates | §1, §3.2, §7.5 | ✅ |
| Data lives on a server you control — office machine or cloud, your choice; database is yours either way | §9.3 documents the self-hosted LAN deployment; cloud hosting is the same client-server architecture pointed at a remote host — owner confirmed offering both (2026-07-06) | ✅ (the doc itself only describes on-prem; the cloud option is architecturally identical and owner-attested) |
| One database holds everything + a log of who changed what | §5, §6.4 (file audit log per mutation) | ✅ |
| Sign-in with username/password, role-based access | §6.1, §8.1 | ✅ |
| Audit trail of every change | §6.3–6.4 ("every mutation is both audited and broadcast") | ✅ |

## Documentation pages (now complete)
| Page | Sources |
|---|---|
| Getting started | §1, §2, §7.1, §7.5, §8.1, §8.2 |
| Orders — the core screen | §8.3 (grid, create/edit, archive & save, folder open, payment auto-calc, stars, pinning, detail tabs, concurrency message) |
| Active & archive | §8.2 (mode toggle, theme change, mode-aware lists/stats/badges), §8.3 (archive/unarchive with confirmation, "Archive & save"); the All/Active/Archived buttons are visible in the supplied `ArchiveModeOrders.png` |
| Model: order → activity → task | §2, §5.1–5.2, §8.10 |
| Plots & ownership documents | §8.9 (cadastral fields, uniqueness, shared indicator, smart linking, document fields, ownership editor: owner autocomplete, ideal parts, way of acquiring, PoA) |
| Clients | §8.4; "My clients" filter + debtor/debt-size stats filters verified in code 2026-07-07 (commits `f0e2659`, `7f354b5`) |
| Invoicing (new page) | §8.8 (register); PDF generator verified in code 2026-07-07 (uncommitted `Wolf.Invoicing/` — see feature-tour row above) |
| Document templates (new page) | Verified in code 2026-07-07 (`DocumentTemplatesView`, `GenerateDocumentView`, merge engine; commits `6e05270`, `fe55fa2`); placeholder catalog quoted from `OrderMergeContextBuilder.cs` |
| Calendar & scheduling | §8.6, §8.2 (bell) |
| Filters & search | §8.3 (advanced order filters, Ctrl+F §8.2) |
| Reports & exports | §8.11 (base reports; renamed to current UI labels 2026-07-07: „Оборот на задачи“, „Задължения“, „Плащания по вид задача“, „Месечна справка“) + new „Справка такси (държавни такси)“ and the two no-filter business reports („Поръчки и приходи по общини“, „Клиенти: класация и реактивиране“) verified in `Views/InqueriesView.axaml` 2026-07-07 (working tree) |
| Administration | §8.5, §8.12, §6.1 (roles); rewritten 2026-07-13 against `6ee1cdc` — four Администрация tabs (Потребители / Роли и права / Одитен журнал / Фирмени данни), the rebuilt Табло, the employee create/edit form, and „Моят профил“ as a work centre. See item 13. |

Additions verified in code on 2026-07-07 (source: `../Wolf.Desktop` working tree
+ recent commits, which are ahead of PROJECT_OVERVIEW.md v1.0.16):
- **Global search Ctrl+K** over orders, clients, plots, owners (incl. by ЕГН) and
  documents — `ViewModels/GlobalSearchViewModel.cs` (uncommitted).
- **Owners screen** („Собственици": names, ЕГН, address) — `Views/OwnersView.axaml`
  (uncommitted).
- **EKATTE auto-fill** from the cadastral number prefix — commit `5f98242`.
- **Google Earth parcel outline** with coordinates from the cadastre — commits
  `b1861e0`, `cd4f64a`, `3ae8702`.
- **Task statuses** corrected in docs to нова/зададена/в процес/отложена/завършена
  (was „възложена/завършена/котировка" per the older overview) — per
  `DashboardViewModel.cs`.
- **Clickable links in order comments** — commit `fe4abd5`.
- **Create-order → "add first activity" prompt** — `MainWindowViewModel.cs`.

All doc content is paraphrased from the sections above. ✅
One simplification: the docs say reports open in "any Excel, LibreOffice or
Google Sheets" — the source only states .xlsx generation without Office
(§3.2); compatibility of .xlsx with those apps is common knowledge, not a
tested claim.

## Flagged lines (could not fully verify against §2)
1. **"1 system instead of folders and spreadsheets"** (stats bar) — marketing
   framing; see above.
2. **"No third-party cloud, no per-month fees"** (How it works) — see above;
   contrasts with SaaS, does not mean zero operating cost.
3. **"Designed and built in Bulgaria"** (footer) — the product is built *for* a
   Bulgarian firm and is Bulgarian-language (§1), but the document does not
   explicitly state the developer's location. Brand statement, not a product
   spec.
4. **Pricing** — the price list (Solo €10/mo · Standard €25/mo · Pro €50/mo ·
   Enterprise custom; one-time licenses €360/€900/€1,800 — a uniform 3× the
   annual subscription — with ~18% optional annual maintenance €65/€160/€325;
   EUR excl. 20% VAT; annual billing, monthly ~20% higher) was set by the
   owner (subscription prices 2026-07-06; one-time ladder restructured to the
   3× multiple on the owner's approval, same date; the earlier per-seat model
   was dropped). Commercial terms, not derivable from PROJECT_OVERVIEW.
5. **Version "1.0.26"** (footer, updated 2026-07-13) matches the app's current
   `<Version>` in `Wolf.Desktop.csproj`. The app's own `DEPLOY.md` records
   1.0.26 as **shipped on 2026-07-13**, together with the template builder,
   server authorization + data scopes, the audit journal and the company-data
   migrations. There is no `Release 1.0.26` commit (the release ladder stops at
   `d5a7d6a` = 1.0.25); the version lives in the csproj and the deploy record.
   The bundled `LoginScreen.png` still shows `v1.0.15`.
7. **Placeholder screenshots** (2026-07-07, extended 2026-07-13; largely
   RESOLVED 2026-07-16): the owner delivered real captures
   (`WolfScreenshots/newScreenshots`, ~1918×1008) and 18 slot files were
   replaced/added — see item 14. Still NOT real app screenshots:
   `AuditLog.png` and `CompanyProfile.png` (branded "снимка очаква се"
   placeholders). Still real-but-outdated: `PersonalTab.png` (predates the
   work-centre rebuild), `InvoicesTab.png`, `Employees.png`,
   `EmployeesStatistics.png` (older app version).
8. **Invoicing round 2 + help/colors/filters** (2026-07-07, second sweep) — all
   verified in the app's UNCOMMITTED working tree (HEAD still `c9d1670`
   Release 1.0.24; +4,244 lines staged for the next release):
   - Three invoice creation modes („+ Създай фактура“: Генерирай нова (PDF) /
     Въведи съществуваща / Свържи фактура от базата) — `InvoicesDetailViewModel.cs`.
   - Server-side atomic numbering (`CreateInvoiceDto.AutoNumber`) — replaces the
     earlier client-side max+1; docs updated to "issued by the server".
   - On-demand PDF („Отвори PDF“, no stored file) — `InvoicePdfOpener.cs`.
   - Shared invoices/shares („обща“/„свързана“ badges, unallocated remainder,
     „Промени дял“, ⚠ over-allocation warning, cascade-aware delete texts) —
     `LinkInvoiceView.axaml`, `EditShareView.axaml`, `Invoiceline` entity.
   - External invoice with optional original-file link — `EditInvoiceView`.
   - In-app Help „Помощ“ + F1, 6 sections, indexed in Ctrl+K — `HelpView.axaml`,
     `HelpContent.cs`.
   - Task-row status colours „⚙ Цветове“, personal per computer, defaults incl.
     „оферта“ amber — `TaskStatusColorService.cs`; task status list on the site
     now includes „оферта“.
   - Filters: „Фактуриране“ dropdown (нефактурирани/частично/под цената/напълно),
     „Фактура №“ text search, composite „Неразплатени“; clickable money footer
     „Неразплатено“/„Нефактурирано“ — `OrderFiltersView.axaml`, `OrdersView.axaml`.
   - Ctrl+K scope now incl. invoices, employees, tasks, app sections; Ctrl+Enter
     opens in Orders; Shift+double-click sidebar item → floating window —
     `HelpContent.cs`, `MainWindowViewModel.cs`.
   - ~~Supplier requisites REMAIN hardcoded per deployment~~ — **SUPERSEDED
     2026-07-13 by item 13: there is now a „Фирмени данни“ screen.** The old
     guardrail ("do not claim a settings screen") no longer applies; the site
     now says the requisites come from Администрация → Фирмени данни.
   - Money footer totals „Неразплатено“/„Нефактурирано“ were ADMIN-ONLY
     (`OrdersView.axaml` IsVisible=IsAdmin; owner-reported 2026-07-07).
     **Superseded 2026-07-13:** the gate is now the granular permission
     `finance.viewOrderTotals` („Виждане на вземания“), and МАРЖ is
     `finance.viewMargins` („Виждане на маржове“) — both seeded to the Админ
     role only, so the customer-visible behaviour is unchanged by default. The
     site now describes them as rights, not as an admin hardcode.
6. **Contact details** (CTA, footer, privacy page) — phone +359 877 139 712,
   email bddimitrov18@gmail.com, name Bozhidar Damyanov Dimitrov (no company
   entity) — supplied by the owner 2026-07-06. The demo form's mailto now
   targets this address (previously hello@wolf.bg, a domain not owned — fixed).
   The privacy page names the owner as data controller; its GA disclosure
   anticipates the measurement ID that is wired but not yet supplied.

Everything else on the site is directly traceable to `PROJECT_OVERVIEW.md`.

9. **Pricing „Препоръчан план“ / "Recommended plan"** (screen-reader label on
   the featured tier's ★ badge, added with the 2026-07-11 redesign) — a vendor
   recommendation, not a popularity statistic; the Standard tier was already
   visually marked as featured (★) before the redesign. No sales-volume claim
   is made or implied. The team-size selector added alongside it („Колко души
   е практиката?“) lets the visitor highlight a tier matching their own
   choice; that state shows „за вашия екип“ / "for your team" — the visitor's
   stored selection, not a vendor claim — and without a selection the sheet
   shows exactly the vendor default.

10. **CTA stamp** (decorative ink-stamp motif on the demo request form,
    2026-07-11) — center text „ДЕМО\n30 МИН“ / "DEMO\n30 MIN"
    (`cta.stampCenter`), ring text „WOLF · ЗА ПРОЕКТАНТСКИ ПРАКТИКИ · “ /
    "WOLF · FOR DESIGN PRACTICES · " (`cta.stampRing`). The 30-minute figure
    restates the owner-attested CTA claim „Половин час е достатъчен…“
    (`cta.body`, unchanged); the ring is the established product descriptor.
    No certification or approval implied; the SVG is aria-hidden.

11. ✅ **RESOLVED 2026-07-13 — no longer ahead of the release.** Both features
    below shipped in **1.0.26** (the app's `DEPLOY.md`: *"Last shipped: 1.0.26
    (2026-07-13, together with the template-builder, server authorization/data
    scopes, audit journal, company-data migrations)"*), and server-side
    enforcement is now ON — `Wolf.Api/appsettings.json` reads
    `"Authorization": { "Mode": "Enforce" }` (was `"Off"`). The permission
    system now blocks the API, not just the UI. The two ⚠️ rows in the
    feature-tour table (Templates, Roles & rights) are cleared. The original
    flag is kept below for history.

    <details><summary>Original flag (2026-07-11)</summary>

    ⚠️ **The site documents two features AHEAD of their release** (2026-07-11,
    on the owner's explicit instruction: *"make the website as it's already
    come out — I will ship it soon"*). Both are fully built on the app's
    `feature/document-templates` branch (commits `e4e7eaf`→`0fc26f4`) but are
    NOT in any release:
    - **Конструктор (template builder)** — `/docs/templates` was rewritten
      around it, and the homepage tour stop „Шаблони“ now describes it.
      `DEPLOY.md:188` marks the required migration
      `2026-07-09_template_designjson_isdraft.sql` as **"(not yet applied)"**;
      builder + API + desktop go out as one combined deploy.
    - **Роли и права / Администрация** — `/docs/admin` §Роли и права and the
      new tour stop „Достъп“ describe it as working access control. The owner
      confirmed (2026-07-11) that server-side enforcement will be switched on:
      it currently ships `"Authorization": { "Mode": "Off" }`
      (`Wolf.Api/appsettings.json`), where the permission system governs what
      each role SEES in the app but does not yet block the API. **The site does
      not claim encryption, audit-grade access control, or a security
      guarantee** — it describes roles, rights and admin-only visibility, which
      is what the UI does today and what the API will enforce once the mode is
      flipped. Re-check this item when `Mode` is set to `Enforce`.

    Until that deploy, these two pages describe a build customers on 1.0.25 do
    not yet have. Everything else on the site matches the released app.
    Two consequences worth noting for the release notes (not marketing claims):
    existing Word templates change behaviour under the new engine — `{{plot.*}}`
    used outside an `{{#each}}` now resolves to the order's first plot instead
    of rendering as an unresolved literal, and `{{#each plots}}` nested inside
    `{{#each owners}}` now enumerates each owner's own plots.

    </details>

12. **Both authoring paths are documented as equals** (owner directive,
    2026-07-11: *"both options should be available… make sure it is visible"*).
    `/docs/templates` opens on „Два начина към една бланка“ and then documents
    each in full: the Конструктор (blocks, field picker, live preview, draft →
    publish, .docx import) and Word templates with `{{placeholders}}`
    (`{{#each}}` lists, „Провери шаблона“ linter, preview, „Замени файла“). The
    homepage tour stop names both. Both code blocks are quoted from the app —
    the Bulgarian field catalogue and the token syntax from
    `OrderMergeContextBuilder.cs`.
    - Rights wording: the site says who may upload Word files and edit others'
      templates is **set in „Роли и права“**, rather than asserting "admin
      only". This is the accurate statement: the gate is the
      `templates.manageAll` permission (`TemplatesController.cs:199`), and the
      default `RoleStandard` bundle **seeds `TemplatesManageAll`**
      (`Permissions.cs:218`) — so on a default install the whole team can
      upload, and it only becomes admin-only if the owner strips the right.
    - **One claim was REMOVED and not restored:** the downloadable starter
      template („Изтегли начален шаблон (.docx)“). That button was deleted from
      the app in the builder work (M2); `StarterTemplateBuilder.cs` survives
      only as seed/test code. If the owner wants it back, that is an app change,
      not a site one.

13. **Round 3 — firm administration, audit journal, work centre** (2026-07-13,
    third full app↔site sweep). All of the below is verified in the app's
    **committed** `main` (commits `1c2ba10` "Harden document builder and enable
    advanced nesting", `6ee1cdc` "ship secure workflows and firm
    administration"), shipped as **1.0.26**. Nothing here is uncommitted —
    unlike rounds 1–2, the app's working tree holds only build artefacts.

    - **„Фирмени данни“ — the supplier is no longer hardcoded.** New 4th tab in
      Администрация (`Views/AdministrationView.axaml`), backed by
      `deploy/sql/2026-07-13_company_profiles.sql`. Holds one or more дружества
      with legal identity (Код, Кратко/Юридическо/Търговско име, ЕИК, „Регистрация
      по ДДС“ + ДДС №, адрес, МОЛ, контакти), invoicing defaults (Място на
      издаване, Съставител, ДДС %, Валута) and bank accounts (add / edit /
      **„Деактивирай“ — never delete**), plus a live „ПРЕГЛЕД НА ДОСТАВЧИКА“ card.
      `InvoiceComposer.Compose` now **requires** an `InvoiceSupplierSnapshot`
      argument and has **no hardcoded fallback**; the old
      `// Hardcoded supplier … To be moved to config later` block is gone.
      → The site's long-standing "настройват се при внедряването" wording is
      **retired** on `/docs/invoicing` and in the homepage tour.
    - **Snapshot immutability.** `Invoice` gained `Companyid`,
      `Supplierprofileversionid`, `Suppliersnapshotjson` — every issued invoice
      freezes the requisites, so editing the company profile cannot rewrite
      invoice history. The desktop sends `ExpectedSupplierProfileVersionId`; a
      stale preview is rejected (`company_profile_changed`) and the draft offers
      **„Обнови фирмените данни“**. Documented as a step on `/docs/invoicing`.
    - **„Одитен журнал“** — new 3rd Администрация tab (`AuditController`,
      `DatabaseAuditService`, `2026-07-13_audit_events.sql`): filters (търсене /
      потребител / вид запис / действие / период), an event stream with jump-to-record
      and „В Поръчки“ buttons, and a detail pane showing the **записани данни**.
      Gated by the separate `admin.audit` right (Админ only by default). New
      `/docs/admin` §Одитен журнал + slot `AuditLog.png`.
    - **Finance is now its own rights module** (`Wolf.Dtos/Permissions.cs`):
      `finance.viewOrderTotals` („Виждане на вземания“) gates the
      Неразплатено/Нефактурирано footer and the dashboard's money panels;
      `finance.viewMargins` („Виждане на маржове“) gates МАРЖ. Seeded to Админ
      only — default behaviour matches what the site said before, but the site
      now describes the *right*, not an `IsAdmin` hardcode (see item 8).
    - **Data scope per list** (`DownstreamDataScope.cs`,
      `2026-07-13_downstream_scope_createdby.sql`): every dataset has
      `*.viewAll` vs `*.viewParticipating`; with neither, the list is empty.
      Documented in `/docs/admin` §Роли и права.
    - **Табло rebuilt** (`DashboardView.axaml`, ~986 lines): „Задачи, изискващи
      внимание“ (ПРОСРОЧЕНИ / ДО 7 ДНИ / ОТВОРЕНИ), „Натовареност на екипа“,
      „Издадени фактури“, „Платци по фактурирана стойност“, „Поръчки с
      нефактуриран остатък“, „Най-големи текущи остатъци“, all over a selectable
      analytics period and scoped to the viewer's rights. **The old aging buckets
      (до 30 / 30–60 / 60–90 / над 90 дни) are GONE from the app** — that claim
      was removed from the homepage tour and `/docs/admin`, where it would
      otherwise have become false.
    - **„Моят профил“ = a work centre** (`UserProfileView.axaml`): four attention
      cards (ПРОСРОЧЕНИ / ДНЕС / СЛЕДВАЩИ 7 ДНИ / ВСИЧКИ ОТВОРЕНИ), „Моята
      работна опашка“ ranked by urgency with colour bars, „Натовареност · 7 дни“,
      „Активни поръчки“, „За мой контрол“. Replaces the old PersonalTab
      description (period stats + completion %) on `/docs/admin` §Личен профил.
    - **Конструктор** (`1c2ba10`): table columns get per-column „Заглавие“ and
      „Суфикс след стойността“; repeating sections nest deeper; template writes
      are guarded by a revision token (`2026-07-12_template_revision.sql`) with an
      „Незапазени промени“ marker and a rejected-stale-write path instead of
      last-write-wins.
    - **Employees**: new create/edit form with „Външен служител“, and an
      `employees.createExternal` right that locks the type to „Външен“.
    - **Not user-visible, deliberately not on the site:** `d6c41f8` (test
      determinism) and `28cda26` (production backup hardening — `deploy/backup.sh`,
      a server-ops concern; the site makes no backup claim, and none was added).
    - **In-app Help was NOT updated** for these features (`HelpContent.cs`
      untouched in all four commits) — for now the website is the only place the
      company-data / audit / work-centre features are documented.
14. **Round 4 — real screenshots + Табло carousel** (2026-07-16, owner-delivered
    captures from `Wolf.Desktop/WolfScreenshots/newScreenshots`, ~1918×1008):
    - **18 slot files replaced/added** in `public/screenshots/` (mapping:
      ArchiveOrdersView→ArchiveModeOrders, Board p1/p2/p3→AdminBoard/
      AdminBoardFinance/AdminBoardTeam, CallendarShowCase→Callendar,
      ClientsTab→ClientsTab, ClientStatistics→ClientStatisticsTab,
      DocumentGenerationWindow→GenerateDocument, DocumentsOfOwnership→
      DocumentsTab, Filters→FiltersOrders, Inqueries→InqueriesTab,
      OrdersScreen→OrdersScreen, PDFInvoiceCreation→InvoiceDraft,
      PlotsSubtabInOrders→PlotsAndDocsInOrderTab, PlotsTab→PlotsTab,
      Roles→Administration, TemplateBuilder→TemplateBuilder,
      TemplatesTab→TemplatesScreen). Mappings verified by eyeballing the
      captures (Board p1/p2/p3 = the dashboard's Обобщение/Финанси/Екип tabs;
      Roles = Роли и права with the data-scope explainer; PlotsSubtabInOrders =
      the order's Имоти и документи tab).
    - **New `ScreenshotCarousel` component** (`src/components/ui/
      ScreenshotCarousel.tsx`): one window chrome, several pages crossfading
      inside; auto-advances every 5s, pauses on hover/lightbox, stops for good
      once the reader uses the arrows or dots; reduced motion disables
      autoplay; title bar shows the current page name + `n / 3` counter; dots
      sit on a dark pill (the app's screenshots are white — bare dots drown).
    - **Used for Табло in both places**: the homepage tour stop `dashboard`
      (`FeatureTour.tsx` `pages:` + `TourShot`; labels from new dict key
      `features.boardPages`, BG Обобщение/Финанси/Екип, EN Summary/Finance/
      Team) and `/docs/admin` §Табло (new `imgs` DocBlock type in
      `content.ts` + `DocArticle.tsx` case).
    - Behaviour verified against the built static export with Chrome
      (arrows switch label+image, dots jump, auto-rotate advances after 5s,
      homepage instance renders).
    - Same session: the docs pager complaint («next» from Фактуриране)
      could NOT be reproduced — 12+ scenarios (live site + dev + local build,
      Chrome + Edge, pager/sidebar/hash/back-and-forth) all land at scrollY=0.
      The only mid-page landing found is the browser's own back/forward
      restoration, which is standard behaviour and was left alone.
15. **Round 5 — reveals removed, unified nav, admin carousel** (2026-07-16,
    owner requests):
    - **Scroll-triggered text entrances removed site-wide** ("a website pro
      told me it's not good"): `Reveal`/`RevealGroup`/`RevealItem` now render
      static (components kept for their grouping semantics), and
      `SplitHeading mode="scroll"` renders a plain visible heading. The ONLY
      surviving text animation is the hero's one-time load choreography
      (`mode="load"` + `.intro-hide`, preloader hand-off). Decorative
      scroll-scrubbed motifs (Architecture stroke drawing, CTA contour
      drift, tour crossfade/station dim) were kept — they are not text
      entrances. Verified: no text node on / or /docs/* is hidden or at
      opacity<0.05 without scrolling.
    - **Navbar unified**: the docs header (`DocsShell`) now carries the same
      tabs as the site navbar (Възможности / Как работи / Цени /
      Документация + Заявете демо CTA), desktop inline + mobile drawer (site
      tabs above the chapter list). Verified: from /docs, Цени lands on
      /#pricing with sectionTop=96.
    - **Same-page section landing fixed**: router-path hash clicks landed
      72–200px short because the hero's load choreography still shifts
      layout while the smooth scroll is in flight. New
      `src/lib/sectionScroll.ts` intercepts same-page section clicks
      (navbar, hero CTAs, pricing CTAs), uses native `scrollIntoView` and
      re-settles once on `scrollend` (skipped if the reader scrolled away;
      setTimeout fallback for Safari <26). Verified: home→#features/
      #architecture/#pricing all land at exactly sectionTop=96.
    - **„Достъп“ tour stop is now a carousel** mirroring the app's
      Администрация tabs: Роли и права (`Administration`) / Одитен журнал
      (`AuditLog`) / Фирмени данни (`CompanyProfile`), labels via dict key
      `features.adminPages` (BG+EN). NOTE: the latter two slots are still
      branded placeholders until the owner's captures land (item 7).
    - Where the six pending captures appear: `InvoicesTab` → /docs/invoicing
      (top); `Employees`+`EmployeesStatistics` → /docs/admin §Служители;
      `AuditLog` → /docs/admin §Одитен журнал + homepage Достъп carousel;
      `CompanyProfile` → /docs/admin §Фирмени данни + homepage Достъп
      carousel; `PersonalTab` → /docs/admin §Моят профил.
16. **Round 6 — the launch film** (2026-07-16): `public/video/wolf-launch.mp4`
    (24.5 MB, 1920×1080, 173 s, H.264, Remotion-rendered — the owner's launch
    film; all on-screen text Bulgarian, no VO/music yet) + a poster frame
    extracted at 0:08 (`wolf-launch-poster.jpg`, the logo over night parcels).
    New homepage section `Film` (id="film") between Story and Pillars:
    SheetHeader + CornerMarks-framed player, **self-hosted and click-to-play**
    (`preload="none"` + poster → verified ZERO video requests until the play
    button is pressed; no third-party embed, consistent with the privacy
    story). Button „Пусни филма · 2:53“; native controls after start; caption
    „Поръчка № 2417 · от приемане до плащане · всички екрани са реални“.
    Copy claims match the film's own description (order № 2417, intake→
    payment, every screen real; EN subtitle notes on-screen text is
    Bulgarian). Dict block `film.*` (BG+EN). Verified on the built export:
    poster renders, click starts playback (currentTime advances), overlay
    drops, controls appear.
    - **CORRECTION (2026-07-16, owner):** the film's screens are NOT app
      screenshots and not the normal usage flow — it is a motion-designed
      showcase with an interface deliberately simplified for the viewer.
      The original claims („Всеки екран във филма е реална функционалност…,
      а не монтаж“ / „всички екрани са реални“) were FALSE and were replaced
      the same day with „анимирана демонстрация: показва истинските
      възможности на Wolf, с интерфейс, опростен за прегледност“ /
      "a motion-designed demo … interface simplified for watchability"
      (caption „анимирана демонстрация“ / "a motion-designed demo").
      Guardrail: never describe the film as screenshots, screen recordings,
      or the real interface.
    - **Follow-up (same day, owner):** „Документация“ as a *tab* still broke
      the uniformity rule (tabs scrolled, it redirected). The tab row is now
      sections only (Възможности / Как работи / Цени — every tab scrolls);
      Документация moved to the right-hand action cluster as a ghost button
      (next to „Заявете демо“) in BOTH headers, marked aria-current on docs
      pages; in the mobile menu it is a visually separated, bordered row
      with a → marker. Verified on the built export: home tabs stay on "/"
      and land at sectionTop=96; the docs button navigates to /docs; the
      docs header carries the same structure.
17. **Round 7 — final captures, honest film copy, full-screen lightbox**
    (2026-07-16):
    - **Item 7 is now fully RESOLVED for the placeholder plates**: the owner
      delivered AuditLog, CompanyProfiles→CompanyProfile, PersonalTab,
      InvoicesTab, EmployeeStatisctis→EmployeesStatistics (all ~1918×1008,
      verified visually: audit log with filters + „Записани данни“ JSON;
      Фирмени данни with дружества, bank accounts, history; the work-centre
      profile; the invoice register; the statistics screen). Plus a bonus
      **Owners.png** (the Собственици register) — added as a NEW img slot on
      /docs/plots §Собственици (BG+EN). Remaining known-stale: Employees.png
      (older app version), LoginScreen.png (unused slot, v1.0.15).
    - **Film copy re-tightened (owner):** no „проследете… от приемането до
      плащането“ narrative — the film is presented purely as a functionality
      showcase. New title „Възможностите на Wolf — за три минути“, subtitle
      says animated + simplified interface AND points down the page:
      „По-надолу в страницата са показани снимки на реалния интерфейс.“
      Caption „Демонстрация на възможностите · анимирана · 2:53“. EN mirror.
    - **Lightbox now fills the screen** (owner request): the max-w-6xl cap
      is gone; the image sizes to calc(100vh − 7.5rem) with width following
      the aspect ratio, so on 1920×1080 it renders ~1824×960 with the
      container padding as margin (verified in Chrome).
