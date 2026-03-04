"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEdit2, FiExternalLink, FiTrash2 } from "react-icons/fi";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

const AdminBlogPostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState("");

  async function loadPosts() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/blog/posts", {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to fetch posts.");
      }
      setPosts(data.posts || []);
    } catch (error) {
      toast.error(error.message || "Unable to load posts.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id) {
    if (!id) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/blog/posts/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete post.");
      }
      toast.success("Post deleted");
      setPosts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.message || "Delete failed.");
    } finally {
      setDeletingId("");
      setConfirmDeleteId("");
    }
  }

  if (isLoading) {
    return <p className="py-8 text-center">Loading posts...</p>;
  }

  if (!posts.length) {
    return (
      <div className="rounded-xl border border-dashed border-base-300 p-8 text-center">
        <p>No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Slug</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td className="font-medium">{post.title}</td>
              <td>{post.category?.title || "-"}</td>
              <td>
                <span
                  className={`badge ${
                    post.status === "published"
                      ? "badge-success"
                      : "badge-ghost"
                  }`}
                >
                  {post.status}
                </span>
              </td>
              <td>
                <code>{post.slug}</code>
              </td>
              <td>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="btn btn-sm btn-secondary btn-soft"
                  >
                    <FiExternalLink className="size-4" />
                    View
                  </Link>
                  <Link
                    href={`/admin/blog/posts/${post._id}/edit`}
                    className="btn btn-sm btn-info btn-soft"
                  >
                    <FiEdit2 className="size-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-error btn-soft"
                    disabled={deletingId === post._id}
                    onClick={() => setConfirmDeleteId(post._id)}
                  >
                    <FiTrash2 className="size-4" />
                    {deletingId === post._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmModal
        open={Boolean(confirmDeleteId)}
        title="Delete Blog Post"
        message="Are you sure you want to delete this post?"
        isLoading={deletingId === confirmDeleteId}
        onCancel={() => setConfirmDeleteId("")}
        onConfirm={() => handleDelete(confirmDeleteId)}
      />
    </div>
  );
};

export default AdminBlogPostsTable;
