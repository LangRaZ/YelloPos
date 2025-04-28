"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Transaction } from "@/interface"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import ConfirmationAlert from "@/components/helpers/confirmation_alert"
import { cancelOrder } from "@/lib/supabase/api"
import { ProcessOrderButton } from "./ui/actions"


export function getColumns(currentUserUID: string): ColumnDef<Transaction>[]{
  return [

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
      cell: ({row}) => `Rp${row.original.total_payment}`,
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="p-4 w-8 h-7">
                    <DotsVerticalIcon></DotsVerticalIcon>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-30">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                      <Link href={`/transaction/${transaction.id}/view`}>
                        View Detail
                      </Link>
                    </DropdownMenuItem>
                    {transaction.transaction_status !== "Cancelled" && 
                      <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href={`/transaction/${transaction.id}/edit`}>
                          Edit Transaction
                        </Link>
                      </DropdownMenuItem>
                    }
                    {((transaction?.transaction_status === "Pending" || transaction?.transaction_status === "In-Process") && 
                      <ProcessOrderButton id={currentUserUID} transaction={transaction} />
                    )}
                    {transaction?.transaction_status === "Pending" && (
                      <ConfirmationAlert
                        id={transaction.id.toString()}
                        EditAction={cancelOrder}
                        warningMessage="This action cannot be undone. This order will be cancelled permanently"
                        successMessage="Cancellation success!"
                        successDescription="Order has been cancelled"
                        variant="Cancel"
                      />
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
    },
  ]
}

export const column: ColumnDef<Transaction>[] = getColumns("")