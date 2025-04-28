"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Transaction } from "@/interface";
import { processTransaction } from "@/lib/supabase/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";



export function ProcessOrderButton({ id, transaction } : { id: string, transaction: Transaction }){
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    function handleProcess(){
        setIsLoading(true)
        processTransaction(transaction.id, id).then(res=>{
            if(res && res.status){
                if(res.status){
                    router.push(`/transaction/${transaction.id}/process`)
                    setIsLoading(false)
                }
            }
            else if(res && !res.status && res.code === 401){
                router.refresh()
                setIsLoading(false)
            }
            else{
                toast.warning("Process failed!", { description: res.message })
                setIsLoading(false);
            }
        })
    }

    return(
        ((transaction.processed_by_account_id === null || transaction.processed_by_account_id === id) && 
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
                {isLoading ? (
                    <span>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </span>
                ):(
                <p onClick={handleProcess}>
                    Process Transaction
                </p>
                )}
            </DropdownMenuItem>
        )
    )
}

