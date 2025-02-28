"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: string
  name: string
  description: string
}
 
export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
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
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => console.log("Edit", category.id)}
              className="flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button 
              variant="destructive"
              size="sm"
              onClick={() => console.log("Delete", category.id)}
              className="flex items-center gap-1"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        );
      },
  },
]