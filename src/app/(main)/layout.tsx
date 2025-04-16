import { cookies } from "next/headers"
import { Metadata } from "next";

import Header from "@/components/partials/header";
import { SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/partials/app_sidebar";
import { createClient } from "@/lib/supabase/server_config";
import '../globals.css';
import { SidebarParam } from "@/interface";
import { roleArray } from "@/constants";


export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const sidebarParam : SidebarParam = {
    email: roleArray[session?.user.user_metadata.role_id - 1]??roleArray[0],
    name: session?.user.user_metadata.username ?? session?.user.user_metadata.name
  }
  
  return (
    <SidebarProvider defaultOpen = {defaultOpen}>
        <AppSidebar Params={sidebarParam} />
        <div className="flex flex-col w-full">
          <Header />
          <main className="py-5 px-10">
            {children}
          </main>
        </div>
    </SidebarProvider>
  );
}
