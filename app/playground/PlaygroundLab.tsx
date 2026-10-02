"use client";

import { useState } from "react";
import Modal from "@/playground/Modal";
import Tabs from "@/playground/Tabs";
import Disclosure from "@/playground/Disclosure";

export default function PlaygroundLab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">Modal</h2>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          Open Modal
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">Tabs</h2>
        <Tabs />
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">Disclosure</h2>
        <Disclosure />
      </section>
    </div>
  );
}
