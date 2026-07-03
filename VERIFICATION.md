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

## Stats bar
| Claim | Source | |
|---|---|---|
| 20+ working screens | §10 ("20+ major screens") | ✅ |
| 5 ready-made Excel reports | §8.11 (All Tasks, Obligations, Task-Type Payment, Monthly per-employee, Client statistics export) | ✅ |
| 100% real-time on every screen | §8.13 ("Real-time multi-user sync across every screen") | ✅ |
| "1 system instead of folders and spreadsheets" | §1, §2 (single LOB system) | ⚠️ Marketing framing of §1; "instead of folders and spreadsheets" describes the intended replacement, not a documented migration feature. |

## Pillars / Why Wolf
| Claim | Source | |
|---|---|---|
| Everyone sees the same thing — colleague's change appears instantly, no reload | §4.3, §7.4, §8.13 | ✅ |
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
| Dashboard: summary cards, financial overview, status breakdown, top 5 employees, recent orders, admin-only | §8.7 | ✅ |
| Clients: searchable list, all-time financials, per-order breakdown, Excel export, legal type | §8.4 | ✅ |

## How it works (formerly Architecture)
| Claim | Source | |
|---|---|---|
| Desktop app on every workstation; installs in minutes; auto-updates | §1, §3.2, §7.5 | ✅ |
| Data lives on a server in your own office; team connects over the network | §1, §9.3 (LAN, dedicated host) | ✅ |
| "No third-party cloud, no per-month fees to someone else" | §9.3 (self-hosted deployment model) | ⚠️ Accurate for the documented deployment (self-hosted LAN), but hosting/electricity/support costs still exist; this contrasts with SaaS subscriptions, not with all costs. |
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
4. **Pricing card line-items** — "Data migration and training", "Priority
   support", "Maintenance agreement", "Custom reports" are **commercial /
   service offerings**, presented under Pricing/Deployment. They are not product
   capabilities described in the source and should be confirmed against the
   actual commercial offer before launch.
5. **Version "1.0.16"** (footer) matches the document header (§ title). Note the
   bundled `LoginScreen.png` shows `v1.0.15` — a screenshot from a slightly
   earlier build. Swap the screenshot or accept the minor mismatch.

Everything else on the site is directly traceable to `PROJECT_OVERVIEW.md`.
