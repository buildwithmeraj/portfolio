"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";

const defaults = {
  name: "",
  iconUrl: "",
  category: "Frontend",
  order: 0,
  isFeatured: true,
};

const SkillForm = ({ mode, skillId, initialData }) => {
  const router = useRouter();
  const initialForm = useMemo(
    () => (initialData ? { ...defaults, ...initialData } : defaults),
    [initialData],
  );

  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "create"
          ? "/api/admin/skills"
          : `/api/admin/skills/${skillId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          iconUrl: form.iconUrl,
          category: form.category,
          order: Number(form.order),
          isFeatured: form.isFeatured,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Request failed.");
      }

      toast.success(mode === "create" ? "Skill created" : "Skill updated");
      router.push("/admin/skills");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Unable to save skill.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
    >
      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Skill Name
        </span>
        <input
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="React, Node.js, MongoDB"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Icon URL
        </span>
        <input
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.iconUrl}
          onChange={(event) => updateField("iconUrl", event.target.value)}
          placeholder="https://i.ibb.co/....png"
          required
        />
      </label>

      {form.iconUrl ? (
        <div className="rounded-xl border border-base-300 p-4">
          <p className="mb-2 text-sm font-medium">Preview</p>
          <img
            src={form.iconUrl}
            alt={`${form.name || "Skill"} icon`}
            className="h-12 w-12 rounded-md object-contain"
          />
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="form-control w-full">
          <span className="label-text mb-1.5 font-semibold text-base-content">
            Category
          </span>
          <input
            className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            placeholder="Frontend / Backend / Tools"
            required
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1.5 font-semibold text-base-content">
            Display Order
          </span>
          <input
            type="number"
            className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
            value={form.order}
            onChange={(event) => updateField("order", event.target.value)}
            required
          />
        </label>
      </div>

      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={form.isFeatured}
          onChange={(event) => updateField("isFeatured", event.target.checked)}
        />
        <span className="label-text ml-2">Mark as featured skill</span>
      </label>

      <div className="flex gap-3">
        <button
          className="btn btn-primary text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          <FiSave className="size-4" />
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
              ? "Create Skill"
              : "Update Skill"}
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => router.push("/admin/skills")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SkillForm;
