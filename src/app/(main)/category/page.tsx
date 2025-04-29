import { columns } from "./columns"
import  DataTable  from "@/components/helpers/data_table"
import { getCategories } from "@/lib/supabase/api"
import { CreateCategoryButton } from "./ui/actions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category Overview"
};

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
