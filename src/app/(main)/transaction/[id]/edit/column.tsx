"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EditOrderDetailButton } from "./ui/actions"
import { OrderDetail } from "@/interface"
import { deleteOrderDetail } from "@/lib/supabase/api"
import ConfirmationAlert from "@/components/helpers/confirmation_alert"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<OrderDetail>[] = [
  {
    accessorKey: "product_detail.product_name",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: "current_price",
    header: "Price per Qty",
    cell: ({row}) => `Rp${row.original.current_price}`,
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({row}) => `Rp${row.original.total_price}`,
  },
  {
    accessorKey: "action",
    header: "Actions",

    cell: ({ row }) => {
        const orderDetails = row.original;

        return (
          <div className="flex gap-2 justify-center">
            <EditOrderDetailButton data={orderDetails}/>
            <ConfirmationAlert
              id={orderDetails.id.toString()}
              EditAction={deleteOrderDetail}
              warningMessage="This action cannot be undone. This order item will be deleted permanently"
              successMessage="Delete success!"
              successDescription="Order item has been deleted"
              variant="Delete"
              needReload={true}
            />
          </div>
        );
      },
  },

]