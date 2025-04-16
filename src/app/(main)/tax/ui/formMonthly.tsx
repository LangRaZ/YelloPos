"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ReportValidation } from "@/validations";
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
import { Report } from "@/interface";
import { ButtonLoading } from "@/components/helpers/button_loading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ReportFormMonthly(
    { id, data, isOnPage = false, closeDialog } :
    { id?: number, data?: Report|null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const router = useRouter()

    //Declare form and form data
    const form = useForm<z.infer<typeof ReportValidation>>({
        resolver: zodResolver(ReportValidation),
        defaultValues:{
            month: data?.month?? 0,
        }
    })

    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof ReportValidation>){
        setError(null);
        form.clearErrors();
        setIsLoading(true);
        //Handle update or create object decision on form submit handler
        if(id){

        }else {

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
                    name="is_monthly"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose a month</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">January</SelectItem>
                                        <SelectItem value="2">February</SelectItem>
                                        <SelectItem value="3">March</SelectItem>
                                        <SelectItem value="4">April</SelectItem>
                                        <SelectItem value="5">May</SelectItem>
                                        <SelectItem value="6">June</SelectItem>
                                        <SelectItem value="7">July</SelectItem>
                                        <SelectItem value="8">August</SelectItem>
                                        <SelectItem value="9">September</SelectItem>
                                        <SelectItem value="10">October</SelectItem>
                                        <SelectItem value="11">November</SelectItem>
                                        <SelectItem value="12">December</SelectItem>
                                    </SelectContent>
                                </Select>
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