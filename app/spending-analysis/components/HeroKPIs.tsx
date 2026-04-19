import { HERO_KPIS } from "../data"

function fmt(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n)
}

export function HeroKPIs() {
  const pct = (HERO_KPIS.net_spend_visible / HERO_KPIS.target) * 100

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
      {/* Net Spend vs Target */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 flex flex-col gap-3">
        <p className="text-xs font-mono uppercase tracking-widest text-stone-400">
          Net Spend vs Target
        </p>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-serif font-semibold text-stone-900 tabular-nums">
            {fmt(HERO_KPIS.net_spend_visible)}
          </span>
        </div>
        <div className="w-full bg-stone-100 rounded-full h-1.5 mt-1">
          <div
            className="bg-emerald-500 h-1.5 rounded-full transition-all"
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <p className="text-sm text-stone-500">
          <span className="font-medium text-emerald-600">
            {fmt(Math.abs(HERO_KPIS.delta_to_target))} under
          </span>{" "}
          the {fmt(HERO_KPIS.target)}/mo target
        </p>
      </div>

      {/* Gross Visible Outflow */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 flex flex-col gap-3">
        <p className="text-xs font-mono uppercase tracking-widest text-stone-400">
          Gross Visible Outflow
        </p>
        <span className="text-4xl font-serif font-semibold text-stone-900 tabular-nums">
          {fmt(HERO_KPIS.gross_visible_outflow)}
        </span>
        <p className="text-sm text-amber-600 font-medium mt-1">
          {fmt(HERO_KPIS.gross_visible_outflow - HERO_KPIS.target)} over target
        </p>
        <p className="text-sm text-stone-500">
          Cash out before category offsets and returns. This is why it feels expensive.
        </p>
      </div>

      {/* Month to Date */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 flex flex-col gap-3">
        <p className="text-xs font-mono uppercase tracking-widest text-stone-400">
          April — Month to Date
        </p>
        <span className="text-4xl font-serif font-semibold text-stone-900 tabular-nums">
          {fmt(HERO_KPIS.month_to_date)}
        </span>
        <p className="text-sm text-stone-500 mt-1">
          Through {HERO_KPIS.mtd_as_of}. Partial month, not used in averages.
        </p>
      </div>
    </div>
  )
}
