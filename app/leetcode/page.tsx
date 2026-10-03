import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import LeetCodeConnect from "@/components/LeetCodeConnect";
import LeetCodeStats from "@/components/LeetCodeStats";
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
        <LeetCodeConnect
          initialUsername={user?.leetcodeUsername ?? null}
        />
      </div>

      <div className="mt-8">
        <LeetCodeStats />
      </div>
    </AppShell>
  );
}