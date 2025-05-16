"use client"

import { useState } from "react";
import { TaxFirstLoginValidation } from "@/validations";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createTaxProfile, UpdateTaxProfile } from "@/lib/supabase/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ButtonLoading } from "@/components/helpers/button_loading";
import { Tax } from "@/interface";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";


export default function TaxFirstLoginForm(
    { id, data,isOnPage = false, closeDialog } :
    { id?:number,data?:Tax|null,isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    console.log(id)
    const router = useRouter();
  
    const form = useForm<z.infer<typeof TaxFirstLoginValidation>>({
      resolver: zodResolver(TaxFirstLoginValidation),
      defaultValues: {
        business_profile_id: data?.business_profile_id??0,
        is_pph: data?.is_pph??true,
        is_ppn: data?.is_ppn??false,
        pph_type: data?.pph_type??"",
        pph_percentage: data?.pph_percentage??0.5,
        ppn_percentage: data?.ppn_percentage??0,
        monthly_bruto: data?.monthly_bruto??0,
        yearly_bruto: data?.yearly_bruto??0,
      }
    });
  
    function handleSubmitTax(values: z.infer<typeof TaxFirstLoginValidation>) {
      setIsLoading(true)
      setError(null);
      form.clearErrors();
      
      if(id){
        UpdateTaxProfile(values,id).then((res) => {
          if(res && res.status){
            if(!isOnPage && closeDialog){
                closeDialog();
            }
            toast.success("Tax updated!", { description:res.message })
            if(isOnPage){
                router.push("/tax");
            } else {
                window.location.reload()
            }
        } else {
            setError(res?.message??"Unexpected error occurred! Please reload the page!");
            form.reset();
            setIsLoading(false);        
        }
        });
      }else{
        createTaxProfile(values).then((res) => {
          if (res.status) {
            router.push("/tax");
            toast.success("Tax Info Saved!", {
              description: "Your tax settings have been saved successfully.",
            });
          } else {
            setError(res.message);
            setIsLoading(false);     
          }
        });
      }

      
    }
    
    return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitTax)}
          >
            {error && (
              <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Login Failed!</AlertTitle>
                  <AlertDescription>
                      {error}
                  </AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="pph_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PPH type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border border-gray-300 rounded p-2"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value); // must pass string
                        form.setValue("pph_percentage", value === "PPH_FINAL_05" ? 0.005 : 0.01);
                      }}
                    >
                      <option></option>
                      <option value="PPH_FINAL_05">PPh Final 0.5%</option>
                      <option value="PPH_FINAL_1">PPh Final 1%</option>
                    </select>
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
    );
  }