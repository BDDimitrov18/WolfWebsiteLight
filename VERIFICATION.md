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
| Teamwork: simultaneous work, instant propagation, conflict warning instead of data loss | §4.3 (optimistic concurrency, "friendly 409"), §7.4, §6.4 (audit log) | ✅ |
| Dashboard: KPI cards (outstanding, invoiced, active orders, overdue tasks), monthly activity, tasks by status, receivables with jump-to-order, team workload, admin-only, real-time | Dashboard rebuilt 2026-07-06 (supersedes §8.7's top-5/recent-orders description); verified against the supplied `AdminBoard.png` screenshot of the new build | ✅ |
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
| Clients & invoices | §8.4, §8.8 |
| Calendar & scheduling | §8.6, §8.2 (bell) |
| Filters & search | §8.3 (advanced order filters, Ctrl+F §8.2) |
| Reports & exports | §8.11 (five reports incl. client stats export; filtering; .xlsx to desktop, auto-open) |
| Administration | §8.5, §8.7, §8.12, §6.1 (roles) |

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
   Enterprise custom; one-time licenses €500/€800/€1,000 with ~18% optional
   annual maintenance — €90/€145/€180; EUR excl. 20% VAT; annual billing,
   monthly ~20% higher) was supplied by the owner (revised 2026-07-06; the
   earlier per-seat model was dropped with the revision). Commercial terms,
   not derivable from PROJECT_OVERVIEW.
5. **Version "1.0.16"** (footer) matches the document header (§ title). Note the
   bundled `LoginScreen.png` shows `v1.0.15` — a screenshot from a slightly
   earlier build. Swap the screenshot or accept the minor mismatch.

Everything else on the site is directly traceable to `PROJECT_OVERVIEW.md`.
