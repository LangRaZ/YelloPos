import { columns } from "./columns"
import { DataTable } from "@/components/partials/data-table"
import { SquarePlus} from "lucide-react"
import { getProducts } from "@/lib/supabase/api"
import Link from "next/link";

import { Button } from "@/components/ui/button"
// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       product: "Nasi Hainam",
//       category: "Hainam",
//       status: "pending",
//       email: "m@example.com",
//       price: "Rp.22000",
//       stock: 0 ,
//       action : true,
//     },
//     // ...
//   ]
// }

  
export default async function DemoPage() {
  const {data} = await getProducts(); 

  return (
    <>
    <div className="container mx-auto py-5"><Link href="/product/form"><Button>
      <SquarePlus />Add Product
    </Button></Link></div>
    
    <div className="container mx-auto">
    <DataTable columns={columns} data={data as any[]} />
  </div></>
    
  )
}
