import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  children?: ReactNode;
  tone?: "purple" | "cyan" | "amber" | "emerald" | "indigo";
};

const TONE: Record<
  NonNullable<EmptyStateProps["tone"]>,
  string
> = {
  purple: "border-purple-500/30 bg-purple-950/10",
  cyan: "border-cyan-500/30 bg-cyan-950/10",
  amber: "border-amber-500/30 bg-amber-950/10",
  emerald: "border-emerald-500/30 bg-emerald-950/10",
  indigo: "border-indigo-500/30 bg-indigo-950/10",
};

export default function EmptyState({
  title,
  description,
  icon,
  children,
  tone = "purple",
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border border-dashed p-8 text-center ${TONE[tone]}`}
    >
      {icon ? (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl" aria-hidden="true">
          {icon}
        </div>
      ) : null}

      <h2 className="text-xl font-bold text-white">{title}</h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
        {description}
      </p>

      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
