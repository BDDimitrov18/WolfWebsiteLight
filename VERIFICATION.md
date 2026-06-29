# Copy verification

Per the brief: every feature claim in the site was checked against the source
of truth, `../Wolf.Desktop/PROJECT_OVERVIEW.md`. Section references (§) point
into that document. ✅ = directly supported. ⚠️ = flagged (see notes).

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
| 100+ API endpoints | §6.2 ("~100+ endpoints") | ✅ |
| **0 ms — UI served from cache** | §7.3 (in-memory cache, "the UI is instant") | ⚠️ Illustrative phrasing, not a measured latency. Conveys the instant, cache-served UI; not a literal benchmark. |
| 58 automated tests | §3.5, §9.1 | ✅ |

## Pillars / Why Wolf
| Claim | Source | |
|---|---|---|
| Real-time for everyone (SignalR) | §4.3, §7.4 | ✅ |
| Instant interface — full dataset in memory, materialized indexes, O(1) | §7.3 | ✅ |
| Native to Windows — self-contained Avalonia, no .NET install, auto-update | §1, §3.2, §7.5 | ✅ |
| Excel reports to .xlsx, no Office needed | §3.2, §8.11 | ✅ |

## Feature tour
| Claim | Source | |
|---|---|---|
| Orders: virtualized grid, create/edit/archive, search, color-coded stars, auto-calc payment status, detail panel (activities/clients/plots/invoices) | §8.3 | ✅ |
| Title chain: plot ↔ document ↔ owner ↔ PoA, ideal parts, cadastral fields, deed types | §5.2, §8.9 | ✅ |
| Calendar: monthly grid, overdue indicators, today's-tasks bell, employee switcher | §8.6 | ✅ |
| Filters: quick toggles, status dropdowns, text searches, multi-selects, active-filters indicator | §8.3 | ✅ |
| Reports: All Tasks, Obligations, Task-Type Payment, monthly per-employee; .xlsx | §8.11 | ✅ |
| Dashboard: summary cards, financial overview, status breakdown, top 5 employees, recent orders, admin-only, debounced refresh | §8.7 | ✅ |
| Clients: searchable list, all-time financials, per-order breakdown, Excel export, legal type | §8.4 | ✅ |

## Architecture
| Claim | Source | |
|---|---|---|
| 3-tier: native desktop ⇄ REST/WebSocket API ⇄ PostgreSQL; C#/.NET 8 | §3.1, §4.1 | ✅ |
| Avalonia 11 · MVVM; in-memory cache; SignalR client; Velopack auto-update | §3.2, §7 | ✅ |
| ASP.NET Core 8; REST controllers; JWT; SignalR hub; audit log; repository | §3.3, §6 | ✅ |
| EF Core 8 · Npgsql; 22 domain entities; optimistic concurrency via xmin; indexed FKs | §3.4, §5 | ✅ |
| Role-based authorization (Admin / standard user) | §6.1 | ✅ |
| JWT 24-hour expiry, HMAC-SHA256 signed | §6.1 | ✅ |
| Dockerized server + auto-updating LAN clients | §3.5, §9.3 | ✅ |

## Documentation pages
All content (getting started, order→activity→task model, filters, reports) is
paraphrased from §2, §7.1, §8.3, §8.6, §8.11. ✅

## Flagged lines (could not fully verify against §2)
1. **"0 ms — UI served from cache"** (stats bar) — illustrative, not a measured
   figure. Supported in spirit by §7.3. Reword to "instant" if a literal claim
   is undesirable.
2. **"Designed and built in Bulgaria"** (footer) — the product is built *for* a
   Bulgarian firm and is Bulgarian-language (§1), but the document does not
   explicitly state the developer's location. Brand statement, not a product
   spec.
3. **Pricing card line-items** — "Data migration and training", "Priority
   support", "Maintenance agreement", "Custom reports" are **commercial /
   service offerings**, presented under Pricing/Deployment. They are not product
   capabilities described in the source and should be confirmed against the
   actual commercial offer before launch.
4. **Version "1.0.16"** (footer) matches the document header (§ title). Note the
   bundled `LoginScreen.png` shows `v1.0.15` — a screenshot from a slightly
   earlier build. Swap the screenshot or accept the minor mismatch.

Everything else on the site is directly traceable to `PROJECT_OVERVIEW.md`.
