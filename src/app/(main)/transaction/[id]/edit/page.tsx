import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/helpers/back_button";
import { getTransactionById } from "@/lib/supabase/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import TransactionForm from "../../ui/form";


export default async function TransactionEditPage({ params } : { params:{ id:string } }){
    const param = await params;
    const id = Number(param.id)
    const transaction = await getTransactionById(id)

    if(!transaction.status) notFound();

    return (
        <>
            <div className="flex items-center mb-5">
                <BackButton />
                <h2 className="text-2xl font-semibold">Process Transaction - TR{transaction.data?.id}</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <TransactionForm id={id} data={transaction.data} isOnPage/>
                </CardContent>
            </Card>
        </>
    )
}
