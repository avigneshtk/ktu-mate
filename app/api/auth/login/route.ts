import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      const issue = result.error.issues[0];
      return NextResponse.json(
        { ok: false, error: issue?.message || "Invalid email or password" },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });

    // Use the same error message whether the user is not found or the password
    // is wrong — prevents email enumeration via timing or message differences.
    if (!user) {
      // Still run a dummy comparison to maintain consistent response time
      // regardless of whether the email exists.
      await verifyPassword(password, "$2b$10$dummyhashtopreventtimingattack00000000000000000");
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Session only — streak is updated by real study activity, not login.
    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      username: user.profile?.username || user.email.split("@")[0],
    });

    await setSessionCookie(token);

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.profile?.fullName,
        username: user.profile?.username,
        course: user.profile?.course,
        semester: user.profile?.semester,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error during login" },
      { status: 500 }
    );
  }
}
