import { getTransactions } from "@/lib/supabase/api"
import { TransactionTable } from "./ui/transaction_table";


export default async function TransactionOverviewPage() {
  const {data: transaction} = await getTransactions();

  // const count = products?.length

  return (
      <div className="">
        <TransactionTable data={transaction ?? []}/>
      </div>
  )
}
