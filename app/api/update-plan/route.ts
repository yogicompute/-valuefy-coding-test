import { getDB } from "@/lib/db"

export async function POST(req: Request) {

  const body = await req.json()

  const db = await getDB()

  for (const fund of body) {

    await db.run(
      `UPDATE model_funds
       SET allocation_pct=?
       WHERE fund_id=?`,
      fund.allocation_pct,
      fund.fund_id
    )
  }

  return Response.json({ success: true })
}