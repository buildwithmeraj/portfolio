"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { buildGoogleDriveLinks } from "@/lib/google-drive";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

const AdminResumesTable = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState("");

  async function loadResumes() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/resumes", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to fetch resumes.");
      }
      setItems(data.resumes || []);
    } catch (error) {
      toast.error(error.message || "Unable to load resumes.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadResumes();
  }, []);

  async function handleDelete(id) {
    if (!id) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/resumes/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete resume.");
      }
      toast.success("Resume deleted");
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.message || "Delete failed.");
    } finally {
      setDeletingId("");
      setConfirmDeleteId("");
    }
  }

  if (isLoading) {
    return <p className="py-8 text-center">Loading resumes...</p>;
  }

  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-base-300 p-8 text-center">
        <p>No resumes found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Order</th>
            <th>Drive Link</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const links = buildGoogleDriveLinks(item.driveUrl);

            return (
              <tr key={item._id}>
                <td className="font-medium">{item.title}</td>
                <td>
                  <span
                    className={`badge ${item.isActive ? "badge-success" : "badge-ghost"}`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{item.order}</td>
                <td>
                  <a
                    href={links.viewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-xs btn-info btn-soft"
                  >
                    <FiEye className="size-3" />
                    Open
                  </a>
                </td>
                <td>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/resumes/${item._id}/edit`}
                      className="btn btn-sm btn-info btn-soft"
                    >
                      <FiEdit2 className="size-4" />
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-error btn-soft"
                      disabled={deletingId === item._id}
                      onClick={() => setConfirmDeleteId(item._id)}
                    >
                      <FiTrash2 className="size-4" />
                      {deletingId === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <DeleteConfirmModal
        open={Boolean(confirmDeleteId)}
        title="Delete Resume"
        message="Are you sure you want to delete this resume?"
        isLoading={deletingId === confirmDeleteId}
        onCancel={() => setConfirmDeleteId("")}
        onConfirm={() => handleDelete(confirmDeleteId)}
      />
    </div>
  );
};

export default AdminResumesTable;
