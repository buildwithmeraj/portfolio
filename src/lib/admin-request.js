import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export async function requireAdminRequest(request) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = await verifyAdminToken(token);

  if (!payload) {
    return {
      authorized: false,
      payload: null,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  return {
    authorized: true,
    payload,
    response: null,
  };
}
