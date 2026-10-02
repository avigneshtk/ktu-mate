"use client";

type DsaProgressResultProps = {
  totalProblems: number;
  solvedProblems: number;
  easy: number;
  medium: number;
  hard: number;
  percentage: number;
};

export default function DsaProgressResult({
  totalProblems,
  solvedProblems,
  easy,
  medium,
  hard,
  percentage,
}: DsaProgressResultProps) {
  return (
    <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
      <h3 className="font-bold text-white">DSA Progress</h3>

      <p className="mt-2 text-sm text-slate-300">
        {solvedProblems} of {totalProblems} problems solved
      </p>

      <div
        role="progressbar"
        aria-label="DSA progress"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm font-semibold text-white">
        {percentage}% complete
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-lg border border-green-500/20 bg-green-950/20 p-2">
          <p className="font-bold text-green-300">{easy}</p>
          <p className="text-xs text-slate-400">Easy</p>
        </div>

        <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-2">
          <p className="font-bold text-amber-300">{medium}</p>
          <p className="text-xs text-slate-400">Medium</p>
        </div>

        <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-2">
          <p className="font-bold text-red-300">{hard}</p>
          <p className="text-xs text-slate-400">Hard</p>
        </div>
      </div>
    </div>
  );
}