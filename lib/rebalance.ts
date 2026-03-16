import { Holding, ModelFund, RebalanceRow } from "@/types/types"

export function rebalance(
  holdings: Holding[],
  modelFunds: ModelFund[]
) {

  const total = holdings.reduce(
    (sum, h) => sum + h.current_value,
    0
  )

  const rows: RebalanceRow[] = []

  let totalBuy = 0
  let totalSell = 0

  for (const fund of modelFunds) {

    const holding = holdings.find(
      h => h.fund_id === fund.fund_id
    )

    const value = holding?.current_value ?? 0

    const currentPct = (value / total) * 100
    const drift = fund.allocation_pct - currentPct

    const amount = Math.round((drift / 100) * total)

    let action: "BUY" | "SELL"

    if (amount > 0) {
      action = "BUY"
      totalBuy += amount
    } else {
      action = "SELL"
      totalSell += Math.abs(amount)
    }

    rows.push({
      fund: fund.fund_name,
      currentPct,
      targetPct: fund.allocation_pct,
      drift,
      action,
      amount: Math.abs(amount)
    })
  }

  // funds not in plan
  const extra = holdings.filter(
    h => !modelFunds.find(m => m.fund_id === h.fund_id)
  )

  for (const f of extra) {
    rows.push({
      fund: f.fund_name,
      currentPct: (f.current_value / total) * 100,
      targetPct: null,
      drift: 0,
      action: "REVIEW",
      amount: f.current_value
    })
  }

  return {
    rows,
    total,
    totalBuy,
    totalSell,
    netCash: totalBuy - totalSell
  }
}