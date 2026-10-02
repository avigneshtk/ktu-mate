import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
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
          <h2 className="text-lg font-bold text-white mb-4">Appearance</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-200">Theme</p>
                <p className="text-xs text-slate-400">KTU Mate is currently dark-theme exclusively for reduced eye strain during late night study sessions.</p>
              </div>
              <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs text-slate-300">
                Dark Only
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div>
                <p className="font-medium text-slate-200">Reduced Motion</p>
                <p className="text-xs text-slate-400">Animations respect your system settings by default.</p>
              </div>
              <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs text-slate-300">
                System Default
              </div>
            </div>
          </div>
        </section>

        {/* Account Settings */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
          <h2 className="text-lg font-bold text-white mb-4">Account Security</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-200">Change Password</p>
                <p className="text-xs text-slate-400">Update your account password securely.</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold text-white hover:bg-white/10 transition">
                Update
              </button>
            </div>
          </div>
        </section>
        
        {/* Danger Zone */}
        <section className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6 backdrop-blur-md">
          <h2 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-200">Delete Account</p>
              <p className="text-xs text-slate-400">Permanently delete your data, DSA progress, and streak.</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-sm font-semibold text-red-400 hover:bg-red-500/30 transition">
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
