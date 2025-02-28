import { Payment, columns } from "./columns"
import DataTable from "@/components/helpers/data-table"
import {SquarePlus} from "lucide-react"

import { Button } from "@/components/ui/button"
import { time, timeLog } from "console"
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      Transactionid: "728ed52fa",
      Date: "Senin-2024-22-1",
      Total: 12000,
      status: "pending",
      price: "Rp.22000",
      id: ""
    },
    // ...
  ]
}

  
export default async function DemoPage() {
  const data = await getData()

  return (
    <>
    <div className="py-5" ><Button>
      <SquarePlus />Add Product
    </Button></div>
    
    <div className="">
    <DataTable columns={columns} data={data} />
  </div></>
    
  )
}
