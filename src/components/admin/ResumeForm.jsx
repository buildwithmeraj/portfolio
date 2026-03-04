"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const defaults = {
  title: "",
  driveUrl: "",
  order: 0,
  isActive: true,
};

const ResumeForm = ({ mode, resumeId, initialData }) => {
  const router = useRouter();
  const initialForm = useMemo(
    () => ({ ...defaults, ...(initialData || {}) }),
    [initialData],
  );

  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "create"
          ? "/api/admin/resumes"
          : `/api/admin/resumes/${resumeId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          driveUrl: form.driveUrl,
          order: Number(form.order),
          isActive: form.isActive,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to save resume.");
      }

      toast.success(mode === "create" ? "Resume created" : "Resume updated");
      router.push("/admin/resumes");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Save failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
    >
      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Resume Title
        </span>
        <input
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.title}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, title: event.target.value }))
          }
          placeholder="Resume 2026"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Google Drive PDF Link
        </span>
        <input
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.driveUrl}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, driveUrl: event.target.value }))
          }
          placeholder="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
          required
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Display Order
        </span>
        <input
          type="number"
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.order}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, order: event.target.value }))
          }
          required
        />
      </label>

      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={form.isActive}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, isActive: event.target.checked }))
          }
        />
        <span className="label-text ml-2">Active</span>
      </label>

      <div className="flex gap-3">
        <button
          className="btn btn-primary text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
              ? "Create Resume"
              : "Update Resume"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => router.push("/admin/resumes")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
