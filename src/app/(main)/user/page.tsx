import { columns } from "./columns"
import  DataTable  from "@/components/helpers/data-table"
import { SquarePlus} from "lucide-react"
import { getProducts, getCategories } from "@/lib/supabase/api"
import { CreateUserButton } from "./ui/actions"
import Link from "next/link";

import { Button } from "@/components/ui/button"

export default async function ProductOverviewPage() {
  const {data: products} = await getProducts();
  const {data: categories} = await getCategories();
  const count = products?.length

  return (
    <>
      <div className="container mx-auto py-5">
        <CreateUserButton categoriesData={categories}/>
      </div>
      <div className="container mx-auto">
        <DataTable columns={columns} data={products ?? []} />
      </div>
    </>
  )
}
