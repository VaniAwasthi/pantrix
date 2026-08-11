import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/utils/constants";
import type { User } from "@/types/user";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "pantrix-dev-secret-change-in-production"
);

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function toPublicUser(session: SessionPayload): User {
  return {
    id: session.userId,
    email: session.email,
    name: session.name,
    createdAt: new Date().toISOString(),
  };
}

export async function getTokenFromRequest(
  request: Request
): Promise<string | null> {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${AUTH_COOKIE_NAME}=([^;]+)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export async function getSessionFromRequest(
  request: Request
): Promise<SessionPayload | null> {
  const token = await getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
