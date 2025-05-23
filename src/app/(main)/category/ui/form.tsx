"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CategoryValidation } from "@/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ButtonLoading } from "@/components/helpers/button_loading";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryMutation } from "@/interface";
import { createCategory, updateCategory } from "@/lib/supabase/api";

export default function CategoryForm(
    { id, data, isOnPage = false, closeDialog } :
    { id?: number, data?: CategoryMutation|null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    // const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    //Declare form and form data
    const form = useForm<z.infer<typeof CategoryValidation>>({
        resolver: zodResolver(CategoryValidation),
        defaultValues:{
            business_profile_id: data?.business_profile_id??0,
            category_name: data?.category_name??"",           
            description: data?.description??"",
            is_active: true,
        }
    })
    
    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof CategoryValidation>){
        setError(null);
        form.clearErrors();
        setIsLoading(true);
        //Handle update or create object decision on form submit handler
        if(id){
            updateCategory(id, values).then(res=>{
                if(res && res.status){
                    if(!isOnPage && closeDialog){
                        closeDialog();
                    }
                    toast.success("Category updated!", { description:"Category has been updated successfully!" })
                    if(isOnPage){
                        router.push("/category");
                    } else {
                        router.refresh();
                    }
                } else {
                    setError(res?.message??"Unexpected error occurred! Please reload the page!");
                    // form.reset();
                    setIsLoading(false);
                }
            })
        }else {
            //If id is null then its create object
            createCategory(values).then(res=>{
                if(res && res.status){
                    if(!isOnPage && closeDialog){
                        closeDialog();
                    }
                    toast.success("Category added!", { description:"Category has been added successfully!" })
                    if(isOnPage){
                        router.push("/category");
                    } else {
                        router.refresh();
                    }
                } else {
                    setError(res?.message??"Unexpected error occurred! Please reload the page!");
                    // form.reset();
                    setIsLoading(false);       
                }
            })
        }
    }

    return (
        <Form {... form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-md space-y-4">
                {/* Form error message */}
                { error && <p className="text-red-600 font-medium">{error}</p> }
                {/* Form data field starts here */}
                <FormField
                    control={form.control}
                    name="category_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Category Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Form data field ends here */}
                
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter Category Description" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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


