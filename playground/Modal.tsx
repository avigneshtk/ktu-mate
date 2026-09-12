"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElement.current =
      document.activeElement as HTMLElement;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const modal = document.getElementById("demo-modal");

      if (!modal) {
        return;
      }

      const focusableElements =
        modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      previouslyFocusedElement.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-6"
      role="presentation"
    >
      <div
        id="demo-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="modal-title"
          className="text-2xl font-bold text-gray-950"
        >
          KTU Mate Modal
        </h2>

        <p className="mt-3 text-gray-600">
          This modal demonstrates keyboard focus management and
          accessible dialog behavior.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}