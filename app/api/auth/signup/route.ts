import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  college: z.string().optional().default("KTU Affiliated College"),
  course: z.string().optional().default("B.Tech Computer Science & Engineering"),
  semester: z.number().int().min(1).max(8).optional().default(3),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      const issue = result.error.issues[0];
      return NextResponse.json(
        { ok: false, error: issue?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const { email, password, fullName, username, college, course, semester } =
      result.data;

    // Check if email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { profile: { username } }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { ok: false, error: "An account with this email already exists" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { ok: false, error: "This username is already taken" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);
    const today = new Date().toISOString().split("T")[0];

    // Create user and related profile + streak in transaction
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        profile: {
          create: {
            fullName,
            username,
            college,
            course,
            semester,
            academicYear: "2024-2028",
            bio: "KTU Engineering Student exploring tech and algorithms.",
          },
        },
        studyStreak: {
          create: {
            currentStreak: 1,
            bestStreak: 1,
            totalDays: 1,
            lastActiveAt: new Date(),
            activityLogs: JSON.stringify([today]),
          },
        },
      },
      include: {
        profile: true,
      },
    });

    // Create session token and set HttpOnly cookie
    const token = await createSessionToken({
      userId: newUser.id,
      email: newUser.email,
      username: newUser.profile?.username || username,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      ok: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.profile?.fullName,
        username: newUser.profile?.username,
        course: newUser.profile?.course,
        semester: newUser.profile?.semester,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error during registration" },
      { status: 500 }
    );
  }
}
