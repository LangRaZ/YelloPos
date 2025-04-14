"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

type ChartDataItem = {
  month: string
  sum: number
}

export default function BarchartProfit({ data }: { data: ChartDataItem[] }) {
  if (data.length === 0) {
    return <p>No data available for this business profile.</p> // Handle no data case
  }

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          
          {/* X-Axis with month labels */}
          <XAxis
            dataKey="month"
            tickFormatter={(value) => value.slice(0, 3)} // Jan, Feb, etc.
            tick={{ fontSize: 12 }}
            label={{ value: "Month", position: "insideBottom", offset: -25 }}
            
          />

          {/* Y-Axis with order count */}
          <YAxis
            label={{
              value: "sum",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
            tick={{ fontSize: 12 }}
          />

          {/* Tooltip */}
          <Tooltip />

          {/* Legend */}
          <Legend verticalAlign="top" height={36} />

          {/* Bar Chart */}
          <Bar dataKey="sum" fill="#3a00e7" radius={[4, 4, 0, 0]} name="Order" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
  )
}
