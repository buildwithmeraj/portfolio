import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export async function GET(request) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = await verifyAdminToken(token);

  if (!payload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    },
  });
}
