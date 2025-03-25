"use client"

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarFooter,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { sidebarLinks, secondaryLinks } from "@/constants";
import { NavUser } from "@/components/partials/nav-user"
import { usePathname } from "next/navigation";
import { SidebarParam } from "@/interface";

export function AppSidebar({ Params } : { Params:SidebarParam | null }) {
    const { open } = useSidebar();
    const pathName = usePathname();

    const data = {
        user: {
        name: Params?.name?? "",
        email: Params?.email?? "",
        avatar: "/avatars/shadcn.jpg",
        },
    }
    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="sidebar-content">
                <SidebarHeader>
                    {open ? (
                        <div className="flex pl-2">
                            <img src="/icons/logo-expanded.svg" alt=""/>
                        </div>
                    ):(
                        <div className="">
                            <img src="/icons/logo-collapsed.svg" alt=""/>
                        </div>
                    )}
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>APPLICATION</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarLinks.map((item) => (
                                (pathName.startsWith(item.route))?(
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton isActive asChild>
                                            <a href={item.route}>
                                                {open ? (
                                                    <>
                                                        <span className="h-full w-[3px] bg-sidebar-accent-foreground rounded-xl"></span>
                                                        <img src={item.imgURL} alt="" width="20px" height="20px" />
                                                        <span>{item.label}</span>
                                                    </>
                                                ):(
                                                    <>
                                                        <img src={item.imgURL} alt="" width="20px" height="20px" />
                                                        <span>{item.label}</span>
                                                    </>
                                                )}
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ):(
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.route}>
                                                <img src={item.imgURL} alt="" width="20px" height="20px" />
                                                <span>{item.label}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel>ACCOUNT MANAGEMENT</SidebarGroupLabel>
                    <SidebarGroupContent>
                    <SidebarMenu>
                        {secondaryLinks.map((item) => (
                            (pathName.startsWith(item.route))?(
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton isActive asChild>
                                    <a href={item.route}>
                                        {open ? (
                                            <>
                                                <span className="h-full w-[3px] bg-sidebar-accent-foreground rounded-xl"></span>
                                                <img src={item.imgURL} alt="" width="20px" height="20px" />
                                                <span>{item.label}</span>
                                            </>
                                        ):(
                                            <>
                                                <img src={item.imgURL} alt="" width="20px" height="20px" />
                                                <span>{item.label}</span>
                                            </>
                                        )}
                                    </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ):(
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild>
                                    <a href={item.route}>
                                        <img src={item.imgURL} alt="" width="20px" height="20px" />
                                        <span>{item.label}</span>
                                    </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        ))}
                    </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}