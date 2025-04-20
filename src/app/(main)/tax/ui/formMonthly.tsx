"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ReportValidation } from "@/validations";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReportMutation } from "@/interface";
import { ButtonLoading } from "@/components/helpers/button_loading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { exportToExcel } from "@/lib/exportToExcel";
import { saveReport } from "@/lib/supabase/api";
import { Download } from "lucide-react";

export default function ReportFormMonthly(
    { id, data, isOnPage = false, closeDialog } :
    { id?: number, data?: ReportMutation|null, isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [ error, setError ] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const testdata = [
        { Month: "January", Revenue: 1200, Expenses: 500 },
        { Month: "February", Revenue: 1400, Expenses: 600 },
    ];

    //Declare form and form data
    const form = useForm<z.infer<typeof ReportValidation>>({
        resolver: zodResolver(ReportValidation),
        defaultValues:{
            report_url: data?.report_url??"",
            business_profile_id: data?.business_profile_id?? 0,
            is_monthly: data?.is_monthly?? false,
            is_yearly: data?.is_yearly?? false,
            month: data?.month?? 0,
            year: data?.year?? 0,
            report_name: data?.report_name??""
        }
    })

    //Declare on submit function for submit handler
    function onSubmit(values: z.infer<typeof ReportValidation>){
        setError(null);
        form.clearErrors();
        setIsLoading(true);

        values.is_monthly = true
        values.is_yearly = false
        values.year = new Date().getFullYear()

        const fileName = "monthly_report_" + months[values.month - 1] + "_" + values.year

        const excelFile = exportToExcel(testdata, fileName)
        const file = new File([excelFile], fileName, {
            type: excelFile.type,
          });

        values.report_name = "Monthly Report " + months[values.month - 1] + " " + values.year
        console.log(values)
        saveReport(values, file)
        if(!isOnPage && closeDialog){
            closeDialog();
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
                    name="month"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose a month</FormLabel>
                            <FormControl>
                                <Select value={String(field.value)}
                                    onValueChange={(val) => field.onChange(Number(val))} 
                                >
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