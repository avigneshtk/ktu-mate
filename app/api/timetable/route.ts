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

    const timetable = await prisma.timetableItem.findMany({
      where: {
        userId: session.userId,
      },
      orderBy: [
        {
          dayOfWeek: "asc",
        },
        {
          startTime: "asc",
        },
      ],
    });

    return NextResponse.json({
      ok: true,
      timetable,
    });
  } catch (error) {
    console.error("Get timetable error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to load timetable",
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

    const dayOfWeek = String(body.dayOfWeek || "").trim();
    const subject = String(body.subject || "").trim();
    const startTime = String(body.startTime || "").trim();
    const endTime = String(body.endTime || "").trim();
    const room = String(body.room || "").trim();
    const isLab = Boolean(body.isLab);

    if (!dayOfWeek || !subject || !startTime || !endTime) {
      return NextResponse.json(
        {
          ok: false,
          error: "Day, subject, start time, and end time are required",
        },
        { status: 400 }
      );
    }

    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];

    if (!validDays.includes(dayOfWeek)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid day of week",
        },
        { status: 400 }
      );
    }

    const timetableItem = await prisma.timetableItem.create({
      data: {
        userId: session.userId,
        dayOfWeek,
        subject,
        startTime,
        endTime,
        room: room || null,
        isLab,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        timetableItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create timetable error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to create timetable session",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = String(body.id || "").trim();

    if (!id) {
      return NextResponse.json(
        {
          ok: false,
          error: "Timetable item ID is required",
        },
        { status: 400 }
      );
    }

    const timetableItem = await prisma.timetableItem.findFirst({
      where: {
        id,
        userId: session.userId,
      },
    });

    if (!timetableItem) {
      return NextResponse.json(
        {
          ok: false,
          error: "Timetable session not found",
        },
        { status: 404 }
      );
    }

    await prisma.timetableItem.delete({
      where: {
        id: timetableItem.id,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Timetable session deleted",
    });
  } catch (error) {
    console.error("Delete timetable error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to delete timetable session",
      },
      { status: 500 }
    );
  }
}