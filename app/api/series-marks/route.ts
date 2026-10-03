import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

function getSeriesTest(request: Request) {
  const url = new URL(request.url);
  const test = Number(url.searchParams.get("test") || "1");

  return test === 2 ? 2 : 1;
}

export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const seriesTest = getSeriesTest(request);

    const marks = await prisma.seriesMark.findMany({
      where: {
        userId: session.userId,
        seriesTest,
      },
      orderBy: [
        { subjectName: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({
      ok: true,
      marks,
    });
  } catch (error) {
    console.error("Get series marks error:", error);

    return NextResponse.json(
      { ok: false, error: "Failed to load marks" },
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

    const seriesTest =
      Number(body.seriesTest) === 2 ? 2 : 1;

    const subjectCode = String(body.subjectCode || "").trim();
    const subjectName = String(body.subjectName || "").trim();
    const marksScored = Number(body.marksScored);
    const maxMarks = Number(body.maxMarks ?? 50);

    if (!subjectCode || !subjectName) {
      return NextResponse.json(
        {
          ok: false,
          error: "Subject code and subject name are required",
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(marksScored) || !Number.isFinite(maxMarks)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Marks must be valid numbers",
        },
        { status: 400 }
      );
    }

    if (maxMarks <= 0 || marksScored < 0 || marksScored > maxMarks) {
      return NextResponse.json(
        {
          ok: false,
          error: `Marks must be between 0 and ${maxMarks}`,
        },
        { status: 400 }
      );
    }

    const mark = await prisma.seriesMark.create({
      data: {
        userId: session.userId,
        seriesTest,
        subjectCode,
        subjectName,
        marksScored,
        maxMarks,
      },
    });

    return NextResponse.json({
      ok: true,
      mark,
    });
  } catch (error) {
    console.error("Add series marks error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to save marks",
      },
      { status: 500 }
    );
  }
}