"use client";

import { FormEvent, useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import Surface from "@/components/Surface";
import { dsaProblems } from "@/lib/dsa/problems";

type DsaRecord = {
  id: string;
  problemId: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  platform: string;
  solvedAt: string;
};

const topics = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Stacks",
  "Graphs",
  "Searching",
  "Sorting",
  "Trees",
  "Dynamic Programming",
  "Recursion",
];

const topicStyles: Record<
  string,
  {
    icon: string;
    iconBg: string;
    iconText: string;
    border: string;
    hoverBorder: string;
    progress: string;
  }
> = {
  Arrays: {
    icon: "A",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-400",
    border: "border-blue-500/10",
    hoverBorder: "hover:border-blue-500/30",
    progress: "bg-blue-400",
  },
  Strings: {
    icon: "S",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-400",
    border: "border-violet-500/10",
    hoverBorder: "hover:border-violet-500/30",
    progress: "bg-violet-400",
  },
  "Linked Lists": {
    icon: "L",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-400",
    border: "border-emerald-500/10",
    hoverBorder: "hover:border-emerald-500/30",
    progress: "bg-emerald-400",
  },
  Stacks: {
    icon: "ST",
    iconBg: "bg-orange-500/10",
    iconText: "text-orange-400",
    border: "border-orange-500/10",
    hoverBorder: "hover:border-orange-500/30",
    progress: "bg-orange-400",
  },
  Graphs: {
    icon: "G",
    iconBg: "bg-red-500/10",
    iconText: "text-red-400",
    border: "border-red-500/10",
    hoverBorder: "hover:border-red-500/30",
    progress: "bg-red-400",
  },
  Searching: {
    icon: "Q",
    iconBg: "bg-cyan-500/10",
    iconText: "text-cyan-400",
    border: "border-cyan-500/10",
    hoverBorder: "hover:border-cyan-500/30",
    progress: "bg-cyan-400",
  },
  Sorting: {
    icon: "↕",
    iconBg: "bg-yellow-500/10",
    iconText: "text-yellow-400",
    border: "border-yellow-500/10",
    hoverBorder: "hover:border-yellow-500/30",
    progress: "bg-yellow-400",
  },
  Trees: {
    icon: "T",
    iconBg: "bg-pink-500/10",
    iconText: "text-pink-400",
    border: "border-pink-500/10",
    hoverBorder: "hover:border-pink-500/30",
    progress: "bg-pink-400",
  },
  "Dynamic Programming": {
    icon: "DP",
    iconBg: "bg-fuchsia-500/10",
    iconText: "text-fuchsia-400",
    border: "border-fuchsia-500/10",
    hoverBorder: "hover:border-fuchsia-500/30",
    progress: "bg-fuchsia-400",
  },
  Recursion: {
    icon: "R",
    iconBg: "bg-indigo-500/10",
    iconText: "text-indigo-400",
    border: "border-indigo-500/10",
    hoverBorder: "hover:border-indigo-500/30",
    progress: "bg-indigo-400",
  },
};

const difficultyClass: Record<string, string> = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-red-400",
};

export default function DsaPage() {
  const [records, setRecords] = useState<DsaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const [problemId, setProblemId] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState<
    "Easy" | "Medium" | "Hard"
  >("Easy");
  const [platform, setPlatform] = useState("LeetCode");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadRecords() {
    try {
      setLoading(true);

      const response = await fetch("/api/dsa");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load DSA records");
      }

      setRecords(data.records || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load DSA records"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  function handlePractice(
    problem: (typeof dsaProblems)[number]
  ) {
    setProblemId(problem.id);
    setTitle(problem.title);
    setTopic(problem.topic);
    setDifficulty(problem.difficulty);
    setPlatform(problem.platform);
    setMessage("");
    setError("");

    window.open(
      problem.url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/dsa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId,
          title,
          difficulty,
          topic,
          platform,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save problem"
        );
      }

      setMessage(
        "Problem marked as solved successfully."
      );

      setProblemId("");
      setTitle("");
      setTopic("Arrays");
      setDifficulty("Easy");
      setPlatform("LeetCode");

      await loadRecords();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save problem"
      );
    } finally {
      setSaving(false);
    }
  }

  const totalSolved = records.length;

  const easySolved = records.filter(
    (record) => record.difficulty === "Easy"
  ).length;

  const mediumSolved = records.filter(
    (record) => record.difficulty === "Medium"
  ).length;

  const hardSolved = records.filter(
    (record) => record.difficulty === "Hard"
  ).length;

  const visibleProblems = selectedTopic
    ? dsaProblems.filter(
        (problem) => problem.topic === selectedTopic
      )
    : [];

  const topicStats = topics.map((topicName) => {
    const total = dsaProblems.filter(
      (problem) => problem.topic === topicName
    ).length;

    const solved = records.filter(
      (record) => record.topic === topicName
    ).length;

    return {
      name: topicName,
      total,
      solved,
    };
  });

  return (
    <AppShell>
      <PageHeader
        title="Data Structures & Algorithms"
        description="Track your solved problems and topic mastery."
      />

      {/* Progress Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Surface>
          <p className="text-sm text-white/50">
            Total Solved
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {totalSolved}
          </p>
        </Surface>

        <Surface>
          <p className="text-sm text-white/50">Easy</p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {easySolved}
          </p>
        </Surface>

        <Surface>
          <p className="text-sm text-white/50">Medium</p>

          <p className="mt-2 text-3xl font-bold text-amber-400">
            {mediumSolved}
          </p>
        </Surface>

        <Surface>
          <p className="text-sm text-white/50">Hard</p>

          <p className="mt-2 text-3xl font-bold text-red-400">
            {hardSolved}
          </p>
        </Surface>
      </div>

      {/* Topic Section */}
      <Surface
        className="mt-6"
        hover={false}
      >
        <div>
          <p className="text-sm font-medium text-white/40">
            Practice
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            DSA Problem Practice
          </h2>

          <p className="mt-2 text-sm text-white/50">
            Choose a topic and build your problem-solving
            skills.
          </p>
        </div>

        {/* Topic Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topicStats.map((item) => {
            const active =
              selectedTopic === item.name;

            const percentage =
              item.total > 0
                ? Math.round(
                    (item.solved / item.total) * 100
                  )
                : 0;

            const style =
              topicStyles[item.name];

            return (
              <button
                key={item.name}
                type="button"
                onClick={() =>
                  setSelectedTopic(
                    active ? null : item.name
                  )
                }
                className={`group relative overflow-hidden rounded-2xl border bg-white/[0.025] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] ${style.border} ${style.hoverBorder} ${
                  active
                    ? "ring-1 ring-white/20 bg-white/[0.07]"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold ${style.iconBg} ${style.iconText}`}
                  >
                    {style.icon}
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {item.solved}/{item.total}
                    </p>

                    <p className="mt-0.5 text-[11px] text-white/35">
                      solved
                    </p>
                  </div>
                </div>

                <h3 className="mt-5 text-base font-semibold text-white">
                  {item.name}
                </h3>

                <p className="mt-1 text-xs text-white/40">
                  {item.total === 1
                    ? "1 problem available"
                    : `${item.total} problems available`}
                </p>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${style.progress}`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-white/35">
                    Progress
                  </span>

                  <span className="text-[11px] font-medium text-white/50">
                    {percentage}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Surface>

      {/* Selected Topic */}
      {selectedTopic && (
        <Surface
          className="mt-6"
          hover={false}
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/30">
                Selected Topic
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                {selectedTopic}
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedTopic(null)
              }
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              Back to Topics
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {visibleProblems.map((problem) => {
              const solved = records.some(
                (record) =>
                  record.problemId === problem.id
              );

              return (
                <div
                  key={problem.id}
                  className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:border-white/15 hover:bg-white/[0.045] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-white">
                      {problem.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs">
                      <span
                        className={
                          difficultyClass[
                            problem.difficulty
                          ]
                        }
                      >
                        {problem.difficulty}
                      </span>

                      <span className="text-white/35">
                        {problem.platform}
                      </span>

                      <span className="text-white/35">
                        {problem.topic}
                      </span>
                    </div>
                  </div>

                  {solved ? (
                    <span className="w-fit rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                      ✓ Solved
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handlePractice(problem)
                      }
                      className="w-fit rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                    >
                      Practice ↗
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Surface>
      )}

      {/* Empty State */}
      {!selectedTopic && (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 px-6 py-10 text-center">
          <p className="text-sm text-white/40">
            Select a topic above to view its practice
            problems.
          </p>
        </div>
      )}

      {/* Mark as Solved */}
      <Surface
        className="mt-6"
        hover={false}
      >
        <div>
          <p className="text-xs uppercase tracking-wider text-white/30">
            Progress Tracking
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Mark a Problem as Solved
          </h2>

          <p className="mt-2 text-sm text-white/50">
            Practice a problem and save it to your DSA
            progress.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <div>
            <label className="text-sm text-white/60">
              Problem ID
            </label>

            <input
              value={problemId}
              onChange={(event) =>
                setProblemId(event.target.value)
              }
              placeholder="Example: two-sum"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-white/30 focus:bg-white/[0.06]"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">
              Problem Title
            </label>

            <input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Example: Two Sum"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-white/30 focus:bg-white/[0.06]"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">
              Topic
            </label>

            <select
              value={topic}
              onChange={(event) =>
                setTopic(event.target.value)
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            >
              {topics.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-white/60">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(event) =>
                setDifficulty(
                  event.target.value as
                    | "Easy"
                    | "Medium"
                    | "Hard"
                )
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            >
              <option value="Easy">
                Easy
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Hard">
                Hard
              </option>
            </select>
          </div>

          <div>
            <label className="text-sm text-white/60">
              Platform
            </label>

            <input
              value={platform}
              onChange={(event) =>
                setPlatform(event.target.value)
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-white/30"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Mark as Solved"}
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-sm text-emerald-400">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}
      </Surface>

      {/* Solved Problems */}
      <Surface
        className="mt-6"
        hover={false}
      >
        <div>
          <p className="text-xs uppercase tracking-wider text-white/30">
            Your Progress
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Solved Problems
          </h2>
        </div>

        {loading ? (
          <p className="mt-6 text-sm text-white/40">
            Loading solved problems...
          </p>
        ) : records.length === 0 ? (
          <p className="mt-6 text-sm text-white/40">
            No problems solved yet.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="px-3 py-3 font-medium">
                    Problem
                  </th>

                  <th className="px-3 py-3 font-medium">
                    Topic
                  </th>

                  <th className="px-3 py-3 font-medium">
                    Difficulty
                  </th>

                  <th className="px-3 py-3 font-medium">
                    Platform
                  </th>

                  <th className="px-3 py-3 font-medium">
                    Solved At
                  </th>
                </tr>
              </thead>

              <tbody>
                {records.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-white/5 text-white/80"
                  >
                    <td className="px-3 py-3">
                      {record.title}
                    </td>

                    <td className="px-3 py-3">
                      {record.topic}
                    </td>

                    <td
                      className={`px-3 py-3 ${
                        difficultyClass[
                          record.difficulty
                        ]
                      }`}
                    >
                      {record.difficulty}
                    </td>

                    <td className="px-3 py-3">
                      {record.platform}
                    </td>

                    <td className="px-3 py-3">
                      {new Date(
                        record.solvedAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Surface>
    </AppShell>
  );
}