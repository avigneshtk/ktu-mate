import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

const FEATURE_CARDS = [
  {
    href: "/analysis",
    icon: "ST",
    color: "purple",
    label: "Series Tests",
    desc: "Track your marks, compare tests, and identify subjects that need more attention.",
    linkLabel: "View Analysis",
  },
  {
    href: "/avigu",
    icon: "AI",
    color: "cyan",
    label: "Avigu AI",
    desc: "Get personalized academic guidance, study plans, and exam preparation help.",
    linkLabel: "Chat with Avigu",
  },
  {
    href: "/timetable",
    icon: "TT",
    color: "indigo",
    label: "Timetable",
    desc: "Keep your classes organized and know what you need to focus on today.",
    linkLabel: "View Timetable",
  },
  {
    href: "/dsa",
    icon: "DS",
    color: "emerald",
    label: "DSA Practice",
    desc: "Practice coding problems topic by topic and build your problem-solving skills.",
    linkLabel: "Practice DSA",
  },
  {
    href: "/leetcode",
    icon: "LC",
    color: "amber",
    label: "LeetCode",
    desc: "Keep track of your coding journey and prepare consistently for placements.",
    linkLabel: "Open LeetCode",
  },
  {
    href: "/streak",
    icon: "🔥",
    color: "rose",
    label: "Daily Streak",
    desc: "Stay consistent with your studies and build habits one day at a time.",
    linkLabel: "View Streak",
  },
] as const;

const COLOR_MAP: Record<
  string,
  {
    icon: string;
    border: string;
    text: string;
  }
> = {
  purple: {
    icon: "bg-purple-500/15 border-purple-400/20",
    border: "hover:border-purple-400/30",
    text: "text-purple-300",
  },
  cyan: {
    icon: "bg-cyan-500/15 border-cyan-400/20",
    border: "hover:border-cyan-400/30",
    text: "text-cyan-300",
  },
  indigo: {
    icon: "bg-indigo-500/15 border-indigo-400/20",
    border: "hover:border-indigo-400/30",
    text: "text-indigo-300",
  },
  emerald: {
    icon: "bg-emerald-500/15 border-emerald-400/20",
    border: "hover:border-emerald-400/30",
    text: "text-emerald-300",
  },
  amber: {
    icon: "bg-amber-500/15 border-amber-400/20",
    border: "hover:border-amber-400/30",
    text: "text-amber-300",
  },
  rose: {
    icon: "bg-rose-500/15 border-rose-400/20",
    border: "hover:border-rose-400/30",
    text: "text-rose-300",
  },
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      profile: true,
      studyStreak: true,
      seriesMarks: {
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          dsaRecords: true,
          timetable: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const seriesMarks = user.seriesMarks;

  const totalScored = seriesMarks.reduce(
    (sum, mark) => sum + mark.marksScored,
    0
  );

  const totalMaximum = seriesMarks.reduce(
    (sum, mark) => sum + mark.maxMarks,
    0
  );

  const overallPercentage =
    totalMaximum > 0 ? Math.round((totalScored / totalMaximum) * 100) : 0;

  const series1Marks = seriesMarks.filter(
    (mark) => mark.seriesTest === 1
  );

  const series2Marks = seriesMarks.filter(
    (mark) => mark.seriesTest === 2
  );

  const series1Scored = series1Marks.reduce(
    (sum, mark) => sum + mark.marksScored,
    0
  );

  const series1Maximum = series1Marks.reduce(
    (sum, mark) => sum + mark.maxMarks,
    0
  );

  const series2Scored = series2Marks.reduce(
    (sum, mark) => sum + mark.marksScored,
    0
  );

  const series2Maximum = series2Marks.reduce(
    (sum, mark) => sum + mark.maxMarks,
    0
  );

  const series1Percentage =
    series1Maximum > 0
      ? Math.round((series1Scored / series1Maximum) * 100)
      : 0;

  const series2Percentage =
    series2Maximum > 0
      ? Math.round((series2Scored / series2Maximum) * 100)
      : 0;

  const firstName =
    user.profile?.fullName?.split(" ")[0] || user.email.split("@")[0];

  return (
    <AppShell>
      <div className="space-y-8">
        <PageHeader
          eyebrow={`Welcome back, ${firstName}`}
          title="Your Student Dashboard"
          description={`Semester ${
            user.profile?.semester || 3
          } • ${
            user.profile?.course ||
            "B.Tech Computer Science & Engineering"
          }`}
        />

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass-card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Streak
            </p>

            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-black text-rose-300">
                {user.studyStreak?.currentStreak || 0}
              </p>

              <span className="text-sm text-slate-500">days</span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Keep showing up every day.
            </p>
          </div>

          <div className="glass-card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              DSA Solved
            </p>

            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-black text-emerald-300">
                {user._count.dsaRecords}
              </p>

              <span className="text-sm text-slate-500">problems</span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Build your problem-solving streak.
            </p>
          </div>

          <div className="glass-card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Academic Score
            </p>

            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-black text-purple-300">
                {overallPercentage}%
              </p>

              <span className="text-sm text-slate-500">
                {seriesMarks.length} marks
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Based on your recorded series tests.
            </p>
          </div>

          <div className="glass-card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Timetable
            </p>

            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-black text-indigo-300">
                {user._count.timetable}
              </p>

              <span className="text-sm text-slate-500">classes</span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Your scheduled academic sessions.
            </p>
          </div>
        </section>

        <section className="glass-card overflow-hidden">
          <div className="border-b border-white/10 p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Academic Performance
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  Series Test Overview
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your performance based on the marks currently stored in KTU
                  Mate.
                </p>
              </div>

              <Link
                href="/analysis"
                className="text-sm font-semibold text-purple-300 transition hover:text-purple-200"
              >
                Open Analysis →
              </Link>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-slate-400">Overall</p>

              <p className="mt-2 text-4xl font-black text-white">
                {overallPercentage}%
              </p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-purple-400 transition-all"
                  style={{
                    width: `${Math.min(overallPercentage, 100)}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {totalScored.toFixed(0)} / {totalMaximum.toFixed(0)} marks
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-slate-400">Series Test 1</p>

              <p className="mt-2 text-4xl font-black text-white">
                {series1Percentage}%
              </p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all"
                  style={{
                    width: `${Math.min(series1Percentage, 100)}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {series1Scored.toFixed(0)} / {series1Maximum.toFixed(0)} marks
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-slate-400">Series Test 2</p>

              <p className="mt-2 text-4xl font-black text-white">
                {series2Percentage}%
              </p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{
                    width: `${Math.min(series2Percentage, 100)}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {series2Scored.toFixed(0)} / {series2Maximum.toFixed(0)} marks
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              KTU Mate
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Everything you need in one place
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_CARDS.map((card, index) => {
              const c = COLOR_MAP[card.color];

              return (
                <article
                  key={card.href}
                  className={`glass-card group p-6 transition-all duration-300 hover:-translate-y-1 ${c.border}`}
                  style={{
                    animationDelay: `${index * 60}ms`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xs font-black tracking-wide ${c.icon}`}
                      aria-hidden="true"
                    >
                      {card.icon}
                    </div>

                    <span className="text-slate-600 transition group-hover:text-slate-400">
                      →
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-white">
                    {card.label}
                  </h2>

                  <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-slate-400">
                    {card.desc}
                  </p>

                  <Link
                    href={card.href}
                    className={`mt-5 inline-flex items-center text-sm font-semibold transition ${c.text}`}
                  >
                    {card.linkLabel}

                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}