"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
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
  const [useFallback] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lowPower =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 2;

    return reducedMotion || lowPower;
  });

  if (useFallback) {
    return <StudyFallback />;
  }

  return <StudyScene />;
}