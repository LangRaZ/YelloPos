"use client"

import BackButton from "@/components/helpers/back_button";
import { getOrderDetailsbyOrderId, getTransactionById } from "@/lib/supabase/api";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderDetail, Transaction } from "@/interface";
import { columns } from "../column";
import DataTable from "@/components/helpers/data_table";


export default function EditTransaction({ params } : { params:{ id:string } }){
    const [loading, setLoading] = useState(true);
    // const [id, setId] = useState<number>()
    const [Transaction, setTransaction] = useState<Transaction|null>(null);
    const [OrderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

    
    useEffect(()=>{
        const init = async () =>{
            const param = await params;
            const id = Number(param.id)
            // setId(id)

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
                <h2 className="text-2xl font-semibold">Edit Transaction - TR{Transaction?.id}</h2>
            </div>
            <div>
                <p className="text-lg font-medium my-5">Transaction Order Details</p>
                <div className="">
                    <DataTable columns={columns} data={OrderDetails ?? []} />
                </div>
            </div>
        </>
    )
}
