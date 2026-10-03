import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import AddTimetableSession from "@/components/AddTimetableSession";
import TimetableItem from "@/components/TimetableItem";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function TimetablePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const timetable = await prisma.timetableItem.findMany({
    where: { userId: session.userId },
    orderBy: { startTime: "asc" },
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Study Planner"
        title="Timetable"
        description="Organise your classes, labs, and self-study sessions."
      />

      <div className="mt-6">
        <AddTimetableSession />
      </div>

      {timetable.length === 0 ? (
        <EmptyState
          tone="indigo"
          title="Your timetable is empty"
          description="Add your KTU classes and study sessions to generate a schedule."
        />
      ) : (
        <div className="mt-8 space-y-8">
          {days.map((day) => {
            const items = timetable.filter((t) => t.dayOfWeek === day);
            if (items.length === 0) return null;

            return (
              <div
                key={day}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md"
              >
                <h3 className="mb-4 text-lg font-bold text-white">{day}</h3>

                <div className="space-y-3">
                  {items.map((item) => (
                    <TimetableItem
                      key={item.id}
                      id={item.id}
                      subject={item.subject}
                      startTime={item.startTime}
                      endTime={item.endTime}
                      room={item.room}
                      isLab={item.isLab}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}