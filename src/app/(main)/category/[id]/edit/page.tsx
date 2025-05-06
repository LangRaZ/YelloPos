import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/helpers/back_button";
import { getCategory} from "@/lib/supabase/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryForm from "../../ui/form";

export async function generateMetadata(): Promise<Metadata> {
    // You can fetch data here to create dynamic metadata if needed
    return {
      title: "Edit Category",
    };
  }

type PageParams = {
    params: {
      id: string;
    };
};

export default async function Page({ params } : PageParams){
    const {id} = params;
    const category = await getCategory(Number(id))
    

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
