import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function withPathname(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return url;
}

function internalAdminPath(pathname: string) {
  if (pathname === "/admin") return "/dashboard";
  if (pathname === "/admin/login") return "/login";
  if (pathname === "/admin/dashboard") return "/dashboard";
  if (pathname === "/admin/products") return "/products";
  if (pathname.startsWith("/admin/products/")) return pathname.replace("/admin", "");
  if (pathname === "/admin/sales") return "/sales";
  if (pathname === "/admin/social") return "/social";
  if (pathname === "/admin/customers") return "/customers";
  if (pathname === "/admin/blog") return "/blog";
  return null;
}

function publicAdminPath(pathname: string) {
  if (pathname === "/login") return "/admin/login";
  if (pathname === "/dashboard") return "/admin/dashboard";
  if (pathname === "/products" || pathname.startsWith("/products/")) return `/admin${pathname}`;
  if (pathname === "/sales") return "/admin/sales";
  if (pathname === "/social") return "/admin/social";
  if (pathname === "/customers") return "/admin/customers";
  if (pathname === "/blog") return "/admin/blog";
  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("dunes-admin-session")?.value;

  const canonicalAdminPath = publicAdminPath(pathname);
  if (canonicalAdminPath) {
    if (!session && canonicalAdminPath !== "/admin/login") {
      return NextResponse.redirect(withPathname(request, "/admin/login"));
    }

    return NextResponse.redirect(withPathname(request, canonicalAdminPath));
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin") {
    return NextResponse.redirect(withPathname(request, session ? "/admin/dashboard" : "/admin/login"));
  }

  if (pathname === "/admin/login") {
    if (session) {
      return NextResponse.redirect(withPathname(request, "/admin/dashboard"));
    }

    return NextResponse.rewrite(withPathname(request, "/login"));
  }

  if (!session) {
    return NextResponse.redirect(withPathname(request, "/admin/login"));
  }

  const destination = internalAdminPath(pathname);
  if (!destination) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(withPathname(request, destination));
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/dashboard",
    "/products/:path*",
    "/sales",
    "/social",
    "/customers",
    "/blog",
  ],
};