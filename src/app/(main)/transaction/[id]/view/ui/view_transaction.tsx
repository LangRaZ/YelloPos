"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/helpers/back_button";
import { getOrderDetailsbyOrderId, getTransactionById } from "@/lib/supabase/api";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderDetail, Transaction } from "@/interface";
import { Separator } from "@/components/ui/separator";
import { StringToDateTime } from "@/lib/utils";


export default function ViewTransaction({ params } : { params:{ id:string } }){
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState<number>()
    const [Transaction, setTransaction] = useState<Transaction|null>(null);
    const [OrderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

    
    useEffect(()=>{
        const init = async () =>{
            const param = await params;
            const id = Number(param.id)
            setId(id)

            const {data: transaction} = await getTransactionById(id)
            setTransaction(transaction??null)

            const orderId = transaction?.id
            const orderDetails = await getOrderDetailsbyOrderId(orderId??0)
            setOrderDetails(orderDetails.data??[])
            
            
            setLoading(false);
            if(!Transaction) notFound();
        }
    
        init();
    },[]);
    
    
    if(loading){
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="flex items-center mb-5">
                <BackButton target="/transaction"/>
                <h2 className="text-2xl font-semibold">View Transaction - TR{Transaction?.id}</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Transaction Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>Transaction Status : <span className="font-medium">{Transaction?.transaction_status}</span></p>
                        <p>Processed By : <span className="font-medium">{Transaction?.Account?.name??"-"}</span></p>
                        <p>Completed Time : <span className="font-medium">{StringToDateTime(Transaction?.completed_time??"") === "" ? "-" : StringToDateTime(Transaction?.completed_time??"")}</span></p>
                        <Separator className="mt-4 mb-4"/>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-row items-center">
                                <p className="font-medium w-24">Qty</p>
                                <p className="font-medium">Product Name</p>
                            </div>
                            <p className="font-medium">Total Price</p>
                        </div>
                        <Separator className="mt-4 mb-4"/>
                        {OrderDetails.length > 0 ? (
                            <div className="flex flex-col space-y-2 overflow-y-auto">
                            {OrderDetails.map(({product_id, product_detail, quantity, total_price})=>(
                                <div key={product_id} className="flex justify-between items-center">
                                    <div className="flex flex-row items-center">
                                        <p className="text-sm text-gray-500 w-24">{quantity}</p>
                                        <p className="font-medium">{product_detail.product_name}</p>
                                    </div>
                                    <p className="font-medium">Rp{total_price.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                            ))}
                            </div>
                        ):(
                            <div className="text-center text-gray-500 py-8">
                            No items
                            </div>
                        )}
                        <Separator className="mt-4 mb-4"/>
                        <p className="mb-2">Total Payment : <span className="font-medium">Rp{Transaction?.total_payment?.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                        <p className="">Payment Method : <span className="font-medium">{Transaction?.payment_method === "" ? "-" : Transaction?.payment_method}</span></p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
