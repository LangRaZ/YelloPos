import { columns } from "./columns"
import  DataTable  from "@/components/helpers/data_table"
import { getRoles, getUsers } from "@/lib/supabase/api"
import { CreateUserButton } from "./ui/actions"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "User Overview"
};

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
