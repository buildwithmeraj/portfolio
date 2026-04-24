"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";

const AdminLogoutButton = () => {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Logout failed.");
      }
      toast.success("Logged out");
      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Unable to logout.");
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="btn btn-sm border-error/30 bg-error/10 text-error hover:bg-error/15"
      aria-label="Logout"
      title="Logout"
    >
      <FaSignOutAlt className="size-4 shrink-0" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
};

export default AdminLogoutButton;
