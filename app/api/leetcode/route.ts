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
      where: {
        id: session.userId,
      },
      select: {
        leetcodeUsername: true,
      },
    });

    return NextResponse.json({
      ok: true,
      username: user?.leetcodeUsername ?? null,
    });
  } catch (error) {
    console.error("Get LeetCode account error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to load LeetCode account",
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
    const username = String(body.username || "").trim();

    if (!username) {
      return NextResponse.json(
        {
          ok: false,
          error: "LeetCode username is required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        leetcodeUsername: username,
      },
      select: {
        leetcodeUsername: true,
      },
    });

    return NextResponse.json({
      ok: true,
      username: user.leetcodeUsername,
    });
  } catch (error) {
    console.error("Connect LeetCode account error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to connect LeetCode account",
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        leetcodeUsername: null,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "LeetCode account disconnected",
    });
  } catch (error) {
    console.error("Disconnect LeetCode account error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to disconnect LeetCode account",
      },
      { status: 500 }
    );
  }
}