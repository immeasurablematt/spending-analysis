// Budget-ta 2.0 — Spending Analysis Data Layer
// All data sourced from embedded snapshot. No network calls required.
// $12,000 Internet Transfer (Feb 2026 medical reimbursement) excluded from gross outflow figures.

export type MonthlySnapshot = {
  month: string
  label: string
  partial: boolean
  net_spend_visible: number
  gross_visible_outflow: number
  gross_outflow_all: number
}

export type CategoryStat = {
  category_name: string
  group_name: string
  avg_monthly_net: number
  gross_outflow_total: number
  net_spend_total: number
  controllable: boolean
  observed_in_baseline: boolean
}

export type MerchantStat = {
  payee_name: string
  gross_outflow: number
}

export type MerchantBreakdownMap = Record<string, MerchantStat[]>

export type HiddenLegacyCategory = {
  category_name: string
  gross_outflow: number
  avg_monthly: number
}

export type CapPlanRow = {
  category_name: string
  current_avg_monthly: number
  proposed_cap: number
  savings: number
}

// ─── Hero KPIs ───────────────────────────────────────────────────────────────

export const HERO_KPIS = {
  net_spend_visible: 12283.68,
  target: 13000,
  delta_to_target: -716.32,
  gross_visible_outflow: 15551.62,
  gross_outflow_all: 17327.81,
  month_to_date: 6687.46,
  mtd_as_of: "Apr 17",
} as const

// ─── Monthly Series ───────────────────────────────────────────────────────────
// Oct 2025 and Apr 2026 are partial months — excluded from averages, shown as context.
// Feb 2026 gross figures have the $12,000 Internet Transfer reimbursement removed.

export const MONTHLY_SNAPSHOTS: MonthlySnapshot[] = [
  {
    month: "2025-10",
    label: "Oct",
    partial: true,
    net_spend_visible: 15312.98,
    gross_visible_outflow: 15698.66,
    gross_outflow_all: 15698.66,
  },
  {
    month: "2025-11",
    label: "Nov",
    partial: false,
    net_spend_visible: 13409.27,
    gross_visible_outflow: 14131.21,
    gross_outflow_all: 17970.97,
  },
  {
    month: "2025-12",
    label: "Dec",
    partial: false,
    net_spend_visible: 12347.78,
    gross_visible_outflow: 14964.60,
    gross_outflow_all: 19931.11,
  },
  {
    month: "2026-01",
    label: "Jan",
    partial: false,
    net_spend_visible: 12588.72,
    gross_visible_outflow: 12658.67,
    gross_outflow_all: 12658.67,
  },
  {
    // Feb gross figures adjusted: $12,000 Internet Transfer reimbursement excluded.
    // Net spend is unaffected (was already offset in source data).
    month: "2026-02",
    label: "Feb",
    partial: false,
    net_spend_visible: 9507.35,
    gross_visible_outflow: 10258.56,
    gross_outflow_all: 10333.23,
  },
  {
    month: "2026-03",
    label: "Mar",
    partial: false,
    net_spend_visible: 13565.30,
    gross_visible_outflow: 13745.06,
    gross_outflow_all: 13745.06,
  },
  {
    month: "2026-04",
    label: "Apr",
    partial: true,
    net_spend_visible: 6687.46,
    gross_visible_outflow: 6821.68,
    gross_outflow_all: 6821.68,
  },
]

// ─── Category Stats ───────────────────────────────────────────────────────────
// controllable: true = flexible spend, addressable by caps
// controllable: false = cautious/essential — do not cap without careful thought

export const CATEGORY_STATS: CategoryStat[] = [
  { category_name: "Groceries ", group_name: "Frequent Spending", avg_monthly_net: 2189.11, gross_outflow_total: 11439.14, net_spend_total: 10945.55, controllable: true, observed_in_baseline: true },
  { category_name: "Home Maintenance & Decor", group_name: "True Expenses", avg_monthly_net: 1352.31, gross_outflow_total: 6961.23, net_spend_total: 6761.57, controllable: true, observed_in_baseline: true },
  { category_name: "Fitness & Coaching", group_name: "Personal & Family", avg_monthly_net: 975.82, gross_outflow_total: 4879.11, net_spend_total: 4879.11, controllable: true, observed_in_baseline: true },
  { category_name: "Personal Care", group_name: "Personal & Family", avg_monthly_net: 871.57, gross_outflow_total: 4470.94, net_spend_total: 4357.83, controllable: true, observed_in_baseline: true },
  { category_name: "Dining Out", group_name: "Frequent Spending", avg_monthly_net: 639.01, gross_outflow_total: 3197.31, net_spend_total: 3195.06, controllable: true, observed_in_baseline: true },
  { category_name: "Babysitting", group_name: "Kids Needs", avg_monthly_net: 633.44, gross_outflow_total: 3167.20, net_spend_total: 3167.20, controllable: false, observed_in_baseline: true },
  { category_name: "Utilities", group_name: "Monthly Bills", avg_monthly_net: 623.43, gross_outflow_total: 3117.16, net_spend_total: 3117.16, controllable: false, observed_in_baseline: true },
  { category_name: "Wardrobe", group_name: "Personal & Family", avg_monthly_net: 615.46, gross_outflow_total: 3782.42, net_spend_total: 3077.32, controllable: true, observed_in_baseline: true },
  { category_name: "Gifts & Giving", group_name: "True Expenses", avg_monthly_net: 535.20, gross_outflow_total: 2695.98, net_spend_total: 2675.98, controllable: true, observed_in_baseline: true },
  { category_name: "Insurance", group_name: "Monthly Bills", avg_monthly_net: 475.16, gross_outflow_total: 2375.78, net_spend_total: 2375.78, controllable: false, observed_in_baseline: true },
  { category_name: "Tuition (Sacred Heart)", group_name: "Monthly Bills", avg_monthly_net: 420.00, gross_outflow_total: 2100.00, net_spend_total: 2100.00, controllable: false, observed_in_baseline: true },
  { category_name: "Property Tax", group_name: "Monthly Bills", avg_monthly_net: 401.33, gross_outflow_total: 2006.64, net_spend_total: 2006.64, controllable: false, observed_in_baseline: true },
  { category_name: "Kids Supplies", group_name: "Kids Needs", avg_monthly_net: 375.22, gross_outflow_total: 2222.25, net_spend_total: 1876.08, controllable: false, observed_in_baseline: true },
  { category_name: "Stuff I Forgot to Budget For", group_name: "Fees, Fines & Misc.", avg_monthly_net: 332.94, gross_outflow_total: 1664.71, net_spend_total: 1664.71, controllable: true, observed_in_baseline: true },
  { category_name: "Medicine & Vitamins", group_name: "Personal & Family", avg_monthly_net: 284.66, gross_outflow_total: 1423.31, net_spend_total: 1423.31, controllable: false, observed_in_baseline: true },
  { category_name: "Subscriptions (Monthly)", group_name: "True Expenses", avg_monthly_net: 276.44, gross_outflow_total: 1382.20, net_spend_total: 1382.20, controllable: true, observed_in_baseline: true },
  { category_name: "Kids Programs", group_name: "Kids Needs", avg_monthly_net: 269.18, gross_outflow_total: 1345.89, net_spend_total: 1345.89, controllable: false, observed_in_baseline: true },
  { category_name: "Fuel & Charging", group_name: "Frequent Spending", avg_monthly_net: 185.45, gross_outflow_total: 949.66, net_spend_total: 927.27, controllable: false, observed_in_baseline: true },
  { category_name: "Family Fun & Dates", group_name: "Fun & Future", avg_monthly_net: 154.94, gross_outflow_total: 786.00, net_spend_total: 774.71, controllable: true, observed_in_baseline: true },
  { category_name: "Sheva's Fun Money 💸", group_name: "Fun & Future", avg_monthly_net: 146.11, gross_outflow_total: 730.53, net_spend_total: 730.53, controllable: true, observed_in_baseline: true },
  { category_name: "Dharma & Charity", group_name: "True Expenses", avg_monthly_net: 140.28, gross_outflow_total: 701.41, net_spend_total: 701.41, controllable: false, observed_in_baseline: true },
  { category_name: "Matt's Fun Money 🤑 ", group_name: "Fun & Future", avg_monthly_net: 137.48, gross_outflow_total: 687.40, net_spend_total: 687.40, controllable: true, observed_in_baseline: true },
  { category_name: "Transit & Parking", group_name: "Frequent Spending", avg_monthly_net: 119.19, gross_outflow_total: 595.94, net_spend_total: 595.94, controllable: false, observed_in_baseline: true },
  { category_name: "Subscriptions (Annual)", group_name: "True Expenses", avg_monthly_net: 60.13, gross_outflow_total: 300.66, net_spend_total: 300.66, controllable: true, observed_in_baseline: true },
  { category_name: "Water Wisdom Retreat", group_name: "Short Term Savings", avg_monthly_net: 60.00, gross_outflow_total: 300.00, net_spend_total: 300.00, controllable: true, observed_in_baseline: true },
  { category_name: "Zepbound", group_name: "True Expenses", avg_monthly_net: 55.79, gross_outflow_total: 278.93, net_spend_total: 278.93, controllable: false, observed_in_baseline: true },
  { category_name: "Car Maintenance & Transport", group_name: "True Expenses", avg_monthly_net: 353.65, gross_outflow_total: 1768.25, net_spend_total: 1768.25, controllable: false, observed_in_baseline: true },
]

// ─── Merchant Breakdown ───────────────────────────────────────────────────────
// Keys use exact YNAB category names, including trailing space in "Groceries "

export const MERCHANT_BREAKDOWN: MerchantBreakdownMap = {
  "Groceries ": [
    { payee_name: "Zehrs", gross_outflow: 2946.57 },
    { payee_name: "Instacart", gross_outflow: 2937.71 },
    { payee_name: "Costco", gross_outflow: 1068.89 },
    { payee_name: "IC* INSTACART", gross_outflow: 981.59 },
    { payee_name: "Pupo's Supermarket", gross_outflow: 659.24 },
    { payee_name: "Trulocal", gross_outflow: 317.85 },
  ],
  "Dining Out": [
    { payee_name: "Starbucks", gross_outflow: 599.13 },
    { payee_name: "Uber Eats", gross_outflow: 487.23 },
    { payee_name: "Napoli Ristorante", gross_outflow: 265.60 },
    { payee_name: "UBER CANADA/UBEREATS", gross_outflow: 220.49 },
    { payee_name: "Ritual", gross_outflow: 189.84 },
    { payee_name: "McDonald's", gross_outflow: 178.88 },
  ],
  "Home Maintenance & Decor": [
    { payee_name: "Silk & Snow", gross_outflow: 1031.69 },
    { payee_name: "Costco", gross_outflow: 910.28 },
    { payee_name: "Amazon", gross_outflow: 697.78 },
    { payee_name: "Canadian Tire", gross_outflow: 649.01 },
    { payee_name: "Joe – Camo Gas Repair", gross_outflow: 634.65 },
    { payee_name: "IKEA", gross_outflow: 375.05 },
    { payee_name: "Home Depot", gross_outflow: 342.44 },
  ],
  "Fitness & Coaching": [
    { payee_name: "ABC Crunch Fitness", gross_outflow: 2227.28 },
    { payee_name: "ABC*8292-CRUNCH FITNE", gross_outflow: 822.36 },
    { payee_name: "Gabe (trainer)", gross_outflow: 700.00 },
    { payee_name: "Roxana B", gross_outflow: 300.00 },
    { payee_name: "ABC*8292-CRUNCH FITNES", gross_outflow: 226.00 },
  ],
  "Personal Care": [
    { payee_name: "Amazon", gross_outflow: 1429.88 },
    { payee_name: "Sephora", gross_outflow: 352.58 },
    { payee_name: "Sally and Yang", gross_outflow: 300.00 },
    { payee_name: "Health Wise", gross_outflow: 246.30 },
    { payee_name: "Soda Hair Group", gross_outflow: 219.53 },
  ],
}

// ─── Hidden Legacy Categories ─────────────────────────────────────────────────
// One-time renovation/purchase projects now wound down.
// These distorted Nov–Dec 2025 cash outflow but are not ongoing spend.

export const HIDDEN_LEGACY_CATEGORIES: HiddenLegacyCategory[] = [
  { category_name: "[OLD] Bedroom Set", gross_outflow: 6772.25, avg_monthly: 1354.45 },
  { category_name: "[OLD] Garage Reno", gross_outflow: 1202.37, avg_monthly: 240.47 },
  { category_name: "[OLD] Light Fixtures", gross_outflow: 831.65, avg_monthly: 166.33 },
  { category_name: "Inflow: Ready to Assign", gross_outflow: 74.67, avg_monthly: 14.93 },
]

// ─── Cap Plan ─────────────────────────────────────────────────────────────────

export const CAP_PLAN: CapPlanRow[] = [
  { category_name: "Groceries ", current_avg_monthly: 2189.11, proposed_cap: 1900, savings: 289.11 },
  { category_name: "Home Maintenance & Decor", current_avg_monthly: 1352.31, proposed_cap: 700, savings: 652.31 },
  { category_name: "Fitness & Coaching", current_avg_monthly: 975.82, proposed_cap: 650, savings: 325.82 },
  { category_name: "Personal Care", current_avg_monthly: 871.57, proposed_cap: 650, savings: 221.57 },
  { category_name: "Dining Out", current_avg_monthly: 639.01, proposed_cap: 400, savings: 239.01 },
  { category_name: "Wardrobe", current_avg_monthly: 615.46, proposed_cap: 350, savings: 265.46 },
  { category_name: "Gifts & Giving", current_avg_monthly: 535.20, proposed_cap: 350, savings: 185.20 },
  { category_name: "Kids Supplies", current_avg_monthly: 375.22, proposed_cap: 300, savings: 75.22 },
  { category_name: "Stuff I Forgot to Budget For", current_avg_monthly: 332.94, proposed_cap: 125, savings: 207.94 },
  { category_name: "Subscriptions (Monthly)", current_avg_monthly: 276.44, proposed_cap: 175, savings: 101.44 },
  { category_name: "Fun Money Combined", current_avg_monthly: 283.59, proposed_cap: 200, savings: 83.59 },
  { category_name: "Family Fun & Dates", current_avg_monthly: 154.94, proposed_cap: 100, savings: 54.94 },
]

export const CAP_PLAN_TOTALS = {
  modeled_savings: 2701.61,
  modeled_gross_after_caps: 12850.01,
} as const

// ─── Practical Floor Tiers ────────────────────────────────────────────────────

export const FLOOR_TIERS = [
  { label: "Hard low-control core", amount: 4500 },
  { label: "+ Groceries", amount: 6700 },
  { label: "+ Home reserve", amount: 8100 },
  { label: "Net spend (actual)", amount: 12283.68 },
  { label: "Target", amount: 13000 },
] as const
