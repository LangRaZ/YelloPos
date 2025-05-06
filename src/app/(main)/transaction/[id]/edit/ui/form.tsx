"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { orderDetailValidation } from "@/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ButtonLoading } from "@/components/helpers/button_loading";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderDetail } from "@/interface";
import { updateOrderDetail } from "@/lib/supabase/api";

export default function OrderDetailForm(
    { id, data, isOnPage = false, closeDialog } :
    { id: number, data: OrderDetail, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    // const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const router = useRouter()

    //Declare form and form data
    const form = useForm<z.infer<typeof orderDetailValidation>>({
        resolver: zodResolver(orderDetailValidation),
        defaultValues:{
            quantity: data.quantity,
        }
    })
    
    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof orderDetailValidation>){
        setError(null);
        form.clearErrors();
        setIsLoading(true);
        //Handle update or create object decision on form submit handler
        if(id){
            updateOrderDetail(id, values.quantity, data.current_price).then(res=>{
                if(res && res.status){
                    if(!isOnPage && closeDialog){
                        closeDialog();
                    }
                    toast.success("Order item updated!", { description:"Order item has been updated successfully!" })
                    if(isOnPage){
                        window.location.reload()
                    } else {
                        window.location.reload()
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
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder="Enter Quantity" {...field} 
                                value={field.value || 0}
                                onChange={(e)=> field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Form data field ends here */}
                <div className="flex justify-end">
                    {isLoading ? (
                        <ButtonLoading />
                    ):(
                        <Button type="submit" className="mt-5">Submit</Button>
                    )}
                </div>
            </form>
        </Form>
    )
}


