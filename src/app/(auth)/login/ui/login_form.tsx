"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInAuthUser } from "@/lib/supabase/api"
import { ButtonLoading } from "@/components/helpers/button_loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginValidation>>({
        resolver: zodResolver(LoginValidation),
        defaultValues: {
          email: "",
          password: "",
        },
    });

    async function handleLogin(values: z.infer<typeof LoginValidation>){
        setIsLoading(true);
        setError(null);
        form.clearErrors();
        signInAuthUser(values).then((res) => {
            if (res.status) {
                router.push("/dashboard");
            } else{
                setError(res.message);
                form.reset();
                setIsLoading(false)
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
                <form onSubmit={form.handleSubmit(handleLogin)} className="bg-white px-4 md:px-16 w-full">
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
                                <h5 className="font-semibold text-4xl">Login</h5>
                            </div>
                            <p className="text-[--sidebar-text-color]">
                                Fill the form to login into your account
                            </p>
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Login Failed!</AlertTitle>
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                        </div>
                        <div className="flex flex-col gap-6">
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
                                {isLoading ? (
                                    <ButtonLoading />
                                ):(
                                    <>
                                        <Button
                                            type="submit"
                                            className=""
                                            variant={"default"}
                                        >
                                        Login
                                        </Button>
                                        <Button
                                            type="submit"
                                            className=""
                                            variant={"default"}
                                            onClick={()=>{
                                                form.setValue("email", "devyellopos@gmail.com")
                                                form.setValue("password", "abc123")
                                            }}
                                        >
                                        Login Dev
                                        </Button>
                                    </>
                                )}
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
