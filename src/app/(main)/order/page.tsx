import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { 
  Card, 
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/supabase/api"
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";


export default async function OrderMenuPage() {
  const { data: categories } = await getCategories();
  const { data: products } = await getProducts();

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col xl:w-2/3 2xl:w-3/4 w-full xl:pr-10">
        <div className="bg-background sticky z-10 top-[50px]">
          <Carousel className="">
            <CarouselContent className="gap-4">
              <CarouselItem className="basis-1/10 flex flex-row">
                    <Button variant={"outline"} className="px-4 py-2" asChild>
                      <Link href={`#`} className="font-medium">ALL</Link>
                    </Button>
              </CarouselItem>
              {(categories??[]).map((category, idx)=>(
                <>
                  <CarouselItem key={idx} className="basis-1/10 flex flex-row pl-0">
                    <Button variant={"outline"} className="px-4 py-2" asChild>
                      <Link href={`#${category.category_name}`} className="font-medium">{category.category_name?.toUpperCase()}</Link>
                    </Button>
                    
                  </CarouselItem>
                </>
              ))}
            </CarouselContent>
          </Carousel>
          <Separator orientation="horizontal" className="mt-2"/>
        </div>
        <div className="mt-2 flex flex-col gap-5">
          {(categories??[]).map((category)=>(
            <>
              <span id={`${category.category_name}`} className="mt-2 font-medium text-xl">{category.category_name?.toUpperCase()}</span>
              <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 px-1">
                {(products??[]).map((product)=>(
                  (product.Category?.category_name === category.category_name) ? (
                      <Card className="">
                        <CardContent className="p-6">
                          <div className="w-full flex justify-center">
                            <AspectRatio ratio={16/9} className="flex justify-center">
                              <img src={"https://uezxmezenszyrorynpyl.supabase.co/storage/v1/object/public/product-image//Intel%20CPU.png"} alt="Image" className="rounded-md object-cover" />
                            </AspectRatio>
                          </div>
                          <Separator className="mt-4" />
                          <p className="mt-2 text-start font-medium">{product.product_name}</p>
                          <p className="mt-2 text-start text-sm text-slate-500 truncate">{product.description === "" ? "Product has no description" : product.description}</p>
                        </CardContent>
                        <CardFooter className="flex">
                          <Button className="flex-none rounded-full" size={"icon"}><Minus /></Button>
                          <span className="grow text-center">0</span>
                          <Button className="flex-none rounded-full" size={"icon"}><Plus /></Button>
                        </CardFooter>
                      </Card>
                  ):""
                  ))}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="h-[91vh] xl:w-1/3 2xl:w-1/4 xl:flex hidden border-2 rounded-lg sticky top-[50px] z-10">
        <div className="flex flex-col flex-1 p-4">
          {/* Header */}
          <div className="text-center">
            <p>Business Name</p>
            <p>Address</p>
          </div>
          {/* Order Content */}
          <Separator className="mt-4 mb-2"/>
          <p className="text-center font-semibold">ORDER</p>
          <Separator className="mt-2 mb-4"/>
          <div className="flex flex-col">
            <p>Order content1</p>
            <p>Order content2</p>
            <p>Order content3</p>
          </div>
          {/* Footer */}
          <div className="mt-auto">
            <Separator className="my-4"/>
            <Button className="w-full">Confirm Order</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
