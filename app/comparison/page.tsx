"use client"

import { useEffect, useState } from "react"

export default function Page() {

  const [data,setData] = useState<any>(null)

  useEffect(()=>{
    fetch("/api/comparison")
      .then(r=>r.json())
      .then(setData)
  },[])

  if(!data) return <p>Loading...</p>

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-semibold">
        Portfolio Comparison
      </h1>

      <div className="rounded-lg border border-neutral-800 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-neutral-900 text-neutral-400">
            <tr>
              <th className="p-4 text-left">Fund</th>
              <th className="p-4">Current %</th>
              <th className="p-4">Target %</th>
              <th className="p-4">Drift</th>
              <th className="p-4">Action</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>

          <tbody>

            {data.rows.map((r:any,i:number)=>{

              const color =
                r.action === "BUY"
                ? "text-green-400"
                : r.action === "SELL"
                ? "text-red-400"
                : "text-yellow-400"

              return(
                <tr
                  key={i}
                  className="border-t border-neutral-800 hover:bg-neutral-900"
                >
                  <td className="p-4">{r.fund}</td>
                  <td className="p-4 text-center">
                    {r.currentPct.toFixed(1)}%
                  </td>
                  <td className="p-4 text-center">
                    {r.targetPct ?? "-"}
                  </td>
                  <td className="p-4 text-center">
                    {r.drift.toFixed(1)}%
                  </td>
                  <td className={`p-4 text-center font-medium ${color}`}>
                    {r.action}
                  </td>
                  <td className="p-4 text-center">
                    ₹{r.amount.toLocaleString()}
                  </td>
                </tr>
              )
            })}

          </tbody>

        </table>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900">
          <p className="text-sm text-neutral-400">Total Buy</p>
          <p className="text-xl font-semibold text-green-400">
            ₹{data.totalBuy}
          </p>
        </div>

        <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900">
          <p className="text-sm text-neutral-400">Total Sell</p>
          <p className="text-xl font-semibold text-red-400">
            ₹{data.totalSell}
          </p>
        </div>

        <div className="p-6 rounded-lg border border-neutral-800 bg-neutral-900">
          <p className="text-sm text-neutral-400">Fresh Money Needed</p>
          <p className="text-xl font-semibold">
            ₹{data.netCash}
          </p>
        </div>

      </div>

    </div>
  )
}