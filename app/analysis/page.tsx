import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function AnalysisPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const seriesMarks = await prisma.seriesMark.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppShell>
      <PageHeader
        eyebrow="Academic Insights"
        title="Series Test Analysis"
        description="Track your internal marks and identify weak modules."
      />

      {seriesMarks.length === 0 ? (
        <EmptyState
          tone="purple"
          title="No Series Marks Logged"
          description="Log your Series Test 1 and 2 scores to generate predictive analysis for your university exams."
        >
          <button className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500">
            Log New Marks
          </button>
        </EmptyState>
      ) : (
        <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
           <h3 className="text-xl font-bold text-white mb-6">Recent Marks</h3>
           <div className="space-y-4">
             {seriesMarks.map((mark) => (
               <div key={mark.id} className="flex justify-between items-center bg-[#090d16] p-4 rounded-lg border border-white/5">
                 <div>
                   <p className="font-bold text-slate-200">{mark.subjectName}</p>
                   <p className="text-xs text-slate-400">Series Test {mark.seriesTest}</p>
                 </div>
                 <div className="text-right">
                   <p className="font-black text-purple-400 text-xl">{mark.marksScored} <span className="text-sm font-medium text-slate-500">/ {mark.maxMarks}</span></p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-purple-500/30 bg-purple-950/20 p-6 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/30 border border-purple-500/40 text-lg">🤖</span>
          <h3 className="text-lg font-bold text-white">Avigu Diagnostics</h3>
        </div>
        {seriesMarks.length > 0 ? (
          <p className="text-sm text-slate-300 leading-relaxed">
            Based on your scores, you should focus on the modules covered in Series Test where your scores dropped. Ask me in the Chat for a specific topic breakdown!
          </p>
        ) : (
          <p className="text-sm text-slate-300 leading-relaxed">
            I need some data first! Enter your Series marks above and I&apos;ll tell you which modules you need to revise for the final KTU exams.
          </p>
        )}
      </div>
    </AppShell>
  );
}
