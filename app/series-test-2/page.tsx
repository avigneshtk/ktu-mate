"use client";

import { FormEvent, useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";

type SeriesMark = {
  id: string;
  subjectCode: string;
  subjectName: string;
  marksScored: number;
  maxMarks: number;
  createdAt: string;
};

export default function SeriesTest2Page() {
  const [marks, setMarks] = useState<SeriesMark[]>([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [marksScored, setMarksScored] = useState("");
  const [maxMarks, setMaxMarks] = useState("50");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadMarks() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/series-marks?test=2");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load marks");
      }

      setMarks(data.marks);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load marks"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMarks();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const response = await fetch("/api/series-marks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seriesTest: 2,
          subjectCode,
          subjectName,
          marksScored: Number(marksScored),
          maxMarks: Number(maxMarks),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save marks");
      }

      setMarks((current) => [data.mark, ...current]);

      setSubjectCode("");
      setSubjectName("");
      setMarksScored("");

      setSuccess("Marks saved successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save marks"
      );
    } finally {
      setSaving(false);
    }
  }

  const totalScored = marks.reduce(
    (total, mark) => total + mark.marksScored,
    0
  );

  const totalMaximum = marks.reduce(
    (total, mark) => total + mark.maxMarks,
    0
  );

  const percentage =
    totalMaximum > 0
      ? Math.round((totalScored / totalMaximum) * 100)
      : 0;

  return (
    <AppShell maxWidth="max-w-5xl">
      <PageHeader
        eyebrow="Academic Performance"
        title="Series Test 2"
        description="Enter your Series Test 2 marks and track your performance."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <h2 className="text-xl font-bold text-white">
            Add Marks
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Save your subject-wise Series Test 2 marks.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="subjectCode"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Subject Code
              </label>

              <input
                id="subjectCode"
                value={subjectCode}
                onChange={(event) => setSubjectCode(event.target.value)}
                placeholder="Example: PCCST301"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="subjectName"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Subject Name
              </label>

              <input
                id="subjectName"
                value={subjectName}
                onChange={(event) => setSubjectName(event.target.value)}
                placeholder="Example: Data Structures"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="marksScored"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Marks Scored
                </label>

                <input
                  id="marksScored"
                  type="number"
                  min="0"
                  step="0.5"
                  value={marksScored}
                  onChange={(event) =>
                    setMarksScored(event.target.value)
                  }
                  placeholder="42"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="maxMarks"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Maximum Marks
                </label>

                <input
                  id="maxMarks"
                  type="number"
                  min="1"
                  step="0.5"
                  value={maxMarks}
                  onChange={(event) =>
                    setMaxMarks(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:from-purple-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Add Marks"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">
                Your Marks
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Series Test 2 performance
              </p>
            </div>

            <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-right">
              <p className="text-2xl font-black text-purple-300">
                {percentage}%
              </p>
              <p className="text-xs text-slate-400">Overall</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-slate-400">Subjects</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {marks.length}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-slate-400">Total</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {totalScored}/{totalMaximum}
              </p>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center text-sm text-slate-400">
                Loading marks...
              </div>
            ) : marks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
                <p className="font-semibold text-white">
                  No marks added yet
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Add your first subject using the form.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {marks.map((mark) => {
                  const markPercentage =
                    mark.maxMarks > 0
                      ? Math.round(
                          (mark.marksScored / mark.maxMarks) * 100
                        )
                      : 0;

                  return (
                    <div
                      key={mark.id}
                      className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-white">
                          {mark.subjectName}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {mark.subjectCode}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-white">
                          {mark.marksScored}/{mark.maxMarks}
                        </p>

                        <p className="text-xs text-purple-300">
                          {markPercentage}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}