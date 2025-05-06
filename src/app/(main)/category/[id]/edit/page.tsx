import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/helpers/back_button";
import { getCategory} from "@/lib/supabase/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryForm from "../../ui/form";

export const metadata: Metadata = {
    title: "Edit Category"
};

export default async function CompanyEditPage({ params } : { params:{ id:string } }){
    const param = params;
    const id = Number(param.id)
    const category = await getCategory(id)
    

    if(!category.status) notFound();

    return (
        <>
            <div className="flex items-center mb-5">
                <BackButton target="/category"/>
                <h2 className="text-2xl font-semibold">Edit Category - {category.data?.category_name}</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <CategoryForm 
                        id={category.data?.id}
                        data={category.data}
                        isOnPage
                    />
                </CardContent>
            </Card>
        </>
    )
}
