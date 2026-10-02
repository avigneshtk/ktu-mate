import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * AUTH_SECRET must be set as an environment variable.
 * The middleware reads it at request time so a missing secret causes an
 * immediate unauthenticated redirect rather than a process crash.
 */
function getSecretKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return new Uint8Array(new TextEncoder().encode(secret));
}

const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/dsa",
  "/leetcode",
  "/timetable",
  "/analysis",
  "/streak",
  "/settings",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("ktu_session")?.value;

  let isAuthenticated = false;
  const secretKey = getSecretKey();

  if (token && secretKey) {
    try {
      await jwtVerify(token, secretKey);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // If user is trying to access protected route without valid token
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is already authenticated and visits /login or /signup, redirect to dashboard
  if ((pathname === "/login" || pathname === "/signup") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/dsa/:path*",
    "/leetcode/:path*",
    "/timetable/:path*",
    "/analysis/:path*",
    "/streak/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
  ],
};
