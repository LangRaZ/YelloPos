"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import  DataTable  from "@/components/helpers/data_table"
import { columnsMonthly } from "../columnsMonthly"
import { columnsYearly } from "../columnsYearly"
import { getaccumulatedtax, getProfit, getReportMonthly, getReportYearly, getTaxProfile, getyearlygross } from "@/lib/supabase/api"
import { CreateReportYearlyButton } from "./actionsYearly"
import { CreateReportMonthlyButton } from "./actionsMonthly"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { Reports, Tax } from "@/interface"
import { ChangeTaxButton } from "./actionsEditTax"


export default function TaxProfile() {
const [loading, setLoading] = useState(true);
  const [Gross, setGross] = useState<number|null>(null) 
  const [yearlyGross, setYearlyGross] = useState<number|null>(null) 
  const [accumulatedTax, setAccumulatedTax] = useState<number|null>(null) 
  const [taxprofile,setTaxProfile]=useState<Tax|null>(null)
  
  const [reportMonthly,setReportMonthly] = useState<Reports[]|null>(null) 
  const [reportYearly,setReportYearly] = useState<Reports[]|null>(null) 
  const [month, setMonth] = useState<string>("")
  const [year, setYear] = useState<string>("")
  
  // console.log(reportMonthly)
  
useEffect(() => {
    async function fetchData() {
        const Gross = await getProfit()
        setGross(Gross.data)
        const yearlyGross = await getyearlygross()
        setYearlyGross(yearlyGross.data)
        const accumulatedTax = await getaccumulatedtax()
        setAccumulatedTax(accumulatedTax.data)

        const {data: reportMonthly} = await getReportMonthly();
        setReportMonthly(reportMonthly)
        const {data: reportYearly} = await getReportYearly();
        setReportYearly(reportYearly)

        const taxprofile = await getTaxProfile()
        setTaxProfile(taxprofile.data)

        const now = new Date();
        const currentMonth = now.toLocaleString("default", { month: "long" });
        const currentYear = now.toLocaleString("default", { year: "numeric" });
        setMonth(currentMonth)
        setYear(currentYear)

        setLoading(false);

        
      }
      
      fetchData();
  }, []);
  return (
    <>
      <div>
          <h1 className="text-2xl font-bold mb-6">Tax Report</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              <Card className="shadow-md text-wrap break-words">
                <CardHeader className="text-start">
                  <CardTitle className="text-xl text-gray-700">Monthly Gross Income</CardTitle>
                </CardHeader>
                <CardContent className="text-start text-wrap">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : Gross === null ? (
                    <p className="text-3xl font-bold text-purple-600 text-wrap">Rp0,00</p>
                  ) : (
                    <p className="text-3xl font-bold text-purple-600 text-wrap">Rp{Gross.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-md text-muted-foreground">{month}</p>
                </CardFooter>
              </Card>
              <Card className="shadow-md text-wrap break-words">
                <CardHeader className="text-start">
                  <CardTitle className="text-xl text-gray-700">Annual Gross Income</CardTitle>
                </CardHeader>
                <CardContent className="text-start text-wrap">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : yearlyGross === null ? (
                    <p className="text-3xl font-bold text-purple-600 text-wrap">Rp0,00</p>
                  ) : (
                    <p className="text-3xl font-bold text-purple-600 text-wrap">Rp{yearlyGross.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  )}              
                </CardContent>
                <CardFooter>
                  <p className="text-md text-muted-foreground">{year}</p>
                </CardFooter>
              </Card>
              <Card className="shadow-md text-wrap break-words">
                <CardHeader className="text-start">
                  <CardTitle className="text-xl text-gray-700">Annual Tax Accumulation</CardTitle>
                </CardHeader>
                <CardContent className="text-start text-wrap">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : accumulatedTax === null ? (
                    <p className="text-3xl font-bold text-purple-600 text-wrap">Rp0,00</p>
                  ) : (
                    <p className="text-3xl font-bold text-purple-600 text-wrap">Rp{accumulatedTax.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-md text-muted-foreground">{year}</p>
                </CardFooter>
              </Card>
          </div>
      </div>
      <ChangeTaxButton TaxProfile={taxprofile}/>
      <div className="mt-10">
        <Tabs defaultValue="monthly">
          <div className="flex justify-between">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
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
