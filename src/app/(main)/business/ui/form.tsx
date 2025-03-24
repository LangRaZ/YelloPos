"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BusinessProfileValidation, CategoryValidation } from "@/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ButtonLoading } from "@/components/helpers/button_loading";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessProfileMutation} from "@/interface";
import { createCategory, updateBusinessProfile } from "@/lib/supabase/api";

export default function BusinessProfileForm(
    { id, data, isOnPage = false, closeDialog } :
    { id?: number, data?: BusinessProfileMutation|null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    //Declare form and form data
    const form = useForm<z.infer<typeof BusinessProfileValidation>>({
        resolver: zodResolver(BusinessProfileValidation),
        defaultValues:{
            business_profile_id: data?.business_profile_id??2,
            business_name: data?.business_name??"",
            address:  data?.address??"",
            email: data?.email??"",
            bank_account_name: data?.bank_account_name??"",
            bank_account_number: data?.bank_account_number??"",
            code: data?.code??"",

            is_active: true,
        }
    })
    
    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof BusinessProfileValidation>){
        setError(null);
        form.clearErrors();
        setIsLoading(true);
        //Handle update or create object decision on form submit handler
        if(id){
            updateBusinessProfile(id, values).then(res=>{
                if(res && res.status){
                    if(!isOnPage && closeDialog){
                        closeDialog();
                    }
                    toast.success("Business profile updated!", { description:"Business profile has been updated successfully!" })
                    if(isOnPage){
                        router.push("/business");
                    } else {
                        router.refresh();
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
                <h1 className="max-w-xl mx-auto text-5xl">Business Profile</h1>
                <div>
                <FormField
                    control={form.control}
                    name="product_image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Image</FormLabel>
                            <FormControl>
                                <Input type="file" placeholder="Choose a file" 
                                onChange={(e)=>{ 
                                    const files = e.target.files
                                    if(files && files.length > 0){
                                        form.setValue("product_image", files[0])
                                        setPreview(URL.createObjectURL(files[0]));
                                    }else{
                                        form.resetField("product_image", {keepError: false})
                                    }
                                }}/>
                            </FormControl>
                            {preview && (
                                <div className="mt-2">
                                    <img
                                    src={preview}
                                    alt="Product Preview"
                                    width={150}
                                    height={150}
                                    className="rounded-lg border"
                                    />
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                /> 
                </div>
                <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter business profile Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Form data field ends here */}
                
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter business address" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input placeholder="Enter email address" {...field} />
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


