"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const defaults = {
  title: "",
  description: "",
};

const BlogCategoryForm = ({ mode, categoryId, initialData }) => {
  const router = useRouter();
  const initialForm = useMemo(
    () => ({ ...defaults, ...(initialData || {}) }),
    [initialData]
  );
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "create"
          ? "/api/admin/blog/categories"
          : `/api/admin/blog/categories/${categoryId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to save category.");
      }

      toast.success(mode === "create" ? "Category created" : "Category updated");
      router.push("/admin/blog/categories");
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
        <span className="label-text mb-1.5 font-semibold text-base-content">Title</span>
        <input
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Web Development"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">Description</span>
        <textarea
          className="textarea textarea-bordered min-h-24 w-full text-sm focus:outline-none focus:border-primary"
          value={form.description}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, description: event.target.value }))
          }
          placeholder="Category description"
        />
      </label>

      <p className="text-xs opacity-70">Slug is auto-generated from title.</p>

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
            ? "Create Category"
            : "Update Category"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => router.push("/admin/blog/categories")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogCategoryForm;
