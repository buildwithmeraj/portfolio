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
      className="is-drawer-close:tooltip is-drawer-close:tooltip-right ml-0.5 text-error hover:text-error-focus transition"
      data-tip="Logout"
    >
      <span className="is-drawer-close:hidden">
        <FaSignOutAlt className="size-4 inline mr-1.5" />
        Logout
      </span>
    </button>
  );
};

export default AdminLogoutButton;
