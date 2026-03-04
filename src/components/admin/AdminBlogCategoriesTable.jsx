"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

const AdminBlogCategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState("");

  async function loadCategories() {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleDelete(id) {
    if (!id) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/blog/categories/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete category.");
      }
      toast.success("Category deleted");
      setCategories((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.message || "Delete failed.");
    } finally {
      setDeletingId("");
      setConfirmDeleteId("");
    }
  }

  if (isLoading) {
    return <p className="py-8 text-center">Loading categories...</p>;
  }

  if (!categories.length) {
    return (
      <div className="rounded-xl border border-dashed border-base-300 p-8 text-center">
        <p>No categories found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Description</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="font-medium">{category.title}</td>
              <td>
                <code>{category.slug}</code>
              </td>
              <td className="max-w-sm truncate">{category.description}</td>
              <td>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/blog/categories/${category._id}/edit`}
                    className="btn btn-sm btn-info btn-soft"
                  >
                    <FiEdit2 className="size-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-error btn-soft"
                    disabled={deletingId === category._id}
                    onClick={() => setConfirmDeleteId(category._id)}
                  >
                    <FiTrash2 className="size-4" />
                    {deletingId === category._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmModal
        open={Boolean(confirmDeleteId)}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        isLoading={deletingId === confirmDeleteId}
        onCancel={() => setConfirmDeleteId("")}
        onConfirm={() => handleDelete(confirmDeleteId)}
      />
    </div>
  );
};

export default AdminBlogCategoriesTable;
