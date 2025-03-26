"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Category, Product } from "@/interface"
import { deleteCategory } from "@/lib/supabase/api"
import ConfirmationAlert from "@/components/helpers/confirmation_alert"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "category_name",
    header: "Category",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "action",
    header: "Actions",

    cell: ({ row }) => {
        const category = row.original;

        return (
          <div className="flex gap-2 justify-center">
            <Link href={`/category/${category.id}/edit`}>
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </Link>
            <ConfirmationAlert
              id={category.id.toString()}
              EditAction={deleteCategory}
              warningMessage="This action cannot be undone. This category will be deleted permanently"
              successMessage="Delete success!"
              successDescription="Category has been deleted"
              variant="Delete"
            />
          </div>
        );
      },
  },

]