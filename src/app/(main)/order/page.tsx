"use client"

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
import ConfirmationAlert from "@/components/helpers/confirmation_alert";
import Link from "next/link";
import { getCategories, getProducts, createOrder } from "@/lib/supabase/api"
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import { Category, OrderDetailTemporary, OrderMutation, Product } from "@/interface";


export default function OrderMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productQuantities, setProductQuantities] = useState<{[key: number]: number}>({});
  const [loading, setLoading] = useState(true);
  const Order: OrderMutation = {
    OrderDetail: [],
    total_price: 0,
    business_profile_id: 2
  }

  useEffect(()=>{
    const init = async () =>{
      const { data: categories } = await getCategories();
      const { data: products } = await getProducts();

      setProducts(products ?? [])
      setCategories(categories ?? [])

      const initialQuantities: {[key: number]: number} = {};
      products?.forEach((product)=>{
        initialQuantities[product.id] = 0;
      })
      setProductQuantities(initialQuantities);

      setLoading(false);
    }

    init();
  },[]);

  const increaseQuantity = (productId: number) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const decreaseQuantity = (productId: number) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1)
    }));
  };

  const orderDetails: OrderDetailTemporary[] = products
  .filter(product => productQuantities[product.id] > 0)
  .map(product => ({
    product,
    quantity: productQuantities[product.id],
    total_price: ((product.sell_price??0) * productQuantities[product.id]),
  }));

  const totalAmount = orderDetails.reduce(
    (sum, item) => sum + ((item.product.sell_price??0) * item.quantity), 
    0
  );

  if (loading){
    return <div>Loading...</div>
  }

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
                              {product.product_image ? (
                                <img src={`${product.product_image}`} alt="Image" className="rounded-md object-cover" />
                              ):(
                                <img src={"https://uezxmezenszyrorynpyl.supabase.co/storage/v1/object/public/product-image//Intel%20CPU.png"} alt="Image" className="rounded-md object-cover" />
                              )}
                            </AspectRatio>
                          </div>
                          <Separator className="mt-4" />
                          <p className="mt-2 text-start font-medium">{product.product_name}</p>
                          <p className="mt-2 text-start text-sm text-slate-500 truncate">{product.description === "" ? "Product has no description" : product.description}</p>
                        </CardContent>
                        <CardFooter className="flex">
                          <Button 
                            className="flex-none rounded-full" 
                            size={"icon"}
                            onClick={()=> decreaseQuantity(product.id)}
                            disabled={productQuantities[product.id] <= 0}
                          ><Minus /></Button>
                          <span className="grow text-center">{productQuantities[product.id] || 0}</span>
                          <Button 
                            className="flex-none rounded-full" 
                            size={"icon"}
                            onClick={()=> increaseQuantity(product.id)}
                          ><Plus /></Button>
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
          {orderDetails.length > 0 ? (
            <div className="flex flex-col space-y-2 overflow-y-auto">
              {orderDetails.map(({product, quantity, total_price})=>(
                <div key={product.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{product.product_name}</p>
                    <p className="text-sm text-gray-500">{quantity}</p>
                  </div>
                  <p className="font-medium">{total_price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ):(
            <div className="text-center text-gray-500 py-8">
              Your order is empty
            </div>
          )}
          {/* Footer */}
          <div className="mt-auto">
            <Separator className="my-4"/>
            <div className="flex justify-between mb-4">
              <p className="font-semibold">Total:</p>
              <p className="font-bold">{totalAmount.toFixed(2)}</p>
            </div>
            <ConfirmationAlert 
              order={Order}
              OrderAction={createOrder}
              warningMessage="Order will be confirmed. You cannot change order items after confirming"
              successMessage="Order confirmed!"
              successDescription="Order has been submitted"
              variant="Confirm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
