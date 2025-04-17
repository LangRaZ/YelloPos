"use client"

import { useEffect, useState } from "react"
import { Transaction } from "@/interface"
import  DataTable  from "@/components/helpers/data_table"
import { getColumns } from "../columns"
import { getUserUID } from "@/lib/supabase/api_server"

export function TransactionTable({ data }: { data: Transaction[] }) {
  const [columns, setColumns] = useState(getColumns(""))
  
  useEffect(() => {
    const fetchUserUID = async () => {
      const uid = await getUserUID()
      setColumns(getColumns(uid))
    }
    
    fetchUserUID()
  }, [])
  
  return <DataTable columns={columns} data={data} />
}