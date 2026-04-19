"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { MONTHLY_SNAPSHOTS } from "../data"

function fmtK(value: number) {
  return `$${(value / 1000).toFixed(1)}k`
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string; dataKey: string }>
  label?: string
}) => {
  if (!active || !payload?.length) return null
  const snap = MONTHLY_SNAPSHOTS.find((s) => s.label === label)

  return (
    <div className="rounded-lg border border-stone-200 bg-white px-4 py-3 shadow-md text-sm">
      <p className="font-mono font-medium text-stone-700 mb-2">
        {label} {snap?.partial ? "(partial)" : ""}
      </p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex justify-between gap-6">
          <span style={{ color: p.color }} className="text-stone-600">
            {p.name}
          </span>
          <span className="font-mono font-medium text-stone-900">
            {new Intl.NumberFormat("en-CA", {
              style: "currency",
              currency: "CAD",
              maximumFractionDigits: 0,
            }).format(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function TrendChart() {
  const data = MONTHLY_SNAPSHOTS.map((s) => ({
    label: s.label,
    partial: s.partial,
    "Net Spend": s.net_spend_visible,
    "Gross Outflow": s.gross_visible_outflow,
  }))

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 my-6">
      <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">
        Monthly Trend
      </p>
      <h3 className="text-lg font-serif font-medium text-stone-900 mb-6">
        Nov 2025 – Mar 2026
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fontFamily: "monospace", fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={fmtK}
            tick={{ fontSize: 12, fontFamily: "monospace", fill: "#78716c" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 22000]}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="plainline"
            wrapperStyle={{ fontSize: 12, fontFamily: "monospace", paddingTop: 16 }}
          />
          <ReferenceLine
            y={13000}
            stroke="#d97706"
            strokeDasharray="6 3"
            label={{
              value: "$13k target",
              position: "insideTopRight",
              fontSize: 11,
              fontFamily: "monospace",
              fill: "#d97706",
            }}
          />
          <Line
            type="monotone"
            dataKey="Net Spend"
            stroke="#1c1917"
            strokeWidth={2}
            dot={(props) => {
              const snap = MONTHLY_SNAPSHOTS.find((s) => s.label === props.payload?.label)
              return (
                <circle
                  key={`dot-net-${props.cx}`}
                  cx={props.cx}
                  cy={props.cy}
                  r={snap?.partial ? 3 : 5}
                  fill={snap?.partial ? "white" : "#1c1917"}
                  stroke="#1c1917"
                  strokeWidth={snap?.partial ? 1.5 : 0}
                  strokeDasharray={snap?.partial ? "3 2" : "0"}
                />
              )
            }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Gross Outflow"
            stroke="#d97706"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={(props) => {
              const snap = MONTHLY_SNAPSHOTS.find((s) => s.label === props.payload?.label)
              return (
                <circle
                  key={`dot-gross-${props.cx}`}
                  cx={props.cx}
                  cy={props.cy}
                  r={snap?.partial ? 3 : 4}
                  fill={snap?.partial ? "white" : "#d97706"}
                  stroke="#d97706"
                  strokeWidth={snap?.partial ? 1.5 : 0}
                />
              )
            }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-stone-400 font-mono mt-4">
        Oct 2025 and Apr 2026 are partial months (open circles) — shown for context only, excluded from averages.
      </p>
    </div>
  )
}
