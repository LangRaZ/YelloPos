import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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


export default async function OrderMenuPage() {
  const { data: categories } = await getCategories();
  const { data: products } = await getProducts();

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col xl:w-2/3 2xl:w-3/4 w-full">
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
              <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 xl:pr-10">
                {(products??[]).map((product)=>(
                  (product.Category?.category_name === category.category_name) ? (
                      <Card className="">
                        <CardContent className="p-6">
                          <Skeleton className="h-[200px] w-full rounded-xl" />
                          <p className="mt-2 text-center font-medium">{product.product_name}</p>
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
      <div className="xl:w-1/3 2xl:w-1/4 xl:flex hidden">
        <div className="bg-pink-300 grow">
          <p>Sidebar</p>
        </div>
      </div>
    </div>
  )
}
