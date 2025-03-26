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
import { createCategory, updateBusinessProfile, updateQrProfile } from "@/lib/supabase/api";

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
            profile_image_url : undefined,
            qr_image_url : undefined,
            last_profile_update : data?.last_profile_update??"",
            last_qr_update : data?.last_qr_update??"",
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
            const profileimageExt = values.profile_image_url.type.split("/").pop()??"";
            const qrImageExt = values.qr_image_url.type.split("/").pop()??"";
            updateBusinessProfile(id, values,(data?.profile_image_url??""),profileimageExt,(data?.qr_image_url??""),qrImageExt).then(res=>{
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
            
            updateQrProfile(id, values,(data?.profile_image_url??""),profileimageExt,(data?.qr_image_url??""),qrImageExt).then(res=>{
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

    const [preview, setPreviewBusinessImage] = useState<string>(
            data?.profile_image_url??"",
        );
    const [previewqr, setPreviewQrImage] = useState<string>(
            data?.qr_image_url??"",
        );

    return (
        <Form {... form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-md space-y-4">
                {/* Form error message */}
                { error && <p className="my-4 text-red-800 font-semibold">{error}</p> }
                {/* Form data field starts here */}
                <h1 className="max-w-xl mx-auto text-5xl text-center">Business Profile</h1>

                <div>
                    <FormField
                        control={form.control}
                        name="profile_image_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Profile Image</FormLabel>
                                <FormControl>
                                    <Input type="file" placeholder="Choose a file" 
                                    onChange={(e)=>{ 
                                        const files = e.target.files
                                        if(files && files.length > 0){
                                            form.setValue("profile_image_url", files[0])
                                            setPreviewBusinessImage(URL.createObjectURL(files[0]));
                                        }else{
                                            form.resetField("profile_image_url", {keepError: false})
                                        }
                                    }}/>
                                </FormControl>
                                {preview && (
                                    <div className="mt-2">
                                        <img
                                        src={preview}
                                        alt="Product Preview"
                                        width={300}
                                        height={300}
                                        className="rounded-lg border"
                                        />
                                    </div>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    /> 
                </div>

                <h1>Business Information</h1>
                <div className="max-w  p-6 bg-white rounded-lg shadow-md">
                <div className="w-full flex flex-col gap-5">
                    <div className="w-full xl:grid xl:grid-cols-2 xl:gap-10 flex flex-col gap-5">
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

                    </div>
                    
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

                
                    
                    
                </div>
                </div>
                
                
                {/* Payment information UI */}


                <div className="max-w  p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-xl font-bold mb-4">Payment Information</h1>
                    <div className="flex flex-col items-left space-y-4">
                        <div className="w-full grid grid-cols-2 gap-10">
                            <FormField
                            control={form.control}
                            name="qr_image_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>QR Image</FormLabel>
                                    <FormControl>
                                        <Input type="file" placeholder="Choose a file" 
                                        onChange={(e)=>{ 
                                            const files = e.target.files
                                            if(files && files.length > 0){
                                                form.setValue("qr_image_url", files[0])
                                                setPreviewQrImage(URL.createObjectURL(files[0]));
                                            }else{
                                                form.resetField("qr_image_url", {keepError: false})
                                            }
                                        }}/>
                                    </FormControl>
                                    {previewqr && (
                                        <div className="mt-2">
                                            <img
                                            src={previewqr}
                                            alt="QR Preview"
                                            width={300}
                                            height={300}
                                            className="rounded-lg border"
                                            />
                                        </div>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        <div className="mb-4">
                            <FormField
                            control={form.control}
                            name="bank_account_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bank account name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Enter bank account name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="bank_account_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bank account number</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Enter bank account number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            /> 
                        </div>    
                        </div>
                        
                        

                    </div>
                </div>        

                <div className="flex justify-center">
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


