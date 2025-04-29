import { Metadata } from "next";
import OrderMenu from "./ui/order_menu"

export const metadata: Metadata = {
  title: "Order"
};

export default function OrderMenuPage() {
 
  return (
    <OrderMenu />
  )
}
