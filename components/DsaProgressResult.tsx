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
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <h3 className="font-bold text-gray-900">
        DSA Progress
      </h3>

      <p className="mt-2 text-sm text-gray-700">
        {solvedProblems} of {totalProblems} problems solved
      </p>

      <div
        role="progressbar"
        aria-label="DSA progress"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200"
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm font-semibold text-gray-900">
        {percentage}% complete
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-lg bg-white p-2">
          <p className="font-bold text-gray-900">{easy}</p>
          <p className="text-gray-600">Easy</p>
        </div>

        <div className="rounded-lg bg-white p-2">
          <p className="font-bold text-gray-900">{medium}</p>
          <p className="text-gray-600">Medium</p>
        </div>

        <div className="rounded-lg bg-white p-2">
          <p className="font-bold text-gray-900">{hard}</p>
          <p className="text-gray-600">Hard</p>
        </div>
      </div>
    </div>
  );
}