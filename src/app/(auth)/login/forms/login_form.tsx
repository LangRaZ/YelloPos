"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginValidation } from "@/validations"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
    const form = useForm<z.infer<typeof LoginValidation>>({
        resolver: zodResolver(LoginValidation),
        defaultValues: {
          email: "",
          password: "",
        },
    });

    async function handleLogin(user: z.infer<typeof LoginValidation>){
        

        console.log(user)
    }

    return (
        <div className="grid min-h-svh w-full sm:grid-cols-2">
            <div className="relative hidden sm:flex">
                <Image 
                    src="/images/HomeWave.png"
                    alt="Yello Logo"
                    fill
                />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="bg-white px-4 md:px-16 w-full">
                    <div className="p-8 h-full flex flex-col gap-10 justify-center">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2 items-center">
                                <h5 className="font-semibold text-4xl">Login</h5>
                            </div>
                            <p className="text-[--sidebar-text-color]">
                                Enter your username to login into your account
                            </p>
                            {/* {error && (
                                <p className="my-4 text-red-800 font-semibold">{error}</p>
                            )} */}

                        </div>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field })=>(
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name" {...field}/>
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
                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className=""
                                    variant={"default"}
                                >
                                Login
                                </Button>
                                <div>
                                    <span className="text-sm">
                                        Don&apos;t have any account?&nbsp;
                                    </span>
                                    <Link
                                        className="text-sm text-primary hover:text-primary/90"
                                        href="/register"
                                    >
                                        Register Here!
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
