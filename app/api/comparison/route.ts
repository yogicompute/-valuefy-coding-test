import { getDB } from "@/lib/db"
import { rebalance } from "@/lib/rebalance"
import { Holding, ModelFund } from "@/types/types"

export async function GET() {

  const db = await getDB()

  const holdings = await db.all<Holding[]>(
    `SELECT fund_id,fund_name,current_value
     FROM client_holdings
     WHERE client_id='C001'`
  )

  const modelFunds = await db.all<ModelFund[]>(
    `SELECT fund_id,fund_name,allocation_pct
     FROM model_funds`
  )

  const result = rebalance(holdings, modelFunds)

  return Response.json(result)
}