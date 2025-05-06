"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserValidation } from "@/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, UserMutation } from "@/interface";
import { createUser, updateUser } from "@/lib/supabase/api";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/components/helpers/button_loading";


export default function UserForm(
    { id, data, roles, isOnPage = false, closeDialog } :
    { id?: string, data?: UserMutation|null, roles: Role[]|null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    //Declare form and form data
    const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues:{
            name: data?.name??"",
            email: data?.email??"",
            username: data?.username??"",
            role_id: data?.role_id??Number(),
            phone_number: data?.phone_number??"",
            business_profile_id: data?.business_profile_id??0,
            password: ""
        }
    })
    
    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof UserValidation>){
        setError(null);
        form.clearErrors();
        setIsLoading(true);
        //Handle update or create object decision on form submit handler
        if(id){
            updateUser(id, values).then(res=>{
                if(res && res.status){
                    if(!isOnPage && closeDialog){
                        closeDialog();
                    }
                    toast.success("User updated!", { description:"User has been updated successfully!" })
                    if(isOnPage){
                        router.push("/user");
                    } else {
                        router.refresh();
                    }
                } else {
                    setError(res?.message??"Unexpected error occurred! Please reload the page!");
                    form.reset();
                    setIsLoading(false);      
                }
            })
        }else {
            //If id is null then its create object
            createUser(values, values.password).then(res=>{
                if(res && res.status){
                    if(!isOnPage && closeDialog){
                        closeDialog();
                    }
                    toast.success("User added!", { description:"User has been added successfully!" })
                    if(isOnPage){
                        router.push("/user");
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
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Username. Example: Staff 1, Staff A, Admin 1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Form data field ends here */}
                { roles && 
                    <FormField
                        control={form.control}
                        name="role_id"
                        render={({ field }) => {
                            return <FormItem>
                                <div className="flex flex-col space-y-2">
                                    <FormLabel>Role</FormLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                        <FormControl className="grow">
                                            <Button
                                            variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-[200px] justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                            {field.value
                                                ? (roles??[]).find(
                                                    (role) => role.id === field.value
                                                )?.role_name
                                                : "Select Role"}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search Role..."
                                                className="h-9"
                                            />
                                            <CommandList>
                                                <CommandEmpty>No roles found!</CommandEmpty>
                                                    <CommandGroup>
                                                        {(roles??[]).map((role) => {
                                                        return <CommandItem
                                                            value={role.role_name??""}
                                                            key={role.id}
                                                            onSelect={(currentValue) => {
                                                                currentValue = form.getValues("role_id").toString()
                                                                currentValue === role.id.toString() ?
                                                                (
                                                                    form.setValue("role_id", Number())
                                                                ):(
                                                                    form.setValue("role_id", role.id)
                                                                )
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {role.role_name}
                                                            <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                role.id === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                            )}
                                                            />
                                                        </CommandItem>
                                                        })}
                                                    </CommandGroup>
                                            </CommandList>
                                        </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                }

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


