import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/helpers/back_button";
import { getRoles, getusers} from "@/lib/supabase/api";
import UserForm from "../../ui/form";
import { notFound } from "next/navigation";
import { Metadata } from "next";


export default async function UserEditPage({ params } : { params:{ id:string } }){
    const param = await params;
    const id = param.id
    const user = await getusers(id)
    const {data: Roles} = await getRoles()

    if(!user.status) notFound();

    return (
        <>
            <div className="flex items-center mb-5">
                <BackButton />
                <h2 className="text-2xl font-semibold">Edit Product - {user.data?.name}</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Product details</CardTitle>
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
