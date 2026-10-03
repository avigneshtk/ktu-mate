"use client";

import { FormEvent, useState } from "react";

export default function SettingsSecurity() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [deletePassword, setDeletePassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to change password.");
        return;
      }

      setMessage("Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    setDeleting(true);

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to delete account.");
        return;
      }

      window.location.href = "/login";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-200">Change Password</p>
            <p className="text-xs text-slate-400">
              Update your account password securely.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowPasswordForm((value) => !value);
              setShowDeleteForm(false);
              setError("");
              setMessage("");
            }}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {showPasswordForm ? "Cancel" : "Update"}
          </button>
        </div>

        {showPasswordForm && (
          <form
            onSubmit={handleChangePassword}
            className="space-y-4 rounded-xl border border-white/10 bg-black/10 p-4"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                minLength={6}
                required
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                minLength={6}
                required
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        )}
      </div>

      {message && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Delete Account */}
      <div className="border-t border-white/5 pt-6">
        {!showDeleteForm ? (
          <button
            type="button"
            onClick={() => {
              setShowDeleteForm(true);
              setShowPasswordForm(false);
              setError("");
              setMessage("");
            }}
            className="rounded-lg border border-red-500/30 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/30"
          >
            Delete Account
          </button>
        ) : (
          <form
            onSubmit={handleDeleteAccount}
            className="space-y-4 rounded-xl border border-red-500/20 bg-red-950/20 p-4"
          >
            <div>
              <p className="font-semibold text-red-400">
                Delete your account?
              </p>

              <p className="mt-1 text-sm text-slate-400">
                This permanently deletes your profile, DSA progress, marks,
                timetable, streak, and chat data. This action cannot be undone.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Enter your password to confirm
              </label>

              <input
                type="password"
                value={deletePassword}
                onChange={(event) => setDeletePassword(event.target.value)}
                required
                className="w-full rounded-lg border border-red-500/20 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500/40"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteForm(false);
                  setDeletePassword("");
                  setError("");
                }}
                disabled={deleting}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={deleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}