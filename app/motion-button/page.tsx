import MotionButton from "@/components/MotionButton";

export default function MotionButtonPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            KTU Mate · Motion Lab
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-950">
            Intentional Motion Button
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            A reusable button that communicates its complete lifecycle:
            idle, loading, success, and error.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {/* Success demo */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950">
              Success flow
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Click the button to see the loading and successful completion
              states.
            </p>

            <div className="mt-8 flex justify-center">
              <MotionButton forceResult="success" />
            </div>
          </section>

          {/* Error demo */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950">
              Error flow
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              This trigger forces an error result so the failure state can be
              tested.
            </p>

            <div className="mt-8 flex justify-center">
              <MotionButton forceResult="error" />
            </div>
          </section>
        </div>

        {/* Motion notes */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-950">
            Motion decisions
          </h2>

          <div className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
            <p>
              <strong className="text-gray-900">300ms ease-out:</strong>{" "}
              used for the main button movement and state transition so the
              interaction feels responsive without being abrupt.
            </p>

            <p>
              <strong className="text-gray-900">200ms ease-out:</strong>{" "}
              used for label and loading-indicator transitions because small
              content changes should feel faster.
            </p>

            <p>
              <strong className="text-gray-900">Loading delay:</strong>{" "}
              a simulated 1–2.5 second async operation makes the lifecycle
              easy to observe during the demo.
            </p>

            <p>
              <strong className="text-gray-900">Accessibility:</strong>{" "}
              the button supports keyboard focus with a visible focus ring
              and uses native button behavior.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}