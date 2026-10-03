import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import LeetCodeConnect from "@/components/LeetCodeConnect";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function LeetCodePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      leetcodeUsername: true,
    },
  });

  return (
    <AppShell>
      <PageHeader
        eyebrow="External Integration"
        title="LeetCode Progress"
        description="Connect your LeetCode account to track your interview prep alongside KTU academics."
      />

      <div className="mt-8">
        <LeetCodeConnect initialUsername={user?.leetcodeUsername ?? null} />
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
        <h3 className="mb-4 text-lg font-bold text-white">
          Account Snapshot
        </h3>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs font-bold uppercase text-slate-400">
              Total Solved
            </p>
            <p className="mt-1 text-2xl font-black text-white">---</p>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs font-bold uppercase text-emerald-500">
              Easy
            </p>
            <p className="mt-1 text-2xl font-black text-white">---</p>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs font-bold uppercase text-amber-500">
              Medium
            </p>
            <p className="mt-1 text-2xl font-black text-white">---</p>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs font-bold uppercase text-rose-500">
              Hard
            </p>
            <p className="mt-1 text-2xl font-black text-white">---</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          LeetCode statistics will appear here once a reliable data source is
          connected.
        </p>
      </div>
    </AppShell>
  );
}