import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import AviguChat from "@/components/AviguChat";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AviguPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <AppShell maxWidth="max-w-5xl">
      <PageHeader
        align="center"
        eyebrow="AI Academic Agent"
        title={
          <>
            Meet <span className="gradient-text font-black">Avigu</span> 🤖
          </>
        }
        description="Avigu analyses your academic questions and helps you decide what to study, where to improve, and how to prepare for KTU examinations."
      />

      <div className="mt-10">
        <AviguChat />
      </div>
    </AppShell>
  );
}