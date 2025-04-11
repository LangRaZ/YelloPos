"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TransactionValidation } from "@/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transaction } from "@/interface";
import { completeTransaction } from "@/lib/supabase/api";

export default function TransactionForm(
    { id, data, isOnPage = false, closeDialog } :
    { id?: number, data?: Transaction |null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    //Declare form and form data
    const form = useForm<z.infer<typeof TransactionValidation>>({
        resolver: zodResolver(TransactionValidation),
        defaultValues:{
            payment_method: data?.payment_method??"",
        }
    })
    
    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof TransactionValidation>){
        setError(null);
        form.clearErrors();
        setIsLoading(true);
        //Handle update or create object decision on form submit handler
        if(id){
            completeTransaction(id, values.payment_method).then(res=>{
                if(res && res.status){
                    if(!isOnPage && closeDialog){
                        closeDialog();
                    }
                    toast.success("Transaction completed!", { description:"Transcation has been completed successfully!" })
                    if(isOnPage){
                        router.push("/transaction");
                    } else {
                        router.refresh();
                        setIsLoading(false);
                    }
                } else {
                    setError(res?.message??"Unexpected error occurred! Please reload the page!");
                    form.reset();
                    setIsLoading(false);
                }
            })
        }
    }

    return (
        <Form {... form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-md space-y-4">
                {/* Form error message */}
                { error && <p className="my-4 text-red-800 font-semibold">{error}</p> }
                {/* Form data field starts here */}
                <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter transaction payment method" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" className="mt-5">Submit</Button>
                </div>
            </form>
        </Form>
    )
}


