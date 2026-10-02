import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
        profile: true,
        studyStreak: true,
        _count: {
          select: {
            dsaRecords: {
              where: { status: "Solved" },
            },
            timetable: true,
            seriesMarks: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        profile: user.profile,
        studyStreak: user.studyStreak,
        stats: {
          solvedDsaCount: user._count.dsaRecords,
          timetableCount: user._count.timetable,
          seriesMarksCount: user._count.seriesMarks,
        },
      },
    });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
