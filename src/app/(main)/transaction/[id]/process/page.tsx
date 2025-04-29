import { Metadata } from "next";
import ProcessTransaction from "./ui/process_transaction";

export const metadata: Metadata = {
    title: "Process Transaction"
};

export default function TransactionProcessPage({ params } : { params:{ id:string } }){

    return (
        <ProcessTransaction params={params}/>
    )
}
