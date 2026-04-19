"use client"

import { useState } from "react"
import { MERCHANT_BREAKDOWN, CATEGORY_STATS } from "../data"

function fmt(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n)
}

const DISPLAY_CATEGORIES = [
  "Groceries ",
  "Home Maintenance & Decor",
  "Fitness & Coaching",
  "Personal Care",
  "Dining Out",
]

function MerchantBar({ value, max }: { value: number; max: number }) {
  const pct = (value / max) * 100
  return (
    <div className="w-full bg-stone-100 rounded-full h-1.5 mt-1">
      <div
        className="bg-amber-400 h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function MerchantBreakdown() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  return (
    <div className="my-6 flex flex-col gap-3">
      <div className="mb-2">
        <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">
          Merchant Breakdown
        </p>
        <h3 className="text-lg font-serif font-medium text-stone-900">
          Top Spending Categories — Who&apos;s Getting the Money
        </h3>
      </div>

      {DISPLAY_CATEGORIES.map((catName) => {
        const merchants = MERCHANT_BREAKDOWN[catName] ?? []
        const catStat = CATEGORY_STATS.find((c) => c.category_name === catName)
        const isOpen = openCategory === catName
        const maxOutflow = Math.max(...merchants.map((m) => m.gross_outflow))
        const displayName = catName.trim()

        return (
          <div
            key={catName}
            className="rounded-xl border border-stone-200 bg-white overflow-hidden"
          >
            <button
              onClick={() => setOpenCategory(isOpen ? null : catName)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-stone-50 transition-colors"
            >
              <div>
                <span className="font-medium text-stone-900">{displayName}</span>
                {catStat && (
                  <span className="ml-3 text-sm font-mono text-stone-400">
                    {fmt(catStat.avg_monthly_net)}/mo avg
                  </span>
                )}
              </div>
              <span
                className="text-stone-400 font-mono text-lg leading-none transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-5 border-t border-stone-100">
                <p className="text-xs font-mono text-stone-400 uppercase tracking-widest mt-4 mb-3">
                  Top payees — 5-month period
                </p>
                <div className="flex flex-col gap-4">
                  {merchants.map((m) => (
                    <div key={m.payee_name}>
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-stone-700 truncate max-w-xs">
                          {m.payee_name}
                        </span>
                        <span className="text-sm font-mono font-medium text-stone-900 ml-4 shrink-0">
                          {fmt(m.gross_outflow)}
                        </span>
                      </div>
                      <MerchantBar value={m.gross_outflow} max={maxOutflow} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
