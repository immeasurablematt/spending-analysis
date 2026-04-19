"use client"

import { CAP_PLAN, CAP_PLAN_TOTALS } from "../data"

function fmt(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n)
}

export function CapPlan() {
  const sorted = [...CAP_PLAN].sort((a, b) => b.savings - a.savings)
  const maxSavings = Math.max(...sorted.map((r) => r.savings))

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 my-6">
      <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">
        30-Day Cap Plan
      </p>
      <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">
        Modeled Savings by Category
      </h3>
      <p className="text-sm text-stone-500 mb-6 max-w-2xl">
        Applying these caps only to flexible categories — nothing essential or values-driven — models a path to gross outflow under {fmt(13000)}/mo.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="text-left font-mono text-xs uppercase tracking-widest text-stone-400 pb-3 pr-4 font-normal">
                Category
              </th>
              <th className="text-right font-mono text-xs uppercase tracking-widest text-stone-400 pb-3 px-4 font-normal">
                Current
              </th>
              <th className="text-right font-mono text-xs uppercase tracking-widest text-stone-400 pb-3 px-4 font-normal">
                Cap
              </th>
              <th className="text-right font-mono text-xs uppercase tracking-widest text-stone-400 pb-3 pl-4 font-normal">
                Saves
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {sorted.map((row) => {
              const pct = (row.savings / maxSavings) * 100
              return (
                <tr key={row.category_name} className="group">
                  <td className="py-3 pr-4 text-stone-700">
                    <div className="font-medium">{row.category_name.trim()}</div>
                    <div className="mt-1.5 w-full bg-stone-100 rounded-full h-1">
                      <div
                        className="bg-emerald-400 h-1 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-stone-500 tabular-nums">
                    {fmt(row.current_avg_monthly)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-stone-900 tabular-nums">
                    {fmt(row.proposed_cap)}
                  </td>
                  <td className="py-3 pl-4 text-right font-mono font-medium text-emerald-600 tabular-nums">
                    {fmt(row.savings)}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-stone-900">
              <td className="pt-4 pb-2 font-serif font-semibold text-stone-900">
                Modeled total
              </td>
              <td />
              <td />
              <td className="pt-4 pb-2 text-right font-mono font-semibold text-emerald-600 tabular-nums">
                {fmt(CAP_PLAN_TOTALS.modeled_savings)}/mo
              </td>
            </tr>
            <tr>
              <td
                colSpan={4}
                className="pb-2 text-sm text-stone-500 font-mono"
              >
                Modeled gross visible outflow after caps:{" "}
                <span className="font-semibold text-stone-900">
                  {fmt(CAP_PLAN_TOTALS.modeled_gross_after_caps)}/mo
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
