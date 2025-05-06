import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/helpers/back_button";
import { getProduct, getCategories } from "@/lib/supabase/api";
import ProductForm from "../../ui/form";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit Product"
};

export default async function ProductEditPage(props : { params: Promise<{ id:string }> }){
    const param = await props.params;
    const id = Number(param.id)
    const product = await getProduct(id)
    const {data: categories} = await getCategories()

    if(!product.status) notFound();

    return (
        <>
            <div className="flex items-center mb-5">
                <BackButton target="/product"/>
                <h2 className="text-2xl font-semibold">Edit Product - {product.data?.product_name}</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
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
