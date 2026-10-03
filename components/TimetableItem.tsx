"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TimetableItemProps = {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  room: string | null;
  isLab: boolean;
};

export default function TimetableItem({
  id,
  subject,
  startTime,
  endTime,
  room,
  isLab,
}: TimetableItemProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${subject}" from your timetable?`
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      const response = await fetch("/api/timetable", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        window.alert(data.error || "Failed to delete session");
        return;
      }

      router.refresh();
    } catch {
      window.alert("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-[#090d16] p-4">
      <div>
        <p className="font-semibold text-white">{subject}</p>

        <p className="mt-1 text-xs text-slate-400">
          {startTime} - {endTime} {room ? `• ${room}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {isLab && (
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/20 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
            Lab
          </span>
        )}

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}