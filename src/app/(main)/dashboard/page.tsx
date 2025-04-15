import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import  DataTable  from "@/components/helpers/data_table"
// import { columns } from "./columns"
import { BarOrderCompleted, BarOrderCount, BarProfit, getOrder, getOrderCompleted, getProfit } from "@/lib/supabase/api"
import BarchartOrder from "./bar_chart_order"
import { getUserBusinessProfileId } from "@/lib/supabase/api_server"
import BarchartProfit from "./bar_chart_profit"
import BarchartOrderCompleted from "./bar_chart_completed"
import ChartSwitcher from "./dropdown_barchart"


export default async function Dashboard({ searchParams }: { searchParams: { chart?: string } }) {
  const Profit =  await getProfit()
  const Order = await getOrder()
  const completedOrder = await getOrderCompleted()

  const dataOrder = await BarOrderCount()
  const dataOrderCompleted = await BarOrderCompleted()
  const dataProfit = await BarProfit()
  
  return (
    <>
      <div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          <div className="rounded-sm flex justify-evenly items-center">
              <Card>
                <CardHeader className="items-center">
                  <CardTitle >Profit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">Rp {Profit}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <CardTitle>Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">{Order}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <CardTitle>Order Completed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">{completedOrder}</p>
                  </div>
                </CardContent>
              </Card>
          </div>
          
      </div>
      <ChartSwitcher dataOrder={dataOrder} dataProfit={dataProfit} dataOrderCompleted={dataOrderCompleted}/>
    </>
    
  )
}
