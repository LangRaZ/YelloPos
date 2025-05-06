import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/helpers/back_button";
import { getRoles, getUser} from "@/lib/supabase/api";
import UserForm from "../../ui/form";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit User"
};
  

export default async function UserEditPage({ params } : { params:{ id:string } }){
    const param = params;
    const id = param.id
    const user = await getUser(id)
    const {data: Roles} = await getRoles()

    if(!user.status) notFound();

    return (
        <>
            <div className="flex items-center mb-5">
                <BackButton target="/user"/>
                <h2 className="text-2xl font-semibold">Edit User - {user.data?.name}</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <UserForm 
                        id={user.data?.id}
                        data={user.data}
                        roles={Roles}
                        isOnPage
                    />
                </CardContent>
            </Card>
        </>
    )
}
