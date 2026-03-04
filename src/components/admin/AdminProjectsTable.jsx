"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

const AdminProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState("");

  async function loadProjects() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/projects", {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to fetch projects.");
      }
      setProjects(data.projects || []);
    } catch (error) {
      toast.error(error.message || "Unable to load projects.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDelete(projectId) {
    if (!projectId) {
      return;
    }

    setDeletingId(projectId);
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete project.");
      }
      toast.success("Project deleted");
      setProjects((prev) =>
        prev.filter((project) => project._id !== projectId),
      );
    } catch (error) {
      toast.error(error.message || "Delete failed.");
    } finally {
      setDeletingId("");
      setConfirmDeleteId("");
    }
  }

  if (isLoading) {
    return <p className="py-8 text-center">Loading projects...</p>;
  }

  if (!projects.length) {
    return (
      <div className="rounded-xl border border-dashed border-base-300 p-8 text-center">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Skills</th>
            <th>Featured</th>
            <th>Order</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>
                <div className="flex items-center gap-3">
                  <Image
                    src={project.thumbnailUrl}
                    alt={`${project.title} thumbnail`}
                    width={56}
                    height={46}
                    className="h-10 w-14 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="line-clamp-1 text-xs opacity-70">
                      {project.summary}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {(project.skills || []).map((skill) => (
                    <span
                      key={skill._id}
                      className="badge badge-outline badge-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </td>
              <td>{project.isFeatured ? "Yes" : "No"}</td>
              <td>{project.order}</td>
              <td>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/projects/${project._id}/edit`}
                    className="btn btn-sm btn-info btn-soft"
                  >
                    <FiEdit2 className="size-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-error btn-soft"
                    disabled={deletingId === project._id}
                    onClick={() => setConfirmDeleteId(project._id)}
                  >
                    <FiTrash2 className="size-4" />
                    {deletingId === project._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmModal
        open={Boolean(confirmDeleteId)}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        isLoading={deletingId === confirmDeleteId}
        onCancel={() => setConfirmDeleteId("")}
        onConfirm={() => handleDelete(confirmDeleteId)}
      />
    </div>
  );
};

export default AdminProjectsTable;
