"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChartSwitcher from "./dropdown_barchart"
import TopSellingCard from "./top_selling"
import {
  BarOrderCompleted,
  BarOrderCount,
  BarProfit,
  getOrder,
  getOrderCompleted,
  getProfit,
} from "@/lib/supabase/api"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [Income, setIncome] = useState<number|null>(null) 
  const [Order, setOrder] = useState<number|null>(null) 
  const [completedOrder, setCompletedOrder] = useState<number|null>(null)
  const [dataOrder, setDataOrder] = useState<any[]>([])
  const [dataOrderCompleted, setDataOrderCompleted] = useState<any[]>([])
  const [dataIncome, setDataIncome] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
        const Income = await getProfit()
        const Order = await getOrder()
        const completedOrder = await getOrderCompleted()
        setIncome(Income.data)
        setOrder(Order.data)
        setCompletedOrder(completedOrder.data)
      
        const dataOrder = await BarOrderCount()
        const dataOrderCompleted = await BarOrderCompleted()
        const dataIncome = await BarProfit()
        setDataOrder(dataOrder)
        setDataOrderCompleted(dataOrderCompleted)
        setDataIncome(dataIncome)
        setLoading(false);
      }
      
      fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-md">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl text-gray-700">Income</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-wrap">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : Income === null ? (
            <p className="text-sm text-muted-foreground">N/A</p>
          ) : (
            <p className="text-4xl font-bold text-purple-600 text-wrap">Rp{Income.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl text-gray-700">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : Order === null ? (
            <p className="text-sm text-muted-foreground">N/A</p>
          ) : (
            <p className="text-4xl font-bold text-purple-600 text-wrap">{Order}</p>
          )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl text-gray-700">Orders Completed</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : completedOrder === null ? (
            <p className="text-sm text-muted-foreground">N/A</p>
          ) : (
            <p className="text-4xl font-bold text-purple-600 text-wrap">{completedOrder}</p>
          )}
          </CardContent>
        </Card>
      </div>

      {/* Chart + Top Selling Section Side by Side */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Chart takes 2/3 */}
        <div className="md:col-span-2">
          <ChartSwitcher
            loading={loading}
            dataOrder={dataOrder}
            dataProfit={dataIncome}
            dataOrderCompleted={dataOrderCompleted}
          />
        </div>

        {/* Top Selling Card takes 1/3 */}
        <div className="w-full">
          <TopSellingCard />
        </div>
      </div>

    </div>
  )
}
