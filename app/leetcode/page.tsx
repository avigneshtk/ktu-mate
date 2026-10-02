import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function LeetCodePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // Since we don't have a reliable LeetCode scraping DB model yet, we'll show an empty state placeholder
  // that aligns with the requirement "Never fabricate LeetCode statistics."
  return (
    <AppShell>
      <PageHeader
        eyebrow="External Integration"
        title="LeetCode Progress"
        description="Connect your LeetCode account to track your interview prep alongside KTU academics."
      />

      <EmptyState
        tone="amber"
        title="No LeetCode Account Connected"
        description="We currently don't have a LeetCode username linked to your profile."
      >
        <button className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500">
          Connect Account
        </button>
      </EmptyState>

      <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md opacity-50 pointer-events-none grayscale">
        <h3 className="text-lg font-bold text-white mb-4">Account Snapshot (Preview)</h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs text-slate-400 font-bold uppercase">Total Solved</p>
            <p className="mt-1 text-2xl font-black text-white">---</p>
          </div>
          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs text-emerald-500 font-bold uppercase">Easy</p>
            <p className="mt-1 text-2xl font-black text-white">---</p>
          </div>
          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs text-amber-500 font-bold uppercase">Medium</p>
            <p className="mt-1 text-2xl font-black text-white">---</p>
          </div>
          <div className="rounded-lg border border-white/5 bg-[#090d16] p-4 text-center">
            <p className="text-xs text-rose-500 font-bold uppercase">Hard</p>
            <p className="mt-1 text-2xl font-black text-white">---</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
