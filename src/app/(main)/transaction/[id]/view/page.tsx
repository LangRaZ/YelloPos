import { Metadata } from "next";
import ViewTransaction from "./ui/view_transaction"

export const metadata: Metadata = {
    title: "View Transaction"
};

export default function TransactionViewPage({ params } : { params:{ id:string } }){
    
    return (
        <ViewTransaction params={params}/>
    )
}
