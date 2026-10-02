import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  actions?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
}: PageHeaderProps) {
  return (
    <header
      className={align === "center" ? "text-center" : undefined}
    >
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
          {eyebrow}
        </p>
      ) : null}

      <h1
        className={`mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl ${
          eyebrow ? "" : "mt-0"
        }`}
      >
        {title}
      </h1>

      {description ? (
        <p
          className={`mt-2 text-slate-400 ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      ) : null}

      {actions ? <div className="mt-6">{actions}</div> : null}
    </header>
  );
}
