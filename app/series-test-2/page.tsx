import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

export default function SeriesTest2Page() {
  return (
    <AppShell maxWidth="max-w-5xl">
      <PageHeader
        eyebrow="Academic Performance"
        title="Series Test 2"
        description="This existing workspace will later accept subjects, marks, questions, and answers for calculated analysis."
      />

      <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/40 p-8">
        <EmptyState
          title="Series Test 2 input"
          description="Mark entry is not wired yet. The route is preserved so Analysis can grow from this existing page instead of replacing it."
        />
      </div>
    </AppShell>
  );
}
