"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Transaction } from "@/interface"
import { format } from "date-fns"



export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction Id",
    cell: ({row}) => `TR${row.original.id}`,
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({row})=> format(new Date(row.original.created_at), "dd-MM-yyyy")
  },
  {
    accessorKey: "total_payment",
    header: "Total",
  },
  {
    accessorKey: "transaction_status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Actions",

    cell: ({ row }) => {
        const transaction = row.original;

        return (
          <div className="flex gap-2 justify-center">
            <Link href={`/transaction/${transaction.id}/edit`}>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => console.log("Edit", transaction.id)}
                className="flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </Link>
            
          </div>
        );
      },
  },

]