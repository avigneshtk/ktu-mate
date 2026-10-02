"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import StudyFallback from "./StudyFallback";

const StudyScene = dynamic(() => import("./StudyScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-2xl bg-slate-950 text-sm text-slate-400 sm:h-[600px]">
      Loading 3D Study Desk...
    </div>
  ),
});

export default function StudySceneLoader() {
  const [useFallback, setUseFallback] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lowPower =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 2;

    setUseFallback(reducedMotion || lowPower);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center rounded-2xl bg-slate-950 text-sm text-slate-400 sm:h-[600px]">
        Preparing 3D experience...
      </div>
    );
  }

  if (useFallback) {
    return <StudyFallback />;
  }

  return <StudyScene />;
}