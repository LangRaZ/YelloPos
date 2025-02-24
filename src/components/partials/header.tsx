"use client"

import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";

const formatPathname = (path : String) => {
    if (path === "/") return "Dashboard";
  
    return path
      .replace("/", "")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

export default function header() {
    const pathName = usePathname();
    const formattedPathName = formatPathname(pathName)
    return (
        <header className="bg-white py-4 px-4 w-full h-auto flex justify-between items-center">
            <div className="flex w-full items-center gap-2">
                <SidebarTrigger />
                <p className="text-black text-sm">{formattedPathName}</p>
            </div>
        </header>
    )
}
