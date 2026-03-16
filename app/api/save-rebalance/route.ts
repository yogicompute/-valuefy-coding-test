import { getDB } from "@/lib/db"

export async function POST(req: Request) {

  const body = await req.json()

  const db = await getDB()

  const result = await db.run(
    `
    INSERT INTO rebalance_sessions
    (client_id, created_at, portfolio_value, total_to_buy, total_to_sell, net_cash_needed, status)
    VALUES (?, datetime('now'), ?, ?, ?, ?, 'PENDING')
    `,
    "C001",
    body.portfolio,
    body.totalBuy,
    body.totalSell,
    body.netCash
  )

  return Response.json({ session_id: result.lastID })
}