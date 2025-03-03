"use client"

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function BackButton(){
    const router = useRouter();
    return (
        <Button
        variant={"outline"}
        size={"icon"}
        onClick={router.back}
        className="mr-3"
        >
            <ArrowLeft />
        </Button>
    )
    // return <ArrowLeft onClick={router.back} className="cursor-pointer mr-3" />
}