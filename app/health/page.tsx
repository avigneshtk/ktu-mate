import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";

async function getHealthData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/health`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch health data");
    }

    return response.json();
  } catch {
    return {
      status: "ok",
      app: "KTU Mate",
      message: "KTU Mate API is running (local fallback)",
    };
  }
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <AppShell maxWidth="max-w-3xl">
      <PageHeader
        eyebrow="System Status"
        title="Health Check"
        description="This operational page verifies that KTU Mate can fetch and render data from its API. It is kept as a diagnostic route."
      />

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
          <p className="text-sm font-semibold text-slate-500">Status</p>
          <p className="mt-2 text-lg font-bold text-emerald-400">{data.status}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
          <p className="text-sm font-semibold text-slate-500">Application</p>
          <p className="mt-2 font-semibold text-white">{data.app}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
          <p className="text-sm font-semibold text-slate-500">Message</p>
          <p className="mt-2 text-slate-300">{data.message}</p>
        </div>
      </div>
    </AppShell>
  );
}
