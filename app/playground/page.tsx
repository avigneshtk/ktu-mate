"use client";

import { useState } from "react";
import Modal from "@/playground/Modal";
import Tabs from "@/playground/Tabs";
import Disclosure from "@/playground/Disclosure";

export default function PlaygroundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen space-y-10 p-8">
      <h1 className="text-3xl font-bold">Accessibility Playground</h1>

      <section>
        <h2 className="mb-4 text-xl font-bold">Modal</h2>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
        >
          Open Modal
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Tabs</h2>
        <Tabs />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Disclosure</h2>
        <Disclosure />
      </section>
    </main>
  );
}