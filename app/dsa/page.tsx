import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function DsaPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const records = await prisma.dsaSubmission.findMany({
    where: { userId: session.userId },
    orderBy: { solvedAt: "desc" },
  });

  const total = records.length;
  const easy = records.filter((r) => r.difficulty === "Easy").length;
  const medium = records.filter((r) => r.difficulty === "Medium").length;
  const hard = records.filter((r) => r.difficulty === "Hard").length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Data Structures & Algorithms"
        title="DSA Progression"
        description="Track your solved problems and topic mastery."
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-4 mb-8">
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Solved</p>
          <p className="mt-2 text-3xl font-black text-white">{total}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Easy</p>
          <p className="mt-2 text-3xl font-black text-emerald-400">{easy}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Medium</p>
          <p className="mt-2 text-3xl font-black text-amber-400">{medium}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Hard</p>
          <p className="mt-2 text-3xl font-black text-rose-400">{hard}</p>
        </div>
      </div>

      {records.length === 0 ? (
        <EmptyState
          tone="emerald"
          title="No DSA records found"
          description="You haven't logged any solved problems yet."
        >
          <button className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
            Log First Problem
          </button>
        </EmptyState>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#090d16] text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Problem</th>
                <th className="px-6 py-4 font-medium">Topic</th>
                <th className="px-6 py-4 font-medium">Difficulty</th>
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Solved At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-medium text-white">{r.title}</td>
                  <td className="px-6 py-4">{r.topic}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        r.difficulty === "Easy"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : r.difficulty === "Medium"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {r.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">{r.platform}</td>
                  <td className="px-6 py-4">{new Date(r.solvedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  );
}
