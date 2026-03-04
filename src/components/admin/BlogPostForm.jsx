"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BlogEditor from "@/components/admin/BlogEditor";

const defaults = {
  title: "",
  excerpt: "",
  coverImageUrl: "",
  categoryId: "",
  status: "draft",
  publishedAt: "",
  contentHtml: "",
};

function toDateTimeLocalValue(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - timezoneOffsetInMs)
    .toISOString()
    .slice(0, 16);
}

const BlogPostForm = ({ mode, postId, initialData }) => {
  const router = useRouter();
  const initialForm = useMemo(
    () => ({
      ...defaults,
      ...(initialData || {}),
      publishedAt: toDateTimeLocalValue(initialData?.publishedAt),
    }),
    [initialData],
  );

  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const response = await fetch("/api/admin/blog/categories", {
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.message || "Unable to fetch categories.");
        }
        setCategories(data.categories || []);
      } catch (error) {
        toast.error(error.message || "Unable to load categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "create"
          ? "/api/admin/blog/posts"
          : `/api/admin/blog/posts/${postId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to save post.");
      }

      toast.success(mode === "create" ? "Post created" : "Post updated");
      router.push("/admin/blog/posts");
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
      className="space-y-2 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
    >
      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Title
        </span>
        <input
          className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
          value={form.title}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, title: event.target.value }))
          }
          placeholder="How I Built My Portfolio"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text mb-1.5 font-semibold text-base-content">
          Excerpt
        </span>
        <textarea
          className="textarea textarea-bordered min-h-20 w-full text-sm focus:outline-none focus:border-primary"
          value={form.excerpt}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, excerpt: event.target.value }))
          }
          placeholder="Short summary shown in blog list"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="form-control w-full md:col-span-2">
          <span className="label-text mb-1.5 font-semibold text-base-content">
            Cover Image URL
          </span>
          <input
            className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
            value={form.coverImageUrl}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                coverImageUrl: event.target.value,
              }))
            }
            placeholder="https://i.ibb.co/....png"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1.5 font-semibold text-base-content">
            Category
          </span>
          <select
            className="select select-bordered w-full text-sm focus:outline-none focus:border-primary"
            value={form.categoryId}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, categoryId: event.target.value }))
            }
            disabled={isLoadingCategories}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex items-center flex-col lg:flex-row gap-4">
        <label className="form-control flex-1">
          <span className="label-text mb-1.5 font-semibold text-base-content">
            Status
          </span>
          <select
            className="select select-bordered w-full text-sm focus:outline-none focus:border-primary"
            value={form.status}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, status: event.target.value }))
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>

        <label className="form-control max-w-xs">
          <span className="label-text mb-1.5 font-semibold text-base-content">
            Publish Date & Time
          </span>
          <input
            type="datetime-local"
            className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
            value={form.publishedAt}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, publishedAt: event.target.value }))
            }
          />
        </label>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Content (WYSIWYG)</p>
        <BlogEditor
          value={form.contentHtml}
          onChange={(html) =>
            setForm((prev) => ({ ...prev, contentHtml: html }))
          }
        />
      </div>

      <p className="text-xs opacity-70">
        Post slug is auto-generated from title.
      </p>

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
              ? "Create Post"
              : "Update Post"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => router.push("/admin/blog/posts")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
