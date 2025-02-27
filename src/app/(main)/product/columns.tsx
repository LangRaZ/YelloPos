"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  product_name: string
  product_category_id : string
  description : string
  sell_price : string
  quantity : number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  action : boolean
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "product_name",
    header: "Product",
  },
  {
    accessorKey: "product_category_id",
    header: "Category",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "sell_price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Stock",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => console.log("Edit", product.id)}
              className="flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button 
              variant="destructive"
              size="sm"
              onClick={() => console.log("Delete", product.id)}
              className="flex items-center gap-1"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        );
      },
  },
   
]
