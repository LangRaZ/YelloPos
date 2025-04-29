import { Metadata } from "next";
import Dashboard from "./ui/dashboard"

export const metadata: Metadata = {
  title: "Dashboard"
};

export default function DashboardPage() {
  
  return (
    <Dashboard />
  )
}
