"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const defaults = {
  title: "",
  summary: "",
  thumbnailUrl: "",
  liveUrl: "",
  repoUrl: "",
  order: 0,
  isFeatured: true,
  skillIds: [],
};

const ProjectForm = ({ mode, projectId, initialData }) => {
  const router = useRouter();
  const initialForm = useMemo(
    () => ({
      ...defaults,
      ...initialData,
      skillIds: Array.isArray(initialData?.skillIds)
        ? initialData.skillIds
        : [],
    }),
    [initialData],
  );

  const [form, setForm] = useState(initialForm);
  const [skills, setSkills] = useState([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadSkills() {
      try {
        setIsLoadingSkills(true);
        const response = await fetch("/api/admin/skills", {
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.message || "Failed to load skills.");
        }
        setSkills(data.skills || []);
      } catch (error) {
        toast.error(error.message || "Unable to load skills.");
      } finally {
        setIsLoadingSkills(false);
      }
    }

    loadSkills();
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleSkill(skillId) {
    setForm((prev) => {
      const exists = prev.skillIds.includes(skillId);
      return {
        ...prev,
        skillIds: exists
          ? prev.skillIds.filter((id) => id !== skillId)
          : [...prev.skillIds, skillId],
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "create"
          ? "/api/admin/projects"
          : `/api/admin/projects/${projectId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          summary: form.summary,
          thumbnailUrl: form.thumbnailUrl,
          liveUrl: form.liveUrl,
          repoUrl: form.repoUrl,
          order: Number(form.order),
          isFeatured: form.isFeatured,
          skillIds: form.skillIds,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to save project.");
      }

      toast.success(mode === "create" ? "Project created" : "Project updated");
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Unable to save project.");
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
          Project Title
        </span>
        <input
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder="Portfolio Website"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Summary
        </span>
        <textarea
          className="textarea textarea-bordered min-h-24 w-full text-sm focus:outline-none focus:border-primary"
          value={form.summary}
          onChange={(event) => updateField("summary", event.target.value)}
          placeholder="A short overview of the project."
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Thumbnail URL
        </span>
        <input
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.thumbnailUrl}
          onChange={(event) => updateField("thumbnailUrl", event.target.value)}
          placeholder="https://i.ibb.co/....png"
          required
        />
      </label>

      {form.thumbnailUrl ? (
        <div className="rounded-xl border border-base-content/30 p-2">
          <p className="mb-2 text-sm font-medium">Thumbnail Preview</p>
          <img
            src={form.thumbnailUrl}
            alt={`${form.title || "Project"} thumbnail`}
            className="h-auto w-full rounded-md object-conain"
          />
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="form-control w-full">
          <span className="label-text mb-1.5 font-semibold text-base-content">
            Live URL
          </span>
          <input
            className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
            value={form.liveUrl}
            onChange={(event) => updateField("liveUrl", event.target.value)}
            placeholder="https://your-live-site.com"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1.5 font-semibold text-base-content">
            Repository URL
          </span>
          <input
            className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
            value={form.repoUrl}
            onChange={(event) => updateField("repoUrl", event.target.value)}
            placeholder="https://github.com/you/repo"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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

        <label className="label cursor-pointer justify-start gap-3 pt-7">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={form.isFeatured}
            onChange={(event) =>
              updateField("isFeatured", event.target.checked)
            }
          />
          <span className="label-text ml-2">Featured project</span>
        </label>
      </div>

      <div className="space-y-2 rounded-xl border border-base-300 p-4">
        <p className="text-sm font-medium">Select Skills</p>
        {isLoadingSkills ? (
          <p className="text-sm opacity-70">Loading skills...</p>
        ) : !skills.length ? (
          <p className="text-sm opacity-70">
            No skills found. Create skills first.
          </p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {skills.map((skill) => (
              <label
                key={skill._id}
                className="label cursor-pointer justify-start gap-3 rounded-lg border border-base-300 px-3 py-2"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={form.skillIds.includes(skill._id)}
                  onChange={() => toggleSkill(skill._id)}
                />
                <span className="label-text ml-1">{skill.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

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
              ? "Create Project"
              : "Update Project"}
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
