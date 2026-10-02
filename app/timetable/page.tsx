import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
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

      {timetable.length === 0 ? (
        <EmptyState
          tone="indigo"
          title="Your timetable is empty"
          description="Add your KTU classes and study sessions to generate a schedule."
        >
          <button className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            Add Session
          </button>
        </EmptyState>
      ) : (
        <div className="mt-8 space-y-8">
          {days.map((day) => {
            const items = timetable.filter((t) => t.dayOfWeek === day);
            if (items.length === 0) return null;

            return (
              <div key={day} className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
                <h3 className="mb-4 text-lg font-bold text-white">{day}</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-[#090d16] p-4"
                    >
                      <div>
                        <p className="font-semibold text-white">{item.subject}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {item.startTime} - {item.endTime} {item.room ? `• ${item.room}` : ""}
                        </p>
                      </div>
                      {item.isLab && (
                        <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/30">
                          Lab
                        </span>
                      )}
                    </div>
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
