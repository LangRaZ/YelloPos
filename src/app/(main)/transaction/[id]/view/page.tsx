import { Metadata } from "next";
import ViewTransaction from "./ui/view_transaction"

export const metadata: Metadata = {
    title: "View Transaction"
};

export default async function TransactionViewPage(props : { params: Promise<{ id:string }> }){
    const param = await props.params
    const id = param.id
    return (
        <ViewTransaction paramId={id}/>
    )
}
