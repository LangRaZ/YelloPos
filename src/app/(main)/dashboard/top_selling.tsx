"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { getTopSelling } from "@/lib/supabase/api"; // ganti path ini sesuai struktur project-mu

type TopProduct = {
    id: number;
    product_name: string;
    total_quantity_sold: number;
  };
  
  export default function TopSellingCard() {
    const [topProduct, setTopProduct] = useState<TopProduct | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
        const result = await getTopSelling();
  
        // Check if it's an array (successful result)
        if (Array.isArray(result) && result.length > 0) {
          setTopProduct(result[0]); // ambil produk teratas
        } else {
          console.error("Failed to fetch top selling product:", result);
        }
  
        setLoading(false);
      }
  
      fetchData();
    }, []);
  
    return (
      <Card className="max-w-sm w-full p-4 shadow-md rounded-2xl">
        <CardContent className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Top Selling Product</h2>
  
          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin" size={20} />
              Loading...
            </div>
          ) : topProduct ? (
            <div>
              <p className="text-lg font-semibold">{topProduct.product_name}</p>
              <p className="text-sm text-muted-foreground">
                Sold: {topProduct.total_quantity_sold}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No data available</p>
          )}
        </CardContent>
      </Card>
    );
  }