"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { HIDDEN_LEGACY_CATEGORIES } from "../data"

function fmt(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n)
}

export function DistortionPanel() {
  const total_outflow = HIDDEN_LEGACY_CATEGORIES.reduce((s, c) => s + c.gross_outflow, 0)
  const total_monthly = HIDDEN_LEGACY_CATEGORIES.reduce((s, c) => s + c.avg_monthly, 0)

  const displayData = HIDDEN_LEGACY_CATEGORIES.map((c) => ({
    name: c.category_name.replace("[OLD] ", ""),
    avg_monthly: c.avg_monthly,
    gross_outflow: c.gross_outflow,
  }))

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 my-6">
      <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">
        Legacy Cash Leakage
      </p>
      <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">
        [OLD] Categories — Not Ongoing Spend
      </h3>
      <p className="text-sm text-stone-500 mb-6 max-w-2xl">
        These categories funded one-time renovation and purchase projects — a bedroom set, garage work, and light fixtures. They drove elevated gross outflow in Nov–Dec 2025 but are now wound down. They are not part of the ongoing household budget.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={displayData}
              layout="vertical"
              margin={{ top: 0, right: 60, bottom: 0, left: 8 }}
            >
              <XAxis
                type="number"
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                tick={{ fontSize: 11, fontFamily: "monospace", fill: "#78716c" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={130}
                tick={{ fontSize: 11, fill: "#78716c" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [fmt(value), "Avg/mo"]}
                contentStyle={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  border: "1px solid #e7e5e4",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="avg_monthly" radius={[0, 4, 4, 0]} maxBarSize={20}>
                {displayData.map((_, i) => (
                  <Cell key={i} fill="#d6d3d1" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div className="rounded-lg bg-stone-50 border border-stone-200 px-5 py-4">
            <p className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-1">
              Total legacy outflow (5 mo)
            </p>
            <p className="text-2xl font-serif font-semibold text-stone-900 tabular-nums">
              {fmt(total_outflow)}
            </p>
          </div>
          <div className="rounded-lg bg-stone-50 border border-stone-200 px-5 py-4">
            <p className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-1">
              Avg monthly drag (Nov–Dec peak)
            </p>
            <p className="text-2xl font-serif font-semibold text-stone-900 tabular-nums">
              {fmt(total_monthly)}/mo
            </p>
            <p className="text-xs text-stone-400 mt-1 font-mono">
              Explains the gross outflow gap in late 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
