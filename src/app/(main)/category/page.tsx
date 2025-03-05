import { columns } from "./columns"
import  DataTable  from "@/components/helpers/data_table"
import { getProducts, getCategories } from "@/lib/supabase/api"
import { CreateCategoryButton } from "./ui/actions"


export default async function CategoryOverviewPage() {
  const {data: categories} = await getCategories();
  // const count = products?.length

  return (
    <>
      <div className="py-5">
        <CreateCategoryButton/>
      </div>
      <div className="">
        <DataTable columns={columns} data={categories ?? []} />
      </div>
    </>
  )
}
