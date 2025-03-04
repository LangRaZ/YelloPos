import { columns } from "./columns"
import  DataTable  from "@/components/helpers/data_table"
import { SquarePlus} from "lucide-react"
import {  getUser,getRoles } from "@/lib/supabase/api"
import { CreateUserButton } from "./ui/actions"
import Link from "next/link";

import { Button } from "@/components/ui/button"

export default async function UserOverviewPage() {
  const {data: Users} = await getUser();
  const {data: Roles} = await getRoles();
  const count = Users?.length

  return (
    <>
      <div className="container mx-auto py-5">
        <CreateUserButton RolesData={Roles}/>
      </div>
      <div className="container mx-auto">
        <DataTable columns={columns} data={Users ?? []} />
      </div>
    </>
  )
}
