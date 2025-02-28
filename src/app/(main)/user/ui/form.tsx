"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { UserValidation } from "@/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, UserMutation } from "@/interface";

export default function UserForm(
    { id, data, roles, isOnPage = false, closeDialog } :
    { id?: string, data?: UserMutation|null, roles: Category[]|null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    const [open, setOpen] = useState(false)

    //Declare form and form data
    const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues:{
            name: data?.name??"",
            email: data?.email??"",
            role_id: data?.role_id??Number(),
        }
    })
    
    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof UserValidation>){
        setError(null);
        form.clearErrors();
        //Handle update or create object decision on form submit handler
        if(id){
            //If id is not null then its update object
            toast("Updated")
        }
        //If id is null the its create object

        toast("Created");
    }

    return (
        <Form {... form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-md space-y-4">
                {/* Form error message */}
                { error && <p className="my-4 text-red-800 font-semibold">{error}</p> }
                {/* Form data field starts here */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" {...field} />
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
                                <Input placeholder="Enter Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PhoneNumber</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                {/* Form data field ends here */}
                { roles && 
                    <FormField
                        control={form.control}
                        name="role_id"
                        render={({ field }) => {
                            return <FormItem>
                                <div className="flex flex-col space-y-2">
                                    <FormLabel>Roles</FormLabel>
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
                                                )?.category_name
                                                : "Select category"}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search category..."
                                                className="h-9"
                                            />
                                            <CommandList>
                                                <CommandEmpty>No categories found!</CommandEmpty>
                                                    <CommandGroup>
                                                        {(roles??[]).map((role) => {
                                                        return <CommandItem
                                                            value={role.category_name??""}
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
                                                            {role.category_name}
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
                
                <div className="flex justify-end">
                    <Button type="submit" className="mt-5">Submit</Button>
                </div>
            </form>
        </Form>
    )
}


