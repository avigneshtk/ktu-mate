import Navbar from "@/components/Navbar";

interface AppShellProps {
  children: React.ReactNode;
  /** Optional max-width constraint for the content area (default: max-w-7xl) */
  maxWidth?: string;
  /** Extra classes for the inner content wrapper */
  contentClassName?: string;
}

/**
 * Unified dark-theme application shell used by every inner product page.
 * Renders the global Navbar above a dark-themed content area.
 */
export default function AppShell({
  children,
  maxWidth = "max-w-7xl",
  contentClassName = "",
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar />
      <main
        id="main-content"
        className={`page-enter mx-auto ${maxWidth} px-4 py-8 sm:px-6 sm:py-10 ${contentClassName}`}
      >
        {children}
      </main>
    </div>
  );
}
