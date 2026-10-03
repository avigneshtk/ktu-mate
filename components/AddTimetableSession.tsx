"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTimetableSession() {
  const router = useRouter();

  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [room, setRoom] = useState("");
  const [isLab, setIsLab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dayOfWeek,
          subject,
          startTime,
          endTime,
          room,
          isLab,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to add session");
        return;
      }

      setSubject("");
      setStartTime("");
      setEndTime("");
      setRoom("");
      setIsLab(false);

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-4 rounded-xl border border-white/10 bg-slate-900/60 p-5"
    >
      <div>
        <label className="mb-1 block text-sm text-slate-300">Day</label>
        <select
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-[#090d16] px-3 py-2 text-white"
        >
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Subject</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Data Structures"
          required
          className="w-full rounded-lg border border-white/10 bg-[#090d16] px-3 py-2 text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm text-slate-300">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-[#090d16] px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full rounded-lg border border-white/10 bg-[#090d16] px-3 py-2 text-white"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Room</label>
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="e.g. Room 301"
          className="w-full rounded-lg border border-white/10 bg-[#090d16] px-3 py-2 text-white"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={isLab}
          onChange={(e) => setIsLab(e.target.checked)}
        />
        Lab session
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Session"}
      </button>
    </form>
  );
}