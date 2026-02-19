"use client"

import {
  DollarSign,
  Home,
  Wrench,
  TrendingUp,
} from "lucide-react"

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts"

export default function Dashboard() {
  const revenueData = [
    { month: "Aug", revenue: 98000 },
    { month: "Sep", revenue: 105000 },
    { month: "Oct", revenue: 95000 },
    { month: "Nov", revenue: 115000 },
    { month: "Dec", revenue: 120000 },
    { month: "Jan", revenue: 125000 },
  ]

  const statsCards = [
    {
      title: "Total Revenue",
      value: "€125,000",
      change: "+4.2%",
      changeText: "+€5,000 from last month",
      changeColor: "text-green-600",
      icon: DollarSign,
    },
    {
      title: "Vacancy Rate",
      value: "8%",
      change: "-1.3%",
      changeText: "Compared to last month",
      changeColor: "text-red-500",
      icon: Home,
    },
    {
      title: "Open Tickets",
      value: "14",
      change: "2 new",
      changeText: "Pending maintenance requests",
      changeColor: "text-yellow-600",
      icon: Wrench,
    },
  ]

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Summary of your portfolio performance and maintenance activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card, index) => {
          const Icon = card.icon

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="text-[#003E8A]" size={20} />
                </div>

                <span
                  className={`text-sm font-medium flex items-center gap-1 ${card.changeColor}`}
                >
                  {card.title === "Total Revenue" && (
                    <TrendingUp size={14} />
                  )}
                  {card.change}
                </span>
              </div>

              <h3 className="mt-4 text-sm text-gray-500">
                {card.title}
              </h3>

              <p className="text-2xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {card.changeText}
              </p>
            </div>
          )
        })}
      </div>

      {/* Revenue Trend Section */}
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Revenue Trend
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monthly income over the last 6 months.
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003E8A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#003E8A" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value) => [
                  `€${value.toLocaleString()}`,
                  "Revenue",
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#003E8A"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
