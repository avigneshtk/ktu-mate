import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

const FEATURE_CARDS = [
  {
    href: "/analysis",
    emoji: "📝",
    color: "purple",
    label: "Series Tests",
    desc: "Track Series Test 1 and 2 marks and get targeted revision recommendations.",
    linkLabel: "View Analysis",
  },
  {
    href: "/avigu",
    emoji: "🤖",
    color: "cyan",
    label: "Avigu AI",
    desc: "Get personalised academic analysis and exam preparation guidance.",
    linkLabel: "Chat with Avigu",
  },
  {
    href: "/timetable",
    emoji: "📅",
    color: "indigo",
    label: "Study Plan",
    desc: "Create personalised study timetables based on your syllabus and progress.",
    linkLabel: "Build Schedule",
  },
  {
    href: "/dsa",
    emoji: "💻",
    color: "emerald",
    label: "DSA Practice",
    desc: "Practice data structures and algorithms topic by topic.",
    linkLabel: "Practice DSA",
  },
  {
    href: "/leetcode",
    emoji: "⚡",
    color: "amber",
    label: "LeetCode",
    desc: "Track your coding practice and set milestones for placements.",
    linkLabel: "Track LeetCode",
  },
  {
    href: "/streak",
    emoji: "🔥",
    color: "rose",
    label: "Daily Streak",
    desc: "Stay consistent and build daily study habits that prevent last-minute cramming.",
    linkLabel: "Check Streak",
  },
] as const;

const COLOR_MAP: Record<string, { icon: string; link: string }> = {
  purple: {
    icon: "bg-purple-500/20 border-purple-500/30",
    link: "text-purple-400 hover:text-purple-300",
  },
  cyan: {
    icon: "bg-cyan-500/20 border-cyan-500/30",
    link: "text-cyan-400 hover:text-cyan-300",
  },
  indigo: {
    icon: "bg-indigo-500/20 border-indigo-500/30",
    link: "text-indigo-400 hover:text-indigo-300",
  },
  emerald: {
    icon: "bg-emerald-500/20 border-emerald-500/30",
    link: "text-emerald-400 hover:text-emerald-300",
  },
  amber: {
    icon: "bg-amber-500/20 border-amber-500/30",
    link: "text-amber-400 hover:text-amber-300",
  },
  rose: {
    icon: "bg-rose-500/20 border-rose-500/30",
    link: "text-rose-400 hover:text-rose-300",
  },
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      profile: true,
      studyStreak: true,
      _count: {
        select: { dsaRecords: true, timetable: true },
      },
    },
  });

  if (!user) redirect("/login");

  return (
    <AppShell>
      <PageHeader
        eyebrow={`Welcome back, ${user.profile?.fullName || user.email}`}
        title="Your Student Dashboard"
        description={`Semester ${user.profile?.semester || 3} • ${user.profile?.course}`}
      />

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Streak</p>
          <p className="mt-2 text-3xl font-black text-rose-400">{user.studyStreak?.currentStreak || 0} Days</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">DSA Solved</p>
          <p className="mt-2 text-3xl font-black text-emerald-400">{user._count.dsaRecords}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Upcoming Tasks</p>
          <p className="mt-2 text-3xl font-black text-indigo-400">{user._count.timetable}</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_CARDS.map((card, index) => {
          const c = COLOR_MAP[card.color];
          return (
            <article
              key={card.href}
              className="glass-card card-enter p-6"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${c.icon}`}
                aria-hidden="true"
              >
                {card.emoji}
              </div>
              <h2 className="mt-5 text-xl font-bold text-white">
                {card.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {card.desc}
              </p>
              <Link
                href={card.href}
                className={`mt-4 inline-block text-xs font-semibold transition ${c.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500`}
              >
                {card.linkLabel} →
              </Link>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}
