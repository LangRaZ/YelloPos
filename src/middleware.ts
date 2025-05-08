import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/server_config";


export async function middleware(request: NextRequest) {
    const supabase = await createClient();

    const { data: {user} } = await supabase.auth.getUser()
    const cashierAccessiblePage = ['/order', '/transaction']
    const adminAccessiblePage = ['/order', '/transaction', '/product', '/category']

    if(
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/register') &&
        !request.nextUrl.pathname.startsWith('/auth')
    ){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    if(user){
        if(user.user_metadata.first_login && !request.nextUrl.pathname.startsWith('/first-login')){
            return NextResponse.redirect(new URL('/first-login', request.url))
        }
        else if(request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register') || request.nextUrl.pathname ==='/'){
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        else if(user.user_metadata.first_setup_tax && request.nextUrl.pathname === '/tax'){
            return NextResponse.redirect(new URL('/tax/first-tax', request.url))
        }
        else{
            //middleware cashier
            if(user.user_metadata.role_id === 2 && !cashierAccessiblePage.some((page) => request.nextUrl.pathname.startsWith(page))){
                return NextResponse.redirect(new URL('/order', request.url))
            }
            if(user.user_metadata.role_id === 3 && !adminAccessiblePage.some((page) => request.nextUrl.pathname.startsWith(page))){
                return NextResponse.redirect(new URL('/order', request.url))
            }
        }
    }

    const res = NextResponse.next();
    return res;
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/first-login",
        "/category",
        "/category/:id*",
        "/order",
        "/product",
        "/product/:id*",
        "/tax",
        "/transaction",
        "/user",
        "/user/:id*",
        "/business",
        "/dashboard",
    ],
};
