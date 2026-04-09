"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

const AdminSkillsTable = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState("");

  async function loadSkills() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/skills", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to fetch skills.");
      }

      setSkills(data.skills || []);
    } catch (error) {
      toast.error(error.message || "Unable to load skills.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSkills();
  }, []);

  async function handleDelete(skillId) {
    if (!skillId) {
      return;
    }

    setDeletingId(skillId);
    try {
      const response = await fetch(`/api/admin/skills/${skillId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete skill.");
      }

      toast.success("Skill deleted");
      setSkills((prev) => prev.filter((item) => item._id !== skillId));
    } catch (error) {
      toast.error(error.message || "Delete failed.");
    } finally {
      setDeletingId("");
      setConfirmDeleteId("");
    }
  }

  if (isLoading) {
    return <p className="py-8 text-center">Loading skills...</p>;
  }

  if (!skills.length) {
    return (
      <div className="rounded-xl border border-dashed border-base-300 p-8 text-center">
        <p>No skills found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Category</th>
            <th>Featured</th>
            <th>Order</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={skill.iconUrl}
                    alt={`${skill.name} icon`}
                    className="h-8 w-8 rounded object-contain"
                  />
                  <span className="font-medium">{skill.name}</span>
                </div>
              </td>
              <td>{skill.category}</td>
              <td>{skill.isFeatured ? "Yes" : "No"}</td>
              <td>{skill.order}</td>
              <td>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/skills/${skill._id}/edit`}
                    className="btn btn-sm btn-info btn-soft"
                  >
                    <FiEdit2 className="size-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-error btn-soft"
                    disabled={deletingId === skill._id}
                    onClick={() => setConfirmDeleteId(skill._id)}
                  >
                    <FiTrash2 className="size-4" />
                    {deletingId === skill._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmModal
        open={Boolean(confirmDeleteId)}
        title="Delete Skill"
        message="Are you sure you want to delete this skill?"
        isLoading={deletingId === confirmDeleteId}
        onCancel={() => setConfirmDeleteId("")}
        onConfirm={() => handleDelete(confirmDeleteId)}
      />
    </div>
  );
};

export default AdminSkillsTable;
