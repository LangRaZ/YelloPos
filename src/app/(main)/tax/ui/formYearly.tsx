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
import { ReportMutation } from "@/interface";
import { ButtonLoading } from "@/components/helpers/button_loading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportToExcel } from "@/lib/exportToExcel";
import { saveReport } from "@/lib/supabase/api";

export default function ReportFormYearly(
    { id, data, isOnPage = false, closeDialog } :
    { id?: number, data?: ReportMutation|null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 6 }, (_, i) => currentYear - i)
    const testdata = [
        { Year: 2024, Revenue: 1200, Expenses: 500 },
        { Year: 2025, Revenue: 1400, Expenses: 600 },
    ];

    //Declare form and form data
    const form = useForm<z.infer<typeof ReportValidation>>({
        resolver: zodResolver(ReportValidation),
        defaultValues:{
            report_url: data?.report_url??"",
            business_profile_id: data?.business_profile_id?? 0,
            is_monthly: data?.is_monthly?? false,
            is_yearly: data?.is_yearly?? false,
            month: data?.month?? 1,
            year: data?.year?? 0,
            report_name: data?.report_name??""
        }
    })

    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof ReportValidation>){
        setError(null);
        form.clearErrors();
        setIsLoading(true);

        values.month = 0
        values.is_monthly = false
        values.is_yearly = true

        const fileName = "yearly_report_" + values.year
        
        const excelFile = exportToExcel(testdata, fileName)
        const file = new File([excelFile], fileName, {
            type: excelFile.type,
            });

        values.report_name = "Yearly Report " + values.year
        console.log(values)
        saveReport(values, file)
        if(!isOnPage && closeDialog){
            closeDialog();
            router.refresh();
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
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose a year</FormLabel>
                            <FormControl>
                                <Select value={String(field.value)}
                                    onValueChange={(val) => field.onChange(Number(val))}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
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