 export { auth as middleware } from "@/auth";
// export const config = {
//   matcher: ["/admin/meetings/:path*"], // protect all admin meeting routes
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Example: check if user is logged in via a cookie/session
  const isLoggedIn = req.cookies.get("token"); // adjust to your setup

  // Protect admin routes
  const isDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isMeetingNew = nextUrl.pathname === "/meetings/new";
  const isMeetingEdit = /^\/meetings\/[^/]+\/edit$/.test(nextUrl.pathname);

  const isAdminRoute = isDashboard || isMeetingNew || isMeetingEdit;

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/meetings/new",
    "/meetings/:id/edit",
  ],
};

