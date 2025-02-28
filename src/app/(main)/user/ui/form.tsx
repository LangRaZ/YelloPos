"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ProductValidation } from "@/validations";
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

export default function ProductForm(
    { id, data, categories, isOnPage = false, closeDialog } :
    { id?: string, data?: UserMutation|null, categories: Category[]|null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    const [open, setOpen] = useState(false)

    //Declare form and form data
    const form = useForm<z.infer<typeof ProductValidation>>({
        resolver: zodResolver(ProductValidation),
        defaultValues:{
            product_name: data?.product_name??"",
            product_category_id: data?.product_category_id?.toString()??"",
            description: data?.description??"",
            sell_price: data?.sell_price??0,
            quantity: data?.quantity??0,
            is_active: true,
        }
    })
    
    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof ProductValidation>){
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
                    name="product_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Form data field ends here */}
                { categories && 
                    <FormField
                        control={form.control}
                        name="product_category_id"
                        render={({ field }) => {
                            return <FormItem>
                                <div className="flex flex-col space-y-2">
                                    <FormLabel>Product category</FormLabel>
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
                                                ? (categories??[]).find(
                                                    (category) => category.id.toString() === field.value
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
                                                        {(categories??[]).map((category) => {
                                                        return <CommandItem
                                                            value={category.category_name??""}
                                                            key={category.id}
                                                            onSelect={(currentValue) => {
                                                                currentValue = form.getValues("product_category_id")
                                                                currentValue === category.id.toString() ?
                                                                (
                                                                    form.setValue("product_category_id", "")
                                                                ):(
                                                                    form.setValue("product_category_id", category.id.toString())
                                                                )
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {category.category_name}
                                                            <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                category.id.toString() === field.value
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
                    name="sell_price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product price</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder="Enter product price" {...field} 
                                value={field.value || 0}
                                onChange={(e)=> field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product quantity</FormLabel>
                            <FormControl>
                                <Input
                                placeholder="Enter product quantity" {...field}
                                value={field.value || 0}
                                onChange={(e)=> field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter product description" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" className="mt-5">Submit</Button>
                </div>
            </form>
        </Form>
    )
}


