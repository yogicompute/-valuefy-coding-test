import Link from "next/link"

const routes = [
  {
    name: "Portfolio Comparison",
    path: "/comparison",
    desc: "See buy / sell recommendations based on the advisor plan"
  },
  {
    name: "Current Investments",
    path: "/investments",
    desc: "View Amit's current portfolio holdings"
  },
  {
    name: "Rebalancing History",
    path: "/history",
    desc: "Past rebalance recommendations"
  },
  {
    name: "Edit Recommended Plan",
    path: "/edit-plan",
    desc: "Modify target allocation percentages"
  }
]

export default function Home() {
  return (
    <div className="space-y-10">

      <h1 className="text-4xl font-semibold">
        Portfolio Rebalance App
      </h1>

      <div className="grid gap-6">

        {routes.map(route => (
          <Link
            key={route.path}
            href={route.path}
            className="block p-6 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition"
          >

            <h2 className="text-xl font-medium">
              {route.name}
            </h2>

            <p className="text-sm text-neutral-400 mt-1">
              {route.desc}
            </p>

            <p className="text-blue-400 mt-3 text-sm">
              Open →
            </p>

          </Link>
        ))}

      </div>

    </div>
  )
}