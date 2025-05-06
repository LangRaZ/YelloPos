"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TransactionValidation } from "@/validations";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transaction } from "@/interface";
import { completeTransaction } from "@/lib/supabase/api";
import { ButtonLoading } from "@/components/helpers/button_loading";

export default function TransactionForm(
    { id, data, isOnPage = false, closeDialog } :
    { id?: number, data?: Transaction |null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    // const [open, setOpen] = useState(false)
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
                        <FormItem className="space-y-3">
                            <FormLabel className="text-base">Payment Method</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="Cash" />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base hover:cursor-pointer">
                                        Cash
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="QR" />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base hover:cursor-pointer">
                                        QR
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="Bank Transfer" />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base hover:cursor-pointer">
                                        Bank Transfer
                                    </FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    {isLoading ? (
                        <ButtonLoading />
                    ):(
                        <Button type="submit" className="mt-5">Process</Button>
                    )}
                </div>
            </form>
        </Form>
    )
}


