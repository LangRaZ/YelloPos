"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  const [dataOrder, setDataOrder] = useState<{month:string, count: number}[]>([])
  const [dataOrderCompleted, setDataOrderCompleted] = useState<{month:string, count: number}[]>([])
  const [dataIncome, setDataIncome] = useState<{month:string, sum: number}[]>([])
  const [month, setMonth] = useState<string>("")

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
        
        const now = new Date();
        const currentMonth = now.toLocaleString("default", { month: "long" });
        setMonth(currentMonth)

        setLoading(false);
      }
      
      fetchData();
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-md text-wrap break-words">
          <CardHeader className="text-start">
            <CardTitle className="text-xl text-gray-700">Gross Income</CardTitle>
          </CardHeader>
          <CardContent className="text-start text-wrap">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : Income === null ? (
              <p className="text-3xl font-bold text-purple-600 text-wrap">Rp0,00</p>
            ) : (
              <p className="text-3xl font-bold text-purple-600 text-wrap">Rp{Income.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-md text-muted-foreground">{month}</p>
          </CardFooter>
        </Card>

        <Card className="shadow-md text-wrap break-words">
          <CardHeader className="text-start">
            <CardTitle className="text-xl text-gray-700">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-start">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : Order === null ? (
            <p className="text-3xl font-bold text-purple-600 text-wrap">0</p>
          ) : (
            <p className="text-3xl font-bold text-purple-600 text-wrap">{Order}</p>
          )}
          </CardContent>
          <CardFooter>
            <p className="text-md text-muted-foreground">{month}</p>
          </CardFooter>
        </Card>

        <Card className="shadow-md text-wrap break-words">
          <CardHeader className="text-start">
            <CardTitle className="text-xl text-gray-700">Orders Completed</CardTitle>
          </CardHeader>
          <CardContent className="text-start">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : completedOrder === null ? (
            <p className="text-3xl font-bold text-purple-600 text-wrap">0</p>
          ) : (
            <p className="text-3xl font-bold text-purple-600 text-wrap">{completedOrder}</p>
          )}
          </CardContent>
          <CardFooter>
            <p className="text-md text-muted-foreground">{month}</p>
          </CardFooter>
        </Card>
      </div>

      {/* Chart + Top Selling Section Side by Side */}
      <div className="mb-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
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
          <TopSellingCard month={month}/>
        </div>
      </div>

    </div>
  )
}
