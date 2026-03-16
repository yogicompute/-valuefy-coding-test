async function getData(){
  const res = await fetch("http://localhost:3000/api/history")
  return res.json()
}

export default async function Page(){

  const data = await getData()

  return(
    <div className="space-y-8">

      <h1 className="text-3xl font-semibold">
        Rebalancing History
      </h1>

      {data.length === 0 && (
        <div className="p-6 border border-neutral-800 rounded-lg bg-neutral-900 text-neutral-400">
          No rebalance recommendations saved yet.
        </div>
      )}

      <div className="space-y-4">

        {data.map((h:any,i:number)=>(
          <div
            key={i}
            className="p-4 border border-neutral-800 rounded-lg bg-neutral-900 flex justify-between"
          >
            <span>{h.created_at}</span>
            <span>₹{h.portfolio_value}</span>
            <span className="text-neutral-400">{h.status}</span>
          </div>
        ))}

      </div>

    </div>
  )
}