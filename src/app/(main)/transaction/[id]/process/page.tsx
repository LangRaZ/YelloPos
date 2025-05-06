import { Metadata } from "next";
import ProcessTransaction from "./ui/process_transaction";

export const metadata: Metadata = {
    title: "Process Transaction"
};

export default async function TransactionProcessPage(props : { params: Promise<{ id:string }> }){
    const param = await props.params
    const id = param.id
    return (
        <ProcessTransaction paramId={id}/>
    )
}
