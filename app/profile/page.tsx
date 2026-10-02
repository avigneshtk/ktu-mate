import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
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

  if (!user || !user.profile) redirect("/login");

  const profile = user.profile;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Account Settings"
        title="Student Profile"
        description="Manage your personal information and academic details."
      />

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-3xl font-bold text-white shadow-lg">
              {profile.fullName.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">{profile.fullName}</h2>
            <p className="text-sm text-cyan-400">@{profile.username}</p>
            
            <div className="mt-6 w-full space-y-3 rounded-xl bg-[#090d16] p-4 text-left">
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-sm font-medium text-slate-200">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Joined</p>
                <p className="text-sm font-medium text-slate-200">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white">Academic Information</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-400">College</p>
                <p className="text-sm font-medium text-slate-200">{profile.college}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Course</p>
                <p className="text-sm font-medium text-slate-200">{profile.course}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Semester</p>
                <p className="text-sm font-medium text-slate-200">Semester {profile.semester}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Academic Year</p>
                <p className="text-sm font-medium text-slate-200">{profile.academicYear}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white">Bio</h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {profile.bio || "No bio provided."}
            </p>
          </div>
          
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white">Account Actions</h3>
            <div className="mt-4 flex gap-4">
               <form action="/api/auth/logout" method="POST">
                 <button
                   type="submit"
                   className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition"
                 >
                   Log Out
                 </button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
