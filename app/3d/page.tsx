import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StudySceneLoader from "./StudySceneLoader";

export default function ThreeDPage() {
  return (
    <AppShell maxWidth="max-w-6xl">
      <PageHeader
        align="center"
        eyebrow="KTU Mate"
        title="Interactive 3D Study Desk"
        description="Explore a small interactive 3D study environment built with React Three Fiber. A 2D fallback is used when reduced motion or a low-power device is detected."
      />

      <div className="mt-8">
        <StudySceneLoader />
      </div>

      <p className="mt-4 text-center text-sm text-slate-500">
        Drag to rotate · Scroll to zoom · Touch supported · Click the book to
        change its color
      </p>
    </AppShell>
  );
}
