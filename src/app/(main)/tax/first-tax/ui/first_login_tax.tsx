"use client"

import { useState } from "react";
import { FirstLoginValidation, TaxFirstLoginValidation } from "@/validations";
import z, { boolean } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBusiness, createTaxProfile } from "@/lib/supabase/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ButtonLoading } from "@/components/helpers/button_loading";
import { TaxMutation } from "@/interface";


export default function TaxFirstLoginForm(
    { isOnPage = false, closeDialog } :
    { isOnPage?: boolean, closeDialog?:()=>void }
) {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
  
    const form = useForm<z.infer<typeof TaxFirstLoginValidation>>({
      resolver: zodResolver(TaxFirstLoginValidation),
      defaultValues: {
        business_profile_id: 2,
        is_pph: true,
        is_ppn: false,
        pph_type: "",
        pph_percentage: 0.5,
        ppn_percentage: 0,
        monthly_bruto: 0,
        yearly_bruto: 0,
      }
    });
  
    function handleSubmitTax(values: z.infer<typeof TaxFirstLoginValidation>) {
      setError(null);
      form.clearErrors();
  
      createTaxProfile(values).then((res) => {
        if (res.status) {
          router.push("/tax");
          toast.success("Tax Info Saved!", {
            description: "Your tax settings have been saved successfully.",
          });
        } else {
          setError(res.message);
        }
      });
    }
  
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitTax)}
          className="bg-white p-8 shadow-md rounded-md w-full max-w-lg space-y-4"
        >
          <h2 className="text-xl font-bold">Submit Tax Info</h2>

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
                      form.setValue("pph_percentage", value === "PPH_FINAL_05" ? 0.5 : 1);
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

          {/* <FormField
            control={form.control}
            name="pph_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Persentase PPh (%)</FormLabel>
                <FormControl>
                  <Input type="number" readOnly {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ppn_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Persentase PPN (%)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthly_bruto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bruto Bulanan</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearly_bruto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bruto Tahunan</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 items-center">
            <FormField
              control={form.control}
              name="is_pph"
              render={({ field }) => (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                  Aktifkan PPh
                </label>
              )}
            />
            <FormField
              control={form.control}
              name="is_ppn"
              render={({ field }) => (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                  Aktifkan PPN
                </label>
              )}
            /> */}
          {/* </div> */}

          <Button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </Button>

        </form>
      </Form>
    </div>
    );
  }