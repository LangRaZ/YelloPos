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

export default async function Dashboard({ searchParams }: { searchParams: { chart?: string } }) {
  const Profit = await getProfit()
  const Order = await getOrder()
  const completedOrder = await getOrderCompleted()

  const dataOrder = await BarOrderCount()
  const dataOrderCompleted = await BarOrderCompleted()
  const dataProfit = await BarProfit()

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-md">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl text-gray-700">Profit</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {typeof Profit === "number" ? (
              <p className="text-4xl font-bold text-purple-600">Rp.{Profit.toLocaleString()}</p>
            ) : (
            <p className="text-sm text-muted-foreground">Profit data not available</p>
            )}  
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl text-gray-700">Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-blue-600">{typeof Order === "number" ? Order : "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl text-gray-700">Orders Completed</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
          {typeof completedOrder === "number" ? (
            <p className="text-4xl font-bold text-purple-600">{completedOrder}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Data not available</p>
          )}

          </CardContent>
        </Card>
      </div>

      {/* Chart + Top Selling Section Side by Side */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Chart takes 2/3 */}
        <div className="md:col-span-2">
          <ChartSwitcher
            dataOrder={dataOrder}
            dataProfit={dataProfit}
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
