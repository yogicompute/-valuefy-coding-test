"use client"

import { useEffect, useState } from "react"

type Fund = {
  fund_id: string
  fund_name: string
  allocation_pct: number
}

export default function Page() {

  const [funds, setFunds] = useState<Fund[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetch("/api/model-funds")
      .then(res => res.json())
      .then(data => {
        setFunds(data)
        setLoading(false)
      })

  }, [])

  const updateValue = (index: number, value: number) => {

    const copy = [...funds]
    copy[index].allocation_pct = value
    setFunds(copy)

  }

  const savePlan = async () => {

    const total = funds.reduce(
      (sum, f) => sum + Number(f.allocation_pct),
      0
    )

    if (total !== 100) {
      alert("Percentages must equal exactly 100%")
      return
    }

    await fetch("/api/update-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(funds)
    })

    alert("Plan updated successfully")
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-semibold">
        Edit Recommended Plan
      </h1>

      <p className="text-neutral-400">
        Adjust the target allocation percentages.
        All funds together must equal 100%.
      </p>

      <div className="space-y-4">

        {funds.map((fund, index) => (

          <div
            key={fund.fund_id}
            className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-lg"
          >

            <div>
              <p className="font-medium">
                {fund.fund_name}
              </p>

              <p className="text-xs text-neutral-400">
                Fund ID: {fund.fund_id}
              </p>
            </div>

            <input
              type="number"
              min={0}
              max={100}
              value={fund.allocation_pct}
              className="w-24 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-center"
              onChange={(e) =>
                updateValue(index, Number(e.target.value))
              }
            />

          </div>

        ))}

      </div>

      <button
        onClick={savePlan}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg"
      >
        Save Plan
      </button>

    </div>
  )
}