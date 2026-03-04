import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "./src/lib/auth";

export async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = await verifyAdminToken(token);
  const isLoginRoute =
    pathname === "/admin/login" || pathname.startsWith("/admin/login/");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (isLoginRoute) {
    if (payload) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (!payload) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
