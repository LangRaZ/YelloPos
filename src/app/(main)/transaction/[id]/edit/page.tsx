import { Metadata } from "next";
import EditTransaction from "./ui/edit_transaction"

export const metadata: Metadata = {
    title: "Edit Transaction"
};

export default async function TransactionEditPage(props : { params: Promise<{ id:string }> }){
    const param = await props.params
    const id = param.id
    return (
        <EditTransaction paramId={id}/>
    )
}
