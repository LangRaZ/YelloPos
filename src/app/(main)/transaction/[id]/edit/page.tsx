import { Metadata } from "next";
import EditTransaction from "./ui/edit_transaction"

export const metadata: Metadata = {
    title: "Edit Transaction"
};

export default function TransactionEditPage({ params } : { params:{ id:string } }){

    return (
        <EditTransaction params={params}/>
    )
}
