import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define which paths are public and which are protected
  const isPublicPath = path === "/login" || path === "/admin/login";
  const isAdminPath = path.startsWith("/admin") && path !== "/admin/login";

  const token = request.cookies.get("admin_auth")?.value;

  // Redirect authenticated users away from login page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Redirect unauthenticated users to login page from admin pages
  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
