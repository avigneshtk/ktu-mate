import type { ReactNode } from "react";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "section" | "article";
};

export default function Surface({
  children,
  className = "",
  hover = true,
  as: Tag = "div",
}: SurfaceProps) {
  return (
    <Tag
      className={`${hover ? "glass-card" : "glass-panel rounded-2xl"} p-6 ${className}`}
    >
      {children}
    </Tag>
  );
}
