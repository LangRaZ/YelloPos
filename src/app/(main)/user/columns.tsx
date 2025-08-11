"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { User } from "@/interface"
import Link from "next/link"
import ConfirmationAlert from "@/components/helpers/confirmation_alert"
import { deleteUser } from "@/lib/supabase/api"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "Role.role_name",
    header: "Role",
  },
  
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-2 justify-center">
          <Link href={`/user/${user.id}/edit`}>
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
          <ConfirmationAlert
            id={user.id}
            EditAction={deleteUser}
            warningMessage="This action cannot be undone. This user will be deleted permanently"
            successMessage="Delete success!"
            successDescription="User has been deleted"
            variant="Delete"
          />
        </div>
      );
    },
  },

]