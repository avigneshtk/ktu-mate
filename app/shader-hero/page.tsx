import Link from "next/link";
import ShaderHero from "@/components/ShaderHero/ShaderHero";

export default function ShaderHeroPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <ShaderHero />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/70">
            AI • Frontend • CSE
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Hi, I&apos;m Avignesh.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            Building useful experiences with AI, frontend technology,
            and creative code.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-white/90"
            >
              Explore KTU Mate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}