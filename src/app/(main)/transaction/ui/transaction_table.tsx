"use client"

import { useEffect, useState } from "react"
import { Transaction } from "@/interface"
import  DataTable  from "@/components/helpers/data_table"
import { getColumns } from "../columns"
import { getCurrentUser } from "@/lib/supabase/api_server"

export function TransactionTable({ data }: { data: Transaction[] }) {
  const [columns, setColumns] = useState(getColumns("",1))
  
  useEffect(() => {
    const fetchUserUID = async () => {
      const user = await getCurrentUser();
      if(user.data){
        setColumns(getColumns(user.data.id,user.data.role_id??1))
      }
    }
    
    fetchUserUID()
  }, [])
  
  return <DataTable columns={columns} data={data} />
}