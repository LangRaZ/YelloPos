"use client"

import { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import BarchartOrder from "./bar_chart_order"
import BarchartProfit from "./bar_chart_profit"
import BarchartOrderCompleted from "./bar_chart_completed"

type Props = {
  dataOrder: any
  dataProfit: any
  dataOrderCompleted: any
}

export default function ChartSwitcher({ dataOrder, dataProfit, dataOrderCompleted }: Props) {
  const [selectedChart, setSelectedChart] = useState("order")

  return (
    <div className="space-y-4">
      <Select defaultValue={selectedChart} onValueChange={setSelectedChart}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a chart" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="order">Order</SelectItem>
          <SelectItem value="profit">Profit</SelectItem>
          <SelectItem value="completed">Order Completed</SelectItem>
        </SelectContent>
      </Select>

      {selectedChart === "order" && <BarchartOrder data={dataOrder} />}
      {selectedChart === "profit" && <BarchartProfit data={dataProfit} />}
      {selectedChart === "completed" && <BarchartOrderCompleted data={dataOrderCompleted} />}
    </div>
  )
}