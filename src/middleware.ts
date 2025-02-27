import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/server_config";


export async function middleware(request: NextRequest) {
    const supabase = await createClient();

    const { data: {user} } = await supabase.auth.getUser()

    if(
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/register') &&
        !request.nextUrl.pathname.startsWith('/auth')
    ){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const res = NextResponse.next();
    return res;
}

export const config = {
    matcher: [
        // "/",
        // "/login",
        // "/register",
        // "/category",
        // "/order",
        // "/product",
        // "/tax",
        // "/transaction",
    ],
};
