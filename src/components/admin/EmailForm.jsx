"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const defaults = {
  email: "",
  password: "",
  used: false,
};

const EmailForm = ({ mode, emailId, initialData }) => {
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
          ? "/api/admin/emails"
          : `/api/admin/emails/${emailId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          used: form.used,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to save.");
      }

      toast.success(
        mode === "create" ? "Email account created" : "Email account updated",
      );
      router.push("/admin/emails");
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
          Email
        </span>
        <input
          type="email"
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="name@gmail.com"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Password
        </span>
        <input
          type="text"
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.password}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, password: event.target.value }))
          }
          placeholder="account password or app password"
          required
        />
      </label>

      <label className="label cursor-pointer flex items-center gap-3">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={form.used}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, used: event.target.checked }))
          }
        />
        <span className="label-text ml-2">Used</span>
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
              ? "Create Email"
              : "Update Email"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => router.push("/admin/emails")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
