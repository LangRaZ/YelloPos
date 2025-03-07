"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Transaction } from "@/interface"
import { deleteProduct } from "@/lib/supabase/api"
import DeleteAlert from "@/components/helpers/delete_alert"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transaction_id",
    header: "Transaction Id",
  },
  {
    accessorKey: "created_at",
    header: "Date",
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
          <div className="flex gap-2">
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