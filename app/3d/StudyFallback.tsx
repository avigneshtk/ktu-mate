export default function StudyFallback() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center rounded-2xl bg-slate-950 p-6 sm:min-h-[600px]">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-4xl">
          💻
        </div>

        <h2 className="text-xl font-bold text-white">
          Interactive 3D Study Desk
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          The 3D experience is disabled to reduce motion and
          improve performance on this device.
        </p>

        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-4 text-left">
          <p className="text-sm font-semibold text-slate-300">
            Study Desk
          </p>

          <ul className="mt-2 space-y-1 text-sm text-slate-500">
            <li>• Laptop</li>
            <li>• Study book</li>
            <li>• Coffee cup</li>
          </ul>
        </div>
      </div>
    </div>
  );
}