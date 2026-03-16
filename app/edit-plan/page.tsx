"use client"

import { useEffect,useState } from "react"

export default function Page(){

  const [funds,setFunds] = useState<any[]>([])

  useEffect(()=>{
    fetch("/api/comparison")
      .then(r=>r.json())
      .then(d=>setFunds(d.rows.filter((r:any)=>r.targetPct)))
  },[])

  const update = async () => {

    const total = funds.reduce(
      (sum,f)=>sum+Number(f.targetPct),0
    )

    if(total!==100){
      alert("Percentages must equal 100")
      return
    }

    await fetch("/api/update-plan",{
      method:"POST",
      body:JSON.stringify(funds),
      headers:{'Content-Type':'application/json'}
    })

    alert("Saved")
  }

  return(
    <div className="space-y-8">

      <h1 className="text-3xl font-semibold">
        Edit Recommended Plan
      </h1>

      <div className="space-y-4">

        {funds.map((f,i)=>(
          <div
            key={i}
            className="flex justify-between items-center p-4 border border-neutral-800 rounded-lg bg-neutral-900"
          >
            <span>{f.fund}</span>

            <input
              type="number"
              value={f.targetPct}
              className="w-20 bg-neutral-800 border border-neutral-700 rounded px-3 py-2"
              onChange={(e)=>{
                const copy=[...funds]
                copy[i].targetPct=Number(e.target.value)
                setFunds(copy)
              }}
            />
          </div>
        ))}

      </div>

      <button
        onClick={update}
        className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-500"
      >
        Save Plan
      </button>

    </div>
  )
}