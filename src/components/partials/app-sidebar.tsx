"use client"

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { sidebarLinks } from "@/constants";

export function AppSidebar() {
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarHeader>
                    {open ? (
                        <div className="flex">
                            <img src="/icons/logo-expanded.svg" alt=""/>
                        </div>
                    ):(
                        <div className="">
                            <img src="/icons/logo-collapsed.svg" alt=""/>
                        </div>
                    )}
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarLinks.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.route}>
                                            <img src={item.imgURL} alt="" width="20px" height="20px" />
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