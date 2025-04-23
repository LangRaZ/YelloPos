"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { getTopSelling } from "@/lib/supabase/api";

type TopProduct = {
  id: number;
  product_name: string;
  total_quantity_sold: number;
};

const barColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function TopSellingChart() {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getTopSelling();
      if (Array.isArray(result)) {
        setTopProducts(result.slice(0, 5));
      } else {
        console.error("Failed to fetch data", result);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const chartData = topProducts.map((product, index) => ({
    name: product.product_name,
    sold: product.total_quantity_sold,
    fill: barColors[index % barColors.length],
  }));

  const chartConfig: ChartConfig = {
    sold: {
      label: "Sold",
    },
    label: {
      color: "hsl(var(--background))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>This Month</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading chart...</p>
        ) : topProducts.length === 0 ? (
          <p className="text-muted-foreground">No sales data available</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ left: 10, right: 16 }}
              barGap={12}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
              />
              <XAxis dataKey="sold" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="sold" layout="vertical" radius={4}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                {/* Show only quantity label on right */}
                <LabelList
                dataKey="sold"
                position="insideLeft"
                offset={8}
                className="fill-background" // make sure it's readable on your bar color
                fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Based on quantity sold
        </div>
      </CardFooter> */}
    </Card>
  );
}
