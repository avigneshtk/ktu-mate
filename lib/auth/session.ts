import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * AUTH_SECRET must be set as an environment variable.
 * For local development, add to .env.local:
 *   AUTH_SECRET="a-long-random-string-at-least-32-chars"
 * Generate one with: openssl rand -base64 32
 * NEVER commit an actual secret value.
 */
function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET environment variable is not set. " +
        "Add AUTH_SECRET to your .env.local for development, " +
        "or to your Vercel environment variables for production."
    );
  }
  return new Uint8Array(new TextEncoder().encode(secret));
}

const SESSION_COOKIE_NAME = "ktu_session";

export interface SessionPayload {
  userId: string;
  email: string;
  username: string;
}

export async function createSessionToken(
  payload: SessionPayload
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      username: payload.username as string,
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
