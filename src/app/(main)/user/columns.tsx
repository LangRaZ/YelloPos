"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { User } from "@/interface"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "description",
    header: "Phone Number",
  },
  {
    accessorKey: "role_id",
    header: "Role",
  },
  
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => console.log("Edit", user.id)}
              className="flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button 
              variant="destructive"
              size="sm"
              onClick={() => console.log("Delete", user.id)}
              className="flex items-center gap-1"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        );
      },
  },

]