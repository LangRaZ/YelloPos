import { cookies } from "next/headers"
import { Metadata } from "next";

import Header from "@/components/partials/header";
import { SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/partials/app_sidebar";
import '../globals.css';


export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  
  return (
    <SidebarProvider defaultOpen = {defaultOpen}>
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="py-5 px-10">
            {children}
          </main>
        </div>
    </SidebarProvider>
  );
}
