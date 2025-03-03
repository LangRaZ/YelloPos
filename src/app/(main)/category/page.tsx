import { Metadata } from "next"
import { Category, columns } from "./columns"
import DataTable from "@/components/helpers/data_table"
import { Button } from "@/components/ui/button"
import { SquarePlus } from "lucide-react"

async function getData(): Promise<Category[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Test",
      description: "Test deskripsi",
    },
    {
      id: "728ed53f",
      name: "Test2",
      description: "Test2 deskripsi",
    },
    // ...
  ]
}

export const metadata: Metadata = {
    title: 'Category Overview',
  }

export default async function CategoryOverviewPage() {
  const data = await getData()
  return (
    <>
      <div className="container mx-auto py-5">
        <Button
          variant="outline"
          className="flex items-center gap-1"
        >
        <SquarePlus className="w-4 h-4" /> Add Category
        </Button>
      </div>
      <div className="container mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
