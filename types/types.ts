export type Holding = {
  fund_id: string
  fund_name: string
  current_value: number
}

export type ModelFund = {
  fund_id: string
  fund_name: string
  allocation_pct: number
}

export type RebalanceRow = {
  fund: string
  currentPct: number
  targetPct: number | null
  drift: number
  action: "BUY" | "SELL" | "REVIEW"
  amount: number
}