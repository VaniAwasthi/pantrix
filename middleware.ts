import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_COOKIE_NAME,
  AUTH_ROUTES,
  PROTECTED_ROUTES,
} from "@/utils/constants";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const session = await verifyToken(token);
    if (!session) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }
  }

  if ((isAuthRoute || pathname === "/") && token) {
    const session = await verifyToken(token);
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/:path*",
    "/pantry",
    "/pantry/:path*",
    "/recipes",
    "/recipes/:path*",
    "/setup",
    "/setup/:path*",
    "/shopping",
    "/shopping/:path*",
    "/nutrition",
    "/nutrition/:path*",
    "/profile",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
