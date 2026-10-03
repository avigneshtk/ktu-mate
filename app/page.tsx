import Link from "next/link";
import ShaderHero from "@/components/ShaderHero/ShaderHero";
import LandingNav from "@/components/LandingNav";

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-[#090d16] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200"
    >
      {/* Page content */}
      <div className="relative z-10">
        {/* Top Navigation */}
        <LandingNav />

        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-16">
          {/* Hero Shader - kept inside hero only */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <ShaderHero />
          </div>

          {/* Ambient overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#090d16]/35 to-[#090d16]/80"
          />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs font-semibold text-purple-300 shadow-inner shadow-purple-500/20 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 motion-safe:animate-pulse" />
              Designed specifically for KTU Engineering Students
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Study smarter with{" "}
              <span className="gradient-text font-black">KTU Mate</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Your AI-powered academic companion for KTU. Syllabus mastery,
              Series Test diagnostics, DSA and LeetCode progression, and study
              schedules in one workspace.
            </p>

            {/* Action CTAs */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/avigu"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-purple-500/25 transition hover:shadow-purple-500/40 motion-safe:hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span>🤖 Chat with Avigu</span>
              </Link>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-900/60 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span>Create free account</span>
              </Link>

              <Link
                href="/3d"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-6 py-3.5 text-base font-semibold text-cyan-300 backdrop-blur-md transition hover:border-cyan-400/50 hover:bg-cyan-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>✦ 3D Study Desk</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl sm:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-black text-white">KTU</p>
                <p className="text-xs text-slate-400">Targeted Curriculum</p>
              </div>

              <div className="text-center">
                <p className="gradient-text text-2xl font-black">
                  Gemini 3.6
                </p>
                <p className="text-xs text-slate-400">Streaming AI Core</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-black text-white">Full DSA</p>
                <p className="text-xs text-slate-400">Structured Topics</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-black text-white">100/100</p>
                <p className="text-xs text-slate-400">A11y Audited</p>
              </div>
            </div>
          </div>
        </section>

        {/* Avigu Showcase */}
        <section
          id="avigu"
          className="relative border-t border-white/10 bg-[#0b101d]/75 px-6 py-24 backdrop-blur-[2px]"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-1 text-xs font-semibold text-cyan-300">
                  ✦ Flagship Companion
                </div>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Meet <span className="gradient-text">Avigu</span>, your
                  dedicated AI tutor
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  Avigu is not just a generic chatbot. Built inside KTU Mate,
                  Avigu understands your engineering semester, syllabus
                  modules, Series Test weaknesses, and real DSA progression.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5">
                    <span className="text-xl" aria-hidden="true">
                      ⚡
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Real-Time Streaming Responses
                      </h3>
                      <p className="text-xs text-slate-400">
                        Instant feedback powered by Google Gemini and Vercel AI
                        SDK.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5">
                    <span className="text-xl" aria-hidden="true">
                      📊
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Generative UI for DSA Progress
                      </h3>
                      <p className="text-xs text-slate-400">
                        Renders rich interactive progress cards directly
                        inside the conversation stream.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5">
                    <span className="text-xl" aria-hidden="true">
                      🎯
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Exam Preparation Diagnostics
                      </h3>
                      <p className="text-xs text-slate-400">
                        Analyzes Series Test 1 &amp; 2 answers to generate
                        targeted revision priorities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/avigu"
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  >
                    Start Chatting with Avigu →
                  </Link>
                </div>
              </div>

              {/* Simulated Avigu Chat Preview */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/40 bg-purple-600/30 text-xl">
                      🤖
                    </div>

                    <div>
                      <p className="font-bold text-white">Avigu</p>
                      <p className="text-xs text-cyan-400">
                        AI Academic Companion
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-0.5 text-xs font-semibold text-green-400">
                    Online
                  </span>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-purple-600 px-4 py-2.5 text-white">
                      What should I focus on for my upcoming KTU Data
                      Structures exam?
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-200">
                      <p className="mb-2 font-semibold text-purple-300">
                        Avigu:
                      </p>

                      <p className="text-xs leading-relaxed">
                        Based on KTU Module 3 &amp; 4 weightage, concentrate
                        on:
                      </p>

                      <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-slate-300">
                        <li>Binary Search Tree operations (Deletion cases)</li>
                        <li>AVL Tree rotations (LL, RR, LR, RL)</li>
                        <li>
                          Graph Traversal algorithms (BFS &amp; DFS matrix/list)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="relative border-t border-white/10 bg-[#090d16]/70 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
                Complete Academic Suite
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Everything KTU students need to excel
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                From coding interviews to semester examinations, KTU Mate
                consolidates your daily engineering life into one coherent
                platform.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card p-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/20 text-2xl"
                  aria-hidden="true"
                >
                  📝
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Series Test Analytics
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Track your Series Test 1 and 2 scores, pinpoint
                  underperforming modules, and get personalised study
                  recommendations before university exams.
                </p>

                <Link
                  href="/analysis"
                  className="mt-4 inline-block text-xs font-semibold text-purple-400 hover:text-purple-300"
                >
                  View Analysis →
                </Link>
              </div>

              <div className="glass-card p-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/20 text-2xl"
                  aria-hidden="true"
                >
                  💻
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Structured DSA Practice
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Practice topic by topic — Arrays, Stacks, Linked Lists,
                  Trees, and Graphs. Monitor your solved problem counts and
                  difficulty distribution.
                </p>

                <Link
                  href="/dsa"
                  className="mt-4 inline-block text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Practice DSA →
                </Link>
              </div>

              <div className="glass-card p-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/20 text-2xl"
                  aria-hidden="true"
                >
                  ⚡
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  LeetCode Milestones
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Log completed problem sets across Easy, Medium, and Hard
                  tiers, set target milestones, and prepare early for campus
                  placements.
                </p>

                <Link
                  href="/leetcode"
                  className="mt-4 inline-block text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  Track LeetCode →
                </Link>
              </div>

              <div className="glass-card p-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/20 text-2xl"
                  aria-hidden="true"
                >
                  📅
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Intelligent Timetable
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Balance daily college lectures, university lab slots, and
                  dedicated self-study hours with an organised weekly schedule
                  planner.
                </p>

                <Link
                  href="/timetable"
                  className="mt-4 inline-block text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  Build Schedule →
                </Link>
              </div>

              <div className="glass-card p-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/20 text-2xl"
                  aria-hidden="true"
                >
                  🔥
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Consistency &amp; Streaks
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Maintain study streaks, view weekly contribution heatmaps,
                  and build strong daily habits that prevent last-minute exam
                  cramming.
                </p>

                <Link
                  href="/streak"
                  className="mt-4 inline-block text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Check Streak →
                </Link>
              </div>

              <div className="glass-card p-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/20 text-2xl"
                  aria-hidden="true"
                >
                  🧊
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Interactive 3D Hub
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Immerse yourself in a creative 3D study environment built
                  with React Three Fiber, WebGL, and accessible motion
                  controls.
                </p>

                <Link
                  href="/3d"
                  className="mt-4 inline-block text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Explore 3D →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="relative border-t border-white/10 bg-[#090d16]/65 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                One companion for the full KTU semester
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                KTU Mate is your AI-powered academic companion for KTU —
                study planning, coding practice, and exam focus in a single
                workspace.
              </p>
            </div>

            <ol className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Create your student space",
                  desc: "Sign in so dashboard, DSA, timetable, and streak can attach to your account instead of shared sample numbers.",
                },
                {
                  step: "02",
                  title: "Study with Avigu",
                  desc: "Ask exam, DSA, and planning questions. Responses stream live, with a keyboard-reachable Stop control.",
                },
                {
                  step: "03",
                  title: "Track what you actually do",
                  desc: "DSA, LeetCode, timetable, and streaks will reflect real activity — never invented statistics.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm"
                >
                  <p className="text-sm font-black text-cyan-400">
                    {item.step}
                  </p>

                  <h3 className="mt-3 text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Platform */}
        <section
          id="platform"
          className="relative border-t border-white/10 bg-[#0b101d]/70 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Built for Performance
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                A platform engineered for KTU students
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                KTU Mate is built with modern web technology to be fast,
                accessible, and genuinely useful during your engineering
                journey.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "🤖",
                  title: "Google Gemini AI",
                  desc: "Gemini Flash powers Avigu's streaming AI responses.",
                  color: "border-purple-500/20 bg-purple-500/5",
                },
                {
                  icon: "⚡",
                  title: "Next.js 16 App Router",
                  desc: "Server components, streaming, and edge-ready deployment.",
                  color: "border-cyan-500/20 bg-cyan-500/5",
                },
                {
                  icon: "🎨",
                  title: "GLSL Shader Hero",
                  desc: "A hand-crafted WebGL shader as the landing visual centrepiece.",
                  color: "border-indigo-500/20 bg-indigo-500/5",
                },
                {
                  icon: "♿",
                  title: "100% A11y Score",
                  desc: "Lighthouse Accessibility 100/100. Keyboard navigable throughout.",
                  color: "border-emerald-500/20 bg-emerald-500/5",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border p-6 text-center backdrop-blur-sm ${item.color}`}
                >
                  <span className="text-3xl" aria-hidden="true">
                    {item.icon}
                  </span>

                  <h3 className="mt-4 font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-purple-500/25 transition hover:shadow-purple-500/40 motion-safe:hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                Get started — it&apos;s free
              </Link>
            </div>
          </div>
        </section>

        {/* Footer / About */}
        <footer className="border-t border-white/10 bg-[#060910]/90 px-6 py-16 text-sm text-slate-400">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
              {/* About KTU Mate */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-sm font-black text-white shadow-lg shadow-purple-500/20">
                    KT
                  </span>

                  <div>
                    <h2 className="text-lg font-black text-white">
                      KTU Mate
                    </h2>

                    <p className="text-xs text-slate-500">
                      AI-powered academic workspace
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-xl leading-relaxed text-slate-400">
                  KTU Mate is an independent student-built platform designed
                  to bring academic tracking, Series Test analysis, DSA
                  practice, LeetCode progress, timetables, study streaks, and
                  AI-powered academic assistance into one workspace for KTU
                  engineering students.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1 text-xs text-purple-300">
                    Next.js
                  </span>

                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs text-cyan-300">
                    TypeScript
                  </span>

                  <span className="rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs text-indigo-300">
                    Prisma
                  </span>

                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-300">
                    PostgreSQL
                  </span>

                  <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs text-amber-300">
                    Gemini AI
                  </span>
                </div>
              </div>

              {/* About Developer */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
                  About the Developer
                </p>

                <h2 className="mt-3 text-xl font-bold text-white">
                  Avignesh T K
                </h2>

                <p className="mt-4 leading-relaxed text-slate-400">
                  Computer Science Engineering student and developer focused
                  on full-stack web development, AI-powered applications,
                  modern frontend experiences, and practical software
                  projects.
                </p>

                <p className="mt-3 leading-relaxed text-slate-400">
                  KTU Mate was created as a practical project to explore how
                  AI, academic analytics, programming practice, and thoughtful
                  product design can work together in a single student-focused
                  platform.
                </p>

                <div className="mt-5 flex flex-wrap gap-4">
                  <a
                    href="https://github.com/avigneshtk/ktu-mate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-purple-400 transition hover:text-purple-300"
                  >
                    GitHub ↗
                  </a>

                  <a
                    href="https://www.linkedin.com/in/avignesh-tk-30136a384/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Explore KTU Mate
                </p>

                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                  <Link
                    href="/login"
                    className="transition hover:text-white"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/signup"
                    className="transition hover:text-white"
                  >
                    Create Account
                  </Link>

                  <Link
                    href="/avigu"
                    className="transition hover:text-white"
                  >
                    Avigu AI
                  </Link>

                  <Link href="/dsa" className="transition hover:text-white">
                    DSA
                  </Link>

                  <Link
                    href="/leetcode"
                    className="transition hover:text-white"
                  >
                    LeetCode
                  </Link>

                  <Link
                    href="/timetable"
                    className="transition hover:text-white"
                  >
                    Timetable
                  </Link>

                  <Link
                    href="/analysis"
                    className="transition hover:text-white"
                  >
                    Analysis
                  </Link>

                  <Link
                    href="/streak"
                    className="transition hover:text-white"
                  >
                    Streak
                  </Link>

                  <Link href="/3d" className="transition hover:text-white">
                    3D Study Desk
                  </Link>

                  <a
                    href="https://github.com/avigneshtk/ktu-mate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    Source Code ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="mt-12 rounded-2xl border border-amber-500/15 bg-amber-500/5 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                Important
              </p>

              <p className="mt-2 max-w-5xl text-xs leading-relaxed text-slate-400">
                KTU Mate is an independent student project and is not an
                official KTU or university platform. AI responses, academic
                analysis, study suggestions, and other generated information
                may contain errors and should be verified with official
                academic sources. Do not use KTU Mate as a replacement for
                official university notices, regulations, examination
                schedules, or academic guidance. Avoid entering passwords,
                confidential information, or other sensitive data into AI
                conversations.
              </p>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} KTU Mate. Built as an independent
                student project.
              </p>

              <p>
                Designed &amp; developed by{" "}
                <span className="font-semibold text-slate-300">
                  Avignesh T K
                </span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}