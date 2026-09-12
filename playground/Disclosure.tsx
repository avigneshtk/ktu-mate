"use client";

import { useState } from "react";

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-xl rounded-lg border border-gray-300">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="disclosure-content"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-gray-800 hover:bg-gray-100"
      >
        <span>What is KTU Mate?</span>

        <span aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        id="disclosure-content"
        hidden={!isOpen}
        className="border-t border-gray-300 px-5 py-4 text-gray-600"
      >
        KTU Mate is an AI-powered academic companion designed
        to help KTU students prepare better for their examinations
        and improve their technical skills.
      </div>
    </div>
  );
}