import { jwtVerify, SignJWT } from "jose";

export const AUTH_COOKIE_NAME = "admin_session";

const encoder = new TextEncoder();

function getJwtSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("Missing AUTH_SECRET in environment variables.");
  }
  return encoder.encode(secret);
}

export async function createAdminToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyAdminToken(token) {
  // Make sure this returns null/false if token is missing or invalid
  if (!token) {
    return null; // ← Ensure this returns null, not undefined
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    return null; // ← Return null on verification failure
  }
}

export function setAuthCookie(response, token) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie(response) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
