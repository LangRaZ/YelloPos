"use client"

import { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import BarchartDashboard from "./barchart_dashboard"
import { Loader2 } from "lucide-react"

type Props = {
  dataOrder: {month:string, count: number}[]
  dataProfit: {month:string, sum: number}[]
  dataOrderCompleted: {month:string, count: number}[]
  loading: boolean
}

export default function ChartSwitcher({ dataOrder, dataProfit, dataOrderCompleted, loading }: Props) {
  const [selectedChart, setSelectedChart] = useState("order")

  return (
    <div className="space-y-4">
      <Select defaultValue={selectedChart} onValueChange={setSelectedChart}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a chart" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="order">Order</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="completed">Order Completed</SelectItem>
        </SelectContent>
      </Select>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          {selectedChart === "order" && <BarchartDashboard data={dataOrder} barKey="count" barName="Order"/>}
          {selectedChart === "income" && <BarchartDashboard data={dataProfit} barKey="sum" barName="Income" YLabelOffset={-10}/>}
          {selectedChart === "completed" && <BarchartDashboard data={dataOrderCompleted} barKey="count" barName="Order Completed" />}
        </>
      )}
    </div>
  )
}