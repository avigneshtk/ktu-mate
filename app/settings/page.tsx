import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import SettingsSecurity from "@/components/SettingsSecurity";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getSession();

  if (!session) redirect("/login");

  return (
    <AppShell maxWidth="max-w-4xl">
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Manage your account preferences and application settings."
      />

      <div className="mt-8 space-y-8">
        {/* Appearance Settings */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-lg font-bold text-white">Appearance</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-200">Theme</p>
                <p className="text-xs text-slate-400">
                  KTU Mate is currently dark-theme exclusively for reduced eye
                  strain during late night study sessions.
                </p>
              </div>

              <div className="rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                Dark Only
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div>
                <p className="font-medium text-slate-200">Reduced Motion</p>
                <p className="text-xs text-slate-400">
                  Animations respect your system settings by default.
                </p>
              </div>

              <div className="rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                System Default
              </div>
            </div>
          </div>
        </section>

        {/* Account Security */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-lg font-bold text-white">
            Account Security
          </h2>

          <SettingsSecurity />
        </section>
      </div>
    </AppShell>
  );
}