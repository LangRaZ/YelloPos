import { columns } from "./columns"
import  DataTable  from "@/components/helpers/data_table"
import { SquarePlus} from "lucide-react"
import { getUser, getRoles, getUsers } from "@/lib/supabase/api"
import { CreateUserButton } from "./ui/actions"

export default async function UserOverviewPage() {
  const {data: Users} = await getUsers();
  const {data: Roles} = await getRoles();
  const count = Users?.length

  return (
    <>
      <div className="py-5">
        <CreateUserButton RolesData={Roles}/>
      </div>
      <div className="">
        <DataTable columns={columns} data={Users ?? []} />
      </div>
    </>
  )
}
