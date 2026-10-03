import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  await clearSessionCookie();

  const url = new URL("/login", request.url);

  return NextResponse.redirect(url);
}