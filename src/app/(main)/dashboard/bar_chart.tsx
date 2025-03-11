"use client"

import { Bar, BarChart,CartesianGrid,XAxis } from "recharts"

import { ChartConfig, ChartContainer ,ChartLegend, ChartLegendContent,ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"


const chartData = [
  { month: "January", Profit: 186, Sales: 80 },
  { month: "February", Profit: 305, Sales: 200 },
  { month: "March", Profit: 237, Sales: 120 },
  { month: "April", Profit: 73, Sales: 190 },
  { month: "May", Profit: 209, Sales: 130 },
  { month: "June", Profit: 214, Sales: 140 },
  { month: "July", Profit: 250, Sales: 160 },
  { month: "August", Profit: 250, Sales: 160 },
  { month: "September", Profit: 250, Sales: 160 },
  { month: "October", Profit: 250, Sales: 160 },
  { month: "November", Profit: 250, Sales: 160 },
  { month: "December", Profit: 250, Sales: 160 },
]

const chartConfig = {
    Profit: {
    label: "Profit",
    color: "#3a00e7",
  },
  Sales: {
    label: "Sales",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function Barchart() {
  return (
    <ChartContainer config={chartConfig} className="w-full max-w-4xl">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
    />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Profit" fill="var(--color-Profit)" radius={4} />
        <Bar dataKey="Sales" fill="var(--color-Sales)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
