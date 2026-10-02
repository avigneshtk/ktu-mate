import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import MotionButton from "@/components/MotionButton";

export default function MotionButtonPage() {
  return (
    <AppShell maxWidth="max-w-3xl">
      <PageHeader
        align="center"
        eyebrow="KTU Mate · Motion Lab"
        title="Intentional Motion Button"
        description="A reusable button that communicates its complete lifecycle: idle, loading, success, and error. Kept as an experimental route."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <h2 className="text-xl font-bold text-white">Success flow</h2>
          <p className="mt-2 text-sm text-slate-400">
            Click the button to see the loading and successful completion states.
          </p>
          <div className="mt-8 flex justify-center">
            <MotionButton forceResult="success" />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <h2 className="text-xl font-bold text-white">Error flow</h2>
          <p className="mt-2 text-sm text-slate-400">
            This trigger forces an error result so the failure state can be tested.
          </p>
          <div className="mt-8 flex justify-center">
            <MotionButton forceResult="error" />
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-6">
        <h2 className="text-xl font-bold text-white">Motion decisions</h2>
        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
          <p>
            <strong className="text-white">300ms ease-out:</strong> used for the
            main button movement and state transition so the interaction feels
            responsive without being abrupt.
          </p>
          <p>
            <strong className="text-white">200ms ease-out:</strong> used for
            label and loading-indicator transitions because small content
            changes should feel faster.
          </p>
          <p>
            <strong className="text-white">Reduced motion:</strong> transitions
            and the spin indicator are suppressed when the user requests reduced
            motion.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
