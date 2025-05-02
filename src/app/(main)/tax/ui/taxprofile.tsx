"use client"
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
import { columnsMonthly } from "../columnsMonthly"
import { columnsYearly } from "../columnsYearly"
import { getaccumulatedtax, getProfit, getReportMonthly, getReportYearly, getTaxProfile, getyearlygross } from "@/lib/supabase/api"
import { CreateReportYearlyButton } from "./actionsYearly"
import { CreateReportMonthlyButton } from "./actionsMonthly"
import { Metadata } from "next"
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
        setLoading(false);

        
      }
      
      fetchData();
  }, []);
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
                  {loading ? (
            <Loader2 className="animate-spin" />
          ) : Gross === null ? (
            <p className="text-4xl font-bold text-purple-600 text-wrap">Rp0</p>
          ) : (
            <p className="text-4xl font-bold text-purple-600 text-wrap">Rp{Gross.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Akumulasi Pendapatan Bruto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                  {loading ? (
            <Loader2 className="animate-spin" />
          ) : yearlyGross === null ? (
            <p className="text-4xl font-bold text-purple-600 text-wrap">Rp0</p>
          ) : (
            <p className="text-4xl font-bold text-purple-600 text-wrap">Rp{yearlyGross.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Akumulasi Pajak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center relative">
                  {loading ? (
            <Loader2 className="animate-spin" />
          ) : accumulatedTax === null ? (
            <p className="text-4xl font-bold text-purple-600 text-wrap">Rp0</p>
          ) : (
            <p className="text-4xl font-bold text-purple-600 text-wrap">Rp{accumulatedTax.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}
                  </div>
                </CardContent>
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
