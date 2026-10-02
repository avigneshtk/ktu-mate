import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import PlaygroundLab from "./PlaygroundLab";

export default function PlaygroundPage() {
  return (
    <AppShell maxWidth="max-w-4xl">
      <PageHeader
        eyebrow="Experimental"
        title="Accessibility Playground"
        description="Manual Modal, Tabs, and Disclosure implementations from the FE accessibility lab. Kept for reference; not part of the student product shell."
      />
      <div className="mt-8">
        <PlaygroundLab />
      </div>
    </AppShell>
  );
}
