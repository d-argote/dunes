// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Seed: 404 en producción sin importar headers ni tokens
  if (pathname === "/api/auth/seed") {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.next();
  }

  // Verificar sesión en rutas admin
  const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
  const userId = verifySession(token);

  if (!userId) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/customers/:path*",
    "/admin/:path*",
    "/sales/:path*",
    "/social/:path*",
    "/api/auth/seed",
  ],
};