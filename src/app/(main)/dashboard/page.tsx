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
import { Barchart } from "./bar_chart"
export default function Dashboard() {
  return (
    <>
      <div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          <div className="rounded-sm flex justify-evenly items-center">
              <Card>
                <CardHeader className="items-center">
                  <CardTitle >Penghasilan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">Rp 5000000</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <CardTitle>Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">300</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <CardTitle>Order terbayar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">280</p>
                  </div>
                </CardContent>
              </Card>
          </div>
          
      </div>
      <Barchart></Barchart>
    </>
    
  )
}
