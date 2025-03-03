"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Product } from "@/interface"
import { deleteProduct } from "@/lib/supabase/api"
import DeleteAlert from "@/components/helpers/delete_alert"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_name",
    header: "Product",
  },
  {
    accessorKey: "Category.category_name",
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
    header: "Actions",

    cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex gap-2">
            <Link href={`/product/${product.id}/edit`}>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => console.log("Edit", product.id)}
                className="flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </Link>
            <DeleteAlert
              id={product.id}
              action={deleteProduct}
              warningMessage="This action cannot be undone. This product will be deleted permanently"
              successMessage="Delete success!"
              successDescription="Product has been deleted"
            />
          </div>
        );
      },
  },

]