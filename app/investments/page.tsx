async function getData(){
  const res = await fetch("http://localhost:3000/api/holdings")
  return res.json()
}

export default async function Page(){

  const data = await getData()

  const total = data.reduce(
    (sum:any,h:any)=>sum+h.current_value,0
  )

  return(
    <div className="space-y-8">

      <h1 className="text-3xl font-semibold">
        Amit's Investments
      </h1>

      <div className="space-y-4">

        {data.map((h:any)=>(
          <div
            key={h.fund_id}
            className="flex justify-between p-4 border border-neutral-800 rounded-lg bg-neutral-900"
          >
            <span>{h.fund_name}</span>

            <span className="font-semibold">
              ₹{h.current_value.toLocaleString()}
            </span>
          </div>
        ))}

      </div>

      <div className="p-6 border border-neutral-800 rounded-lg bg-neutral-900">

        <p className="text-sm text-neutral-400">
          Total Portfolio Value
        </p>

        <p className="text-2xl font-semibold">
          ₹{total.toLocaleString()}
        </p>

      </div>

    </div>
  )
}