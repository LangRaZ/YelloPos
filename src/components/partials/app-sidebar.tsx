import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";

import { sidebarLinks } from "@/constants";
  
export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {sidebarLinks.map((item) => (
                    <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                        <a href={item.route}>
                            <img src={item.imgURL} alt="" width="30px" height="30px"/>
                            <span>{item.label}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        </Sidebar>
    )
}