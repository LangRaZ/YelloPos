import { columns } from "./columns"
import  DataTable  from "@/components/helpers/data_table"
import { getTransactions } from "@/lib/supabase/api"


export default async function TransactionOverviewPage() {
  const {data: transaction} = await getTransactions();
  // const count = products?.length

  return (
    <>
      <div className="">
        <DataTable columns={columns} data={transaction ?? []} />
      </div>
    </>
  )
}
