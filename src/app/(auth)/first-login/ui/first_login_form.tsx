"use client"

import { useState } from "react";
import { FirstLoginValidation } from "@/validations";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBusiness } from "@/lib/supabase/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ButtonLoading } from "@/components/helpers/button_loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function FirstLoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof FirstLoginValidation>>({
        resolver: zodResolver(FirstLoginValidation),
        defaultValues: {
            business_name: "",
            address: "",
            bank_account_name: "",
            bank_account_number: "",
            phone_number: "",
            profile_image_url: "",
            qr_image_url: "",
            last_profile_update: "",
            last_qr_update: "",
            code: "XXXXX",
            email: "",
        },
    });

    function handleFirstLogin(values: z.infer<typeof FirstLoginValidation>) {
        setIsLoading(true);
        setError(null);
        form.clearErrors();
        createBusiness(values).then((res) => {
          if (res.status) {
            router.push("/dashboard");
            toast.success("Business Profile Completed!" , { description: "Your business profile has been completed" })
          } else {
            setError(res.message);
            console.log(error)
            setIsLoading(false)
            // form.reset();
          }
        });
    }

    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFirstLogin)} className="bg-white px-4 md:px-16 w-full">
                    <div className="p-8 h-full flex flex-col gap-10 justify-center">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2 items-center">
                                <Image
                                    src="/icons/logo-collapsed.svg"
                                    alt="Yello Logo"
                                    width={45}
                                    height={45}
                                    className=""
                                />
                                <h5 className="font-semibold text-4xl">Business profile</h5>
                            </div>
                            <p className="text-[--sidebar-text-color]">
                                Fill the form to complete your business account
                            </p>
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Setup Failed!</AlertTitle>
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                        </div>
                        <div className="flex flex-col gap-6">
                            <p className="font-semibold text-lg">
                                Business General Information
                            </p>
                            <FormField
                                control={form.control}
                                name="business_name"
                                render={({ field })=>(
                                    <FormItem>
                                        <FormLabel>Business Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your business name" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field })=>(
                                    <FormItem>
                                        <FormLabel>Business Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your phone number" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field })=>(
                                    <FormItem>
                                        <FormLabel>Business Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your business address" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className="font-semibold text-lg flex">
                                <p>Business Payment Information*</p>
                                <span className="font-normal">
                                    &nbsp;&#40;Optional&#41;
                                </span>
                            </div>

                            <FormField
                                control={form.control}
                                name="bank_account_number"
                                render={({ field })=>(
                                    <FormItem>
                                        <FormLabel>Business Bank Account Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your business bank account number" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bank_account_name"
                                render={({ field })=>(
                                    <FormItem>
                                        <FormLabel>Business Bank Account Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your business bank account name" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <span className="font-light">
                                *Optional fields can be completed later
                            </span>

                            <div className="flex justify-end">
                                {isLoading ? (
                                    <ButtonLoading />
                                ):(
                                    <Button
                                        type="submit"
                                        className=""
                                    >
                                    Complete
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        
    )
}
