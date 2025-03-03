import { columns } from "./columns"
import  DataTable  from "@/components/helpers/data_table"
import { getProducts, getCategories } from "@/lib/supabase/api"
import { CreateProductButton } from "./ui/actions"


export default async function ProductOverviewPage() {
  const {data: products} = await getProducts();
  const {data: categories} = await getCategories();
  // const count = products?.length

  return (
    <>
      <div className="py-5">
        <CreateProductButton categoriesData={categories}/>
      </div>
      <div className="">
        <DataTable columns={columns} data={products ?? []} />
      </div>
    </>
  )
}
