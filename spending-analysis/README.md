# Spending Analysis — Drop-In Instructions

## What's here

```
data.ts                        ← all embedded snapshot data, fully typed
page.tsx                       ← Next.js App Router page (no server fetching)
components/
  HeroKPIs.tsx                 ← three-card KPI summary
  TrendChart.tsx               ← multi-line monthly trend (Recharts)
  CategoryRanking.tsx          ← horizontal bar chart, controllable vs cautious
  DistortionPanel.tsx          ← [OLD] legacy category visualization
  MerchantBreakdown.tsx        ← accordion drilldown cards
  CapPlan.tsx                  ← 30-day cap plan table with savings bars
  NarrativePanel.tsx           ← reusable editorial callout block
```

## Setup (run once from `apps/web`)

```bash
npx shadcn@latest init          # if not already done
npx shadcn@latest add chart     # installs Recharts + shadcn chart primitives
```

## Drop-in

Copy this folder's contents into:

```
apps/web/app/spending-analysis/
```

The page will be available at `/spending-analysis`.

## Notes

- No server-side fetching. All data is in `data.ts`.
- `"use client"` is applied only to chart components (Recharts requires it).
- Feb 2026 gross outflow figures have the $12,000 Internet Transfer reimbursement excluded. Net spend is unaffected (was already offset in source data).
- Partial months (Oct 2025, Apr 2026) are included in the trend chart as context but excluded from all averages.
- Tailwind is used for all layout and typography. The page uses `font-serif` — configure a serif in your Tailwind/next-font setup for best results (e.g. Playfair Display, Lora, or DM Serif Display).
- Acceptance criteria checklist is in `docs/specs/2026-04-19-spending-dashboard-design.md`.
