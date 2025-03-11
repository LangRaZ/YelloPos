import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { getCategories } from "@/lib/supabase/api"
import { Separator } from "@/components/ui/separator";


export default async function OrderMenuPage() {
  const { data: categories } = await getCategories();

  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-col h-screen xl:w-2/3 2xl:w-3/4 w-full">
        <div className="">
          <Carousel className="">
            <CarouselContent className="">
              <CarouselItem className="basis-1/10 flex flex-row">
                <div className="px-4 py-2 hover:cursor-pointer">
                  <span className="font-medium">All</span>
                </div>
                <Separator orientation="vertical" className="h-[25px] my-auto bg-primary"/>
              </CarouselItem>
              {(categories??[]).map((category, idx)=>(
                <>
                  <CarouselItem key={idx} className="basis-1/10 flex flex-row pl-0">
                    <div className="px-4 py-2 hover:bg-slate hover:cursor-pointer">
                      <span className="font-medium">{category.category_name}</span>
                    </div>
                    <Separator orientation="vertical" className="h-[25px] my-auto bg-primary"/>
                  </CarouselItem>
                </>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <Separator orientation="horizontal" className=""/>
        <div className="mt-2">
          Product list
        </div>
      </div>
      <div className="bg-pink-200 h-screen xl:w-1/3 2xl:w-1/4 xl:flex hidden">
        Sidebar
      </div>
    </div>
  )
}
