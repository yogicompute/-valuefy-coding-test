import { getDB } from "@/lib/db"

export async function GET() {

  const db = await getDB()

  const funds = await db.all(
    `
    SELECT fund_id, fund_name, allocation_pct
    FROM model_funds
    `
  )

  return Response.json(funds)
}