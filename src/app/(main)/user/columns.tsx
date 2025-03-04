"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { User } from "@/interface"
import Link from "next/link"
import DeleteAlert from "@/components/helpers/delete_alert"
import { deleteProduct } from "@/lib/supabase/api"
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
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "role_id",
    header: "Role",
  },
  
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-2">
          <Link href={`/user/${user.id}/edit`}>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => console.log("Edit", user.id)}
              className="flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
          <DeleteAlert
            id={user.id}
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