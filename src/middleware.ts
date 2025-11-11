import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req:NextRequest){

    const token = await getToken({req,secret:process.env.NEXTAUTH_SECRET})
    const url = new URL(req.url)

    if (url.pathname.startsWith("/api/donation/webhook")) {
    return NextResponse.next();
  }

    if(!token && (
        url.pathname.startsWith('/dashboard')||
        url.pathname.startsWith('/contribution')||
        url.pathname.startsWith('/donation')||
        url.pathname.startsWith('/tripplanner')
    )){
        return NextResponse.redirect(new URL('/',req.url))
    }
    return NextResponse.next()

}


export const config = {
  matcher: [
    '/dashboard/:path*',
    '/contribution/:path*',
    '/donation/:path*',
    '/tripplanner/:path*',
  ],
  runtime: 'nodejs',
};