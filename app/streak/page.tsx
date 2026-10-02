import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function StreakPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const streak = await prisma.studyStreak.findUnique({
    where: { userId: session.userId },
  });

  if (!streak) redirect("/login");

  let activityLogs: string[] = [];
  try {
    activityLogs = JSON.parse(streak.activityLogs);
  } catch {
    activityLogs = [];
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Activity Tracking"
        title="Study Streak"
        description="Build consistency. Every day you log a study session or solve a DSA problem counts."
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-center backdrop-blur-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/20 text-3xl shadow-inner shadow-rose-500/20">
            🔥
          </div>
          <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-400">Current Streak</p>
          <p className="mt-2 text-4xl font-black text-white">{streak.currentStreak} Days</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-center backdrop-blur-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20 text-3xl shadow-inner shadow-amber-500/20">
            👑
          </div>
          <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-400">Best Streak</p>
          <p className="mt-2 text-4xl font-black text-white">{streak.bestStreak} Days</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-center backdrop-blur-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl shadow-inner shadow-emerald-500/20">
            📅
          </div>
          <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-400">Total Active Days</p>
          <p className="mt-2 text-4xl font-black text-white">{streak.totalDays} Days</p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-md">
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="flex flex-wrap gap-2">
          {activityLogs.slice(-30).map((dateStr, idx) => (
            <div
              key={idx}
              className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 shadow-sm"
              title={`Active on ${dateStr}`}
            >
              <span className="text-xs font-bold">{new Date(dateStr).getDate()}</span>
            </div>
          ))}
          {activityLogs.length === 0 && (
            <p className="text-sm text-slate-400">No activity logged yet.</p>
          )}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Showing up to the last 30 days of active study sessions. Keep the streak going!
        </p>
      </div>
    </AppShell>
  );
}
