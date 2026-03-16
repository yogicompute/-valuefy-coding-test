import { getDB } from "@/lib/db"

export async function GET() {

  const db = await getDB()

  const rows = await db.all(
    `SELECT created_at,portfolio_value,status
     FROM rebalance_sessions
     WHERE client_id='C001'
     ORDER BY created_at DESC`
  )

  return Response.json(rows)
}