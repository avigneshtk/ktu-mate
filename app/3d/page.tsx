import StudySceneLoader from "./StudySceneLoader";

export default function ThreeDPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            KTU Mate
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Interactive 3D Study Desk
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Explore a small interactive 3D study environment built
            with React Three Fiber.
          </p>
        </div>

        <StudySceneLoader />

        <p className="mt-4 text-center text-sm text-slate-500">
          Drag to rotate • Scroll to zoom • Touch supported • Click the book to change its color
        </p>
      </div>
    </main>
  );
}