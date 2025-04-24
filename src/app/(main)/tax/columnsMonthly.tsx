"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Reports } from "@/interface"
import { deleteProduct } from "@/lib/supabase/api"
import DeleteAlert from "@/components/helpers/confirmation_alert"
import { saveAs } from "file-saver";
import { format } from "date-fns"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsMonthly: ColumnDef<Reports>[] = [
  {
    accessorKey: "report_name",
    header: "Report Name",
  },
  {
    accessorKey: "month",
    header: "Month",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({row}) => format(new Date(row.original.created_at), "dd-MM-yyyy HH:mm:ss")
  },
  {
    accessorKey: "action",
    header: "Actions",

    cell: ({ row }) => {
      const report = row.original;

      const handleDownload = async () => {
        try {
          const response = await fetch(report.report_url || "");
          const blob = await response.blob();
          saveAs(blob, report.report_name || "report.xlsx");
        } catch (error) {
          console.error("Download failed", error);
        }
      };

      return (
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
          </Button>
          {/* <DeleteAlert
            // id={product.id.toString()}
            // EditAction={deleteProduct}
            // warningMessage="This action cannot be undone. This product will be deleted permanently"
            // successMessage="Delete success!"
            // successDescription="Product has been deleted"
          /> */}
        </div>
      );
    },
  },

]