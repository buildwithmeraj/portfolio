import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createAdminToken, setAuthCookie } from "@/lib/auth";
import { ensureAdminFromEnv } from "@/lib/admin-user";
import { getDb } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const username = body?.username?.trim();
    const password = body?.password;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required." },
        { status: 400 },
      );
    }

    await ensureAdminFromEnv();

    const db = await getDb();
    const admins = db.collection("admins");
    const admin = await admins.findOne({ username, isActive: { $ne: false } });

    if (!admin) {
      return NextResponse.json(
        { message: "Invalid username or password." },
        { status: 401 },
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid username or password." },
        { status: 401 },
      );
    }

    const token = await createAdminToken({
      sub: admin._id.toString(),
      username: admin.username,
      role: admin.role || "admin",
    });

    const response = NextResponse.json({
      message: "Login successful.",
      user: {
        id: admin._id.toString(),
        username: admin.username,
        role: admin.role || "admin",
      },
    });

    setAuthCookie(response, token);
    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json(
      { message: "Unable to log in right now." },
      { status: 500 },
    );
  }
}
