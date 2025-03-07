import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/helpers/back_button";
import { getProduct, getCategories } from "@/lib/supabase/api";
import ProductForm from "../../ui/form";
import { notFound } from "next/navigation";
import { Metadata } from "next";


export default async function TransactionEditPage({ params } : { params:{ id:string } }){
    const param = await params;
    const id = Number(param.id)
    const product = await getProduct(id)
    const {data: categories} = await getCategories()

    if(!product.status) notFound();

    return (
        <>
            <div className="flex items-center mb-5">
                <BackButton />
                <h2 className="text-2xl font-semibold">Edit Product - {product.data?.product_name}</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Product details</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductForm 
                        id={product.data?.id}
                        data={product.data}
                        categories={categories}
                        isOnPage
                    />
                </CardContent>
            </Card>
        </>
    )
}
