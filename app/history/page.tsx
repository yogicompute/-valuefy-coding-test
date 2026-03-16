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
        <p className="text-neutral-400">
          No recommendations saved yet.
        </p>
      )}

      <div className="space-y-4">

        {data.map((h:any)=>(
          <div
            key={h.created_at}
            className="p-4 bg-neutral-900 border border-neutral-800 rounded flex justify-between"
          >
            <span>{h.created_at}</span>
            <span>₹{h.portfolio_value}</span>
            <span>{h.status}</span>
          </div>
        ))}

      </div>

    </div>
  )
}