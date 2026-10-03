import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const records = await prisma.dsaSubmission.findMany({
      where: {
        userId: session.userId,
      },
      orderBy: {
        solvedAt: "desc",
      },
    });

    return NextResponse.json({
      ok: true,
      records,
    });
  } catch (error) {
    console.error("Get DSA records error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to load DSA records",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const problemId = String(body.problemId || "").trim();
    const title = String(body.title || "").trim();
    const difficulty = String(body.difficulty || "").trim();
    const topic = String(body.topic || "").trim();
    const platform = String(body.platform || "LeetCode").trim();

    if (!problemId || !title || !difficulty || !topic) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Problem ID, title, difficulty, and topic are required",
        },
        { status: 400 }
      );
    }

    if (!["Easy", "Medium", "Hard"].includes(difficulty)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Difficulty must be Easy, Medium, or Hard",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.dsaSubmission.findFirst({
      where: {
        userId: session.userId,
        problemId,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          ok: false,
          error: "You have already marked this problem as solved",
        },
        { status: 409 }
      );
    }

    const record = await prisma.dsaSubmission.create({
      data: {
        userId: session.userId,
        problemId,
        title,
        difficulty,
        topic,
        platform,
        status: "Solved",
      },
    });

    return NextResponse.json({
      ok: true,
      record,
    });
  } catch (error) {
    console.error("Add DSA record error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to save DSA problem",
      },
      { status: 500 }
    );
  }
}