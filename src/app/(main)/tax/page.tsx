import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import  DataTable  from "@/components/helpers/data_table"
// import { columns } from "./columns"

export default function tax() {
  return (
    <>
      <div>
          <h1 className="text-2xl font-bold mb-4">Laporan Pajak</h1>

          <div className="bg-gray-300 p-6 rounded-sm flex justify-around items-center">
              <div className="text-center">
                  <h2 className="font-semibold text-lg mb-2">Pendapatan Bruto Bulanan</h2>
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">0</p>
                  </div>
              </div>

              <div className="text-center">
                  <h2 className="font-semibold text-lg mb-2">Akumulasi Pendapatan Bruto</h2>
                  <div className="items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">0</p>
                  </div>
              </div>

              <div className="text-center">
                  <h2 className="font-semibold text-lg mb-2">Akumulasi Pajak</h2>
                  <div className="flex items-center justify-center relative">
                      <p className="text-4xl font-bold mb-4">0</p>
                  </div>
              </div>
          </div>
      </div>
      <div className="mt-10">
        <div></div>
        <div className="">
          {/* <DataTable columns={columns} data={products ?? []} /> */}
        </div>
        <Tabs defaultValue="monthly" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="yearly">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
