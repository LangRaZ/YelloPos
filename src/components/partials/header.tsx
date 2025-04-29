"use client"

import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";

const formatPathname = (path : String) => {
    if (path === "/") return "Dashboard";
     
    const title = path
    .replace("/", "")
    .split("/")
    .shift()??""

    return title.charAt(0).toUpperCase() + title.slice(1);
  };

export default function header() {
    const pathName = usePathname();
    const formattedPathName = formatPathname(pathName)
    return (
        <header className="bg-white py-4 px-4 w-full h-auto flex justify-between items-center sticky top-0 z-10">
            <div className="flex w-full items-center gap-2">
                <SidebarTrigger />
                <p className="text-black text-lg">{formattedPathName}</p>
            </div>
        </header>
    )
}
