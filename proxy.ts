import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminRoute) return NextResponse.next();

  const isLoginRoute =
    pathname === "/admin/login" || pathname === "/api/admin/login";
  if (isLoginRoute) return NextResponse.next();

  const token = request.cookies.get("admin_token")?.value;
  const expectedToken = process.env.ADMIN_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
