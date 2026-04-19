// apps/web/app/spending-analysis/page.tsx
//
// Setup required (run once from apps/web):
//   npx shadcn@latest init
//   npx shadcn@latest add chart
//   (Recharts is installed as a dependency automatically)
//
// This page uses no server-side data fetching. All data lives in ./data.ts.

import { HeroKPIs } from "./components/HeroKPIs"
import { TrendChart } from "./components/TrendChart"
import { CategoryRanking } from "./components/CategoryRanking"
import { DistortionPanel } from "./components/DistortionPanel"
import { MerchantBreakdown } from "./components/MerchantBreakdown"
import { CapPlan } from "./components/CapPlan"
import { NarrativePanel } from "./components/NarrativePanel"

export const metadata = {
  title: "Spending Analysis — Budget-ta 2.0",
  description: "Five-month household spending baseline, Nov 2025 – Mar 2026",
}

export default function SpendingAnalysisPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Page Header */}
        <header className="mb-4">
          <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-3">
            Budget-ta 2.0 &mdash; Nov 2025 – Mar 2026
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-stone-900 leading-tight mb-4">
            Spending Analysis
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed">
            A five-month household baseline. Two lenses, one conclusion: the target is technically met — and there&apos;s a credible path to meet it on every metric.
          </p>
        </header>

        <hr className="border-stone-200 my-8" />

        {/* Section 1: Hero KPIs */}
        <HeroKPIs />

        {/* Narrative 1 */}
        <NarrativePanel
          eyebrow="The clean number"
          title="You're already under the target."
          body="On visible-category net spend — the metric that strips out reimbursements, returns, and ledger noise — the five-month average is $12,284/mo. That's $716 under the $13,000 goal. The budget is technically working. The feeling of overspending comes from a different number."
        />

        {/* Section 2: Trend Chart */}
        <TrendChart />

        {/* Section 3: Category Ranking */}
        <CategoryRanking />

        {/* Narrative 2 */}
        <NarrativePanel
          eyebrow="Where the pressure lives"
          title="The feeling is real — but it's concentrated in six categories."
          body="Gross outflow runs about $2,500/mo above net spend on average. Most of that gap isn't random: Groceries, Home Maintenance, Fitness, Personal Care, Dining Out, and Wardrobe account for the majority of flexible spend. Essential categories — tuition, insurance, utilities, property tax, childcare — are either fixed or values-driven. They're not the problem."
        />

        {/* Section 4: Merchant Breakdown */}
        <MerchantBreakdown />

        {/* Section 5: Distortion Panel */}
        <DistortionPanel />

        {/* Narrative 3 */}
        <NarrativePanel
          eyebrow="The path forward"
          title="A credible plan exists to get gross outflow under $13k too."
          body="Applying modest caps only to flexible categories — not touching Babysitting, Kids Programs, Medicine, Dharma, or any essential bill — models $2,702/mo in savings. That brings modeled gross visible outflow to $12,850/mo. No lifestyle surgery required. The problem is concentrated enough that targeted caps are sufficient."
        />

        {/* Section 6: Cap Plan */}
        <CapPlan />

        <footer className="mt-16 pt-8 border-t border-stone-200">
          <p className="text-xs font-mono text-stone-400">
            Data range: 2025-11-01 – 2026-03-31 (5 full months). Partial months Oct 2025 and Apr 2026 shown in trend chart only. All figures in CAD.
          </p>
        </footer>

      </div>
    </main>
  )
}
