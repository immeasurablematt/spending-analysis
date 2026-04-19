"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { CATEGORY_STATS } from "../data"

function fmt(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n)
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: { category_name: string; avg_monthly_net: number; controllable: boolean } }>
}) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-stone-200 bg-white px-4 py-3 shadow-md text-sm">
      <p className="font-medium text-stone-900 mb-1">{d.category_name.trim()}</p>
      <p className="font-mono text-stone-700">{fmt(d.avg_monthly_net)}/mo avg</p>
      <p className={`text-xs mt-1 font-medium ${d.controllable ? "text-amber-600" : "text-stone-400"}`}>
        {d.controllable ? "Flexible — addressable" : "Essential / cautious"}
      </p>
    </div>
  )
}

export function CategoryRanking() {
  const sorted = [...CATEGORY_STATS]
    .filter((c) => c.observed_in_baseline && c.avg_monthly_net > 0)
    .sort((a, b) => b.avg_monthly_net - a.avg_monthly_net)
    .slice(0, 18)

  const displayData = sorted.map((c) => ({
    ...c,
    name: c.category_name.trim().length > 22
      ? c.category_name.trim().slice(0, 22) + "…"
      : c.category_name.trim(),
    full_name: c.category_name,
  }))

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 my-6">
      <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">
        Category Ranking
      </p>
      <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">
        Average Monthly Net Spend
      </h3>
      <div className="flex gap-4 mb-6 text-xs font-mono">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-amber-400" />
          Flexible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-stone-300" />
          Essential / cautious
        </span>
      </div>

      <ResponsiveContainer width="100%" height={520}>
        <BarChart
          data={displayData}
          layout="vertical"
          margin={{ top: 0, right: 80, bottom: 0, left: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e7e5e4" />
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
            width={170}
            tick={{ fontSize: 12, fill: "#44403c" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f5f5f4" }} />
          <Bar dataKey="avg_monthly_net" radius={[0, 4, 4, 0]} maxBarSize={22}>
            {displayData.map((entry, i) => (
              <Cell
                key={`cell-${i}`}
                fill={entry.controllable ? "#fbbf24" : "#d6d3d1"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
