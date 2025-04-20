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
import { columnsMonthly } from "./columnsMonthly"
import { columnsYearly } from "./columnsYearly"
import { getReportMonthly, getReportYearly } from "@/lib/supabase/api"
import { CreateReportYearlyButton } from "./ui/actionsYearly"
import { CreateReportMonthlyButton } from "./ui/actionsMonthly"

export default async function tax() {
  const {data: reportMonthly} = await getReportMonthly();
  const {data: reportYearly} = await getReportYearly();
  console.log(reportMonthly)

  return (
    <>
      <div>
          <h1 className="text-2xl font-bold mb-4">Laporan Pajak</h1>

          <div className="rounded-sm flex justify-evenly items-center">
              <Card>
                <CardHeader>
                  <CardTitle>Pendapatan Bruto Bulanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">0</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Akumulasi Pendapatan Bruto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">0</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Akumulasi Pajak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">0</p>
                  </div>
                </CardContent>
              </Card>
          </div>
      </div>
      <div className="mt-10">
        <Tabs defaultValue="monthly">
          <div className="flex justify-between">
            <TabsList className="grid w-full grid-cols-2 w-[400px]">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="monthly">
            <div className="justify-self-end mb-5">
              <CreateReportMonthlyButton/>
            </div>
            <DataTable columns={columnsMonthly} data={reportMonthly ?? []}></DataTable>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="justify-self-end mb-5">
              <CreateReportYearlyButton/>
            </div>
            <DataTable columns={columnsYearly} data={reportYearly ?? []}></DataTable>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
