"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiCopy, FiEdit2, FiTrash2 } from "react-icons/fi";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

const AdminEmailsTable = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState("");

  async function loadEmails() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/emails", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to fetch emails.");
      }
      setItems(data.emails || []);
    } catch (error) {
      toast.error(error.message || "Unable to load emails.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadEmails();
  }, []);

  async function copyText(value, label) {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error(`Failed to copy ${label.toLowerCase()}`);
    }
  }

  async function handleDelete(id) {
    if (!id) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/emails/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete email account.");
      }
      toast.success("Email account deleted");
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.message || "Delete failed.");
    } finally {
      setDeletingId("");
      setConfirmDeleteId("");
    }
  }

  if (isLoading) {
    return <p className="py-8 text-center">Loading email accounts...</p>;
  }

  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-base-300 p-8 text-center">
        <p>No email accounts found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Used</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <div className="flex items-center gap-2">
                  <code>{item.email}</code>
                  <button
                    type="button"
                    className="btn btn-xs btn-info btn-soft"
                    onClick={() => copyText(item.email, "Email")}
                  >
                    <FiCopy className="size-3" />
                    Copy
                  </button>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <code className="max-w-40 truncate">{item.password}</code>
                  <button
                    type="button"
                    className="btn btn-xs btn-info btn-soft"
                    onClick={() => copyText(item.password, "Password")}
                  >
                    <FiCopy className="size-3" />
                    Copy
                  </button>
                </div>
              </td>
              <td>
                <span
                  className={`badge ${item.used ? "badge-success" : "badge-ghost"}`}
                >
                  {item.used ? "Used" : "Unused"}
                </span>
              </td>
              <td>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/emails/${item._id}/edit`}
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
          ))}
        </tbody>
      </table>

      <DeleteConfirmModal
        open={Boolean(confirmDeleteId)}
        title="Delete Email Account"
        message="Are you sure you want to delete this email account?"
        isLoading={deletingId === confirmDeleteId}
        onCancel={() => setConfirmDeleteId("")}
        onConfirm={() => handleDelete(confirmDeleteId)}
      />
    </div>
  );
};

export default AdminEmailsTable;
