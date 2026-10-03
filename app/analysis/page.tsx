import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function AnalysisPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const seriesMarks = await prisma.seriesMark.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: [
      { subjectName: "asc" },
      { seriesTest: "asc" },
    ],
  });

  const totalScored = seriesMarks.reduce(
    (sum, mark) => sum + mark.marksScored,
    0
  );

  const totalMaximum = seriesMarks.reduce(
    (sum, mark) => sum + mark.maxMarks,
    0
  );

  const overallPercentage =
    totalMaximum > 0
      ? Math.round((totalScored / totalMaximum) * 100)
      : 0;

  const series1 = seriesMarks.filter(
    (mark) => mark.seriesTest === 1
  );

  const series2 = seriesMarks.filter(
    (mark) => mark.seriesTest === 2
  );

  const averageSeries1 =
    series1.length > 0
      ? Math.round(
          series1.reduce(
            (sum, mark) =>
              sum + (mark.marksScored / mark.maxMarks) * 100,
            0
          ) / series1.length
        )
      : 0;

  const averageSeries2 =
    series2.length > 0
      ? Math.round(
          series2.reduce(
            (sum, mark) =>
              sum + (mark.marksScored / mark.maxMarks) * 100,
            0
          ) / series2.length
        )
      : 0;

  const subjectMap = new Map<
    string,
    {
      subjectCode: string;
      subjectName: string;
      marks: typeof seriesMarks;
    }
  >();

  for (const mark of seriesMarks) {
    const existing = subjectMap.get(mark.subjectCode);

    if (existing) {
      existing.marks.push(mark);
    } else {
      subjectMap.set(mark.subjectCode, {
        subjectCode: mark.subjectCode,
        subjectName: mark.subjectName,
        marks: [mark],
      });
    }
  }

  const subjects = Array.from(subjectMap.values()).map((subject) => {
    const scored = subject.marks.reduce(
      (sum, mark) => sum + mark.marksScored,
      0
    );

    const maximum = subject.marks.reduce(
      (sum, mark) => sum + mark.maxMarks,
      0
    );

    const percentage =
      maximum > 0 ? Math.round((scored / maximum) * 100) : 0;

    return {
      ...subject,
      scored,
      maximum,
      percentage,
    };
  });

  const weakestSubject =
    subjects.length > 0
      ? [...subjects].sort(
          (a, b) => a.percentage - b.percentage
        )[0]
      : null;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Academic Insights"
        title="Series Test Analysis"
        description="Track your internal marks and identify subjects that need more revision."
      />

      {/* Series Test Navigation */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Series Test Marks
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Add or update your Series Test marks.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/series-test-1"
              className="rounded-xl bg-purple-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              + Series Test 1
            </a>

            <a
              href="/series-test-2"
              className="rounded-xl bg-cyan-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-cyan-500"
            >
              + Series Test 2
            </a>
          </div>
        </div>
      </div>

      {seriesMarks.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            tone="purple"
            title="No Series Marks Logged"
            description="Add your Series Test 1 or Series Test 2 scores to generate your academic analysis."
          >
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/series-test-1"
                className="inline-block rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500"
              >
                Add Series 1 Marks
              </a>

              <a
                href="/series-test-2"
                className="inline-block rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
              >
                Add Series 2 Marks
              </a>
            </div>
          </EmptyState>
        </div>
      ) : (
        <>
          {/* Overall Summary */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-400">
                Overall Percentage
              </p>

              <p className="mt-2 text-3xl font-black text-purple-400">
                {overallPercentage}%
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-400">
                Subjects
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {subjects.length}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-400">
                Series 1 Average
              </p>

              <p className="mt-2 text-3xl font-black text-cyan-400">
                {averageSeries1}%
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-400">
                Series 2 Average
              </p>

              <p className="mt-2 text-3xl font-black text-emerald-400">
                {averageSeries2}%
              </p>
            </div>
          </div>

          {/* Subject Analysis */}
          <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
            <h3 className="mb-6 text-xl font-bold text-white">
              Subject Analysis
            </h3>

            <div className="space-y-4">
              {subjects.map((subject) => (
                <div
                  key={subject.subjectCode}
                  className="rounded-lg border border-white/5 bg-[#090d16] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-200">
                        {subject.subjectName}
                      </p>

                      <p className="text-xs text-slate-400">
                        {subject.subjectCode}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-black text-purple-400">
                        {subject.percentage}%
                      </p>

                      <p className="text-xs text-slate-500">
                        {subject.scored}/{subject.maximum}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-purple-500"
                      style={{
                        width: `${Math.min(subject.percentage, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Marks */}
          <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
            <h3 className="mb-6 text-xl font-bold text-white">
              Recent Marks
            </h3>

            <div className="space-y-4">
              {seriesMarks
                .slice()
                .reverse()
                .map((mark) => (
                  <div
                    key={mark.id}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-[#090d16] p-4"
                  >
                    <div>
                      <p className="font-bold text-slate-200">
                        {mark.subjectName}
                      </p>

                      <p className="text-xs text-slate-400">
                        {mark.subjectCode} · Series Test{" "}
                        {mark.seriesTest}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-black text-purple-400">
                        {mark.marksScored}
                        <span className="text-sm font-medium text-slate-500">
                          {" "}
                          / {mark.maxMarks}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Avigu Diagnostics */}
          <div className="mt-8 rounded-xl border border-purple-500/30 bg-purple-950/20 p-6 backdrop-blur-md">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-500/40 bg-purple-600/30 text-lg">
                🤖
              </span>

              <h3 className="text-lg font-bold text-white">
                Avigu Diagnostics
              </h3>
            </div>

            {weakestSubject ? (
              <p className="text-sm leading-relaxed text-slate-300">
                Your current lowest-scoring subject is{" "}
                <span className="font-bold text-purple-300">
                  {weakestSubject.subjectName}
                </span>{" "}
                with {weakestSubject.percentage}%. Consider giving
                this subject additional revision time before your
                university exams.
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-slate-300">
                Add marks for your subjects to generate your
                analysis.
              </p>
            )}
          </div>
        </>
      )}
    </AppShell>
  );
}