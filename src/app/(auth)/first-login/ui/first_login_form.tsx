"use client"

import { useState } from "react";
import { BusinessValidation } from "@/validations";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createBusiness } from "@/lib/supabase/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function FirstLoginForm() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const form = useForm<z.infer<typeof BusinessValidation>>({
        resolver: zodResolver(BusinessValidation),
        defaultValues: {
            business_name: "",
            address: "",
            bank_account_name: "",
            bank_account_number: "",
  
            phone_number: "",
        },
    });

    function handleRegister(values: z.infer<typeof BusinessValidation>) {
        setError(null);
        form.clearErrors();
        createBusiness(values).then((res) => {
          if (res.status) {
            router.push("/");
            toast.success("Register Success!" , { description: "Your account has been successfully created" })
          } else {
            setError(res.message);
            form.reset();
          }
        });
    }



    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleRegister)} className="bg-white px-4 md:px-16 w-full">
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
                            {/* {error && (
                                <p className="my-4 text-red-800 font-semibold">{error}</p>
                            )} */}

                        </div>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="business_name"
                                render={({ field })=>(
                                    <FormItem>
                                        <FormLabel>business name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your  business name" {...field}/>
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
                                        <FormLabel>phone number</FormLabel>
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
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your business address" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            
                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className=""
                                    variant={"default"}
                                >
                                Submit
                                </Button>
                                
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        
    )
}
