"use client"

import { useState } from "react";
import { RegisterValidation } from "@/validations";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createAuthUser } from "@/lib/supabase/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function RegisterForm() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const form = useForm<z.infer<typeof RegisterValidation>>({
        resolver: zodResolver(RegisterValidation),
        defaultValues: {
            name: "",
            email: "",
            phone_number: "",
            password: "",
            confirm_password: "",
        },
    });

    function handleRegister(values: z.infer<typeof RegisterValidation>) {
        setError(null);
        form.clearErrors();
        createAuthUser(values).then((res) => {
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
        <div className="grid min-h-svh w-full sm:grid-cols-2">
            <div className="relative hidden sm:flex">
                <Image 
                    src="/images/HomeWave.png"
                    alt="Yello Logo"
                    priority={true}
                    fill
                    sizes="(max-width: 768px): 100vw, 50vw"
                />
            </div>
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
                                <h5 className="font-semibold text-4xl">Register</h5>
                            </div>
                            <p className="text-[--sidebar-text-color]">
                                Fill the form to register your account
                            </p>
                            {/* {error && (
                                <p className="my-4 text-red-800 font-semibold">{error}</p>
                            )} */}

                        </div>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field })=>(
                                    <FormItem>
                                        <FormLabel>Owner name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your name" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field })=>(
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field}/>
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
                                        <FormLabel>Phone number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your phone number" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                    <div className="relative">
                                        <Input
                                        className="pr-8"
                                        placeholder="Enter your password"
                                        {...field}
                                        type="password"
                                        />
                                    </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirm_password"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                    <div className="relative">
                                        <Input
                                        className="pr-8"
                                        placeholder="Confirm your password"
                                        {...field}
                                        type="password"
                                        />
                                    </div>
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
                                Register
                                </Button>
                                <div>
                                    <span className="text-sm">
                                        Already have an account?&nbsp;
                                    </span>
                                    <Link
                                        className="text-sm text-primary hover:text-primary/90"
                                        href="/login"
                                    >
                                        Login Here!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
