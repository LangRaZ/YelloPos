import { columns } from "./columns"
import  DataTable  from "@/components/helpers/data_table"
import { getTransactions, getCategories } from "@/lib/supabase/api"


export default async function TransactionOverviewPage() {
  const {data: transaction} = await getTransactions();
  const {data: categories} = await getCategories();
  // const count = products?.length

  return (
    <>
      <div className="">
        <DataTable columns={columns} data={transaction ?? []} />
      </div>
    </>
  )
}
