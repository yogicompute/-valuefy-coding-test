import { getDB } from "@/lib/db"

export async function GET() {

  const db = await getDB()

  const holdings = await db.all(
    `SELECT fund_id,fund_name,current_value
     FROM client_holdings
     WHERE client_id='C001'`
  )

  return Response.json(holdings)
}