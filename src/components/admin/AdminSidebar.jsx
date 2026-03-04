"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import {
  FiBarChart2,
  FiGrid,
  FiTag,
  FiLayers,
  FiFolder,
  FiMail,
  FiFileText,
} from "react-icons/fi";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: FiGrid },
  { href: "/admin/blog/categories", label: "Categories", icon: FiTag },
  { href: "/admin/blog/posts", label: "Posts", icon: FiBarChart2 },
  { href: "/admin/skills", label: "Skills", icon: FiLayers },
  { href: "/admin/projects", label: "Projects", icon: FiFolder },
  { href: "/admin/emails", label: "Emails", icon: FiMail },
  { href: "/admin/resumes", label: "Resumes", icon: FiFileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {adminLinks.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                isActive ? "bg-base-content/10 font-bold" : ""
              }`}
              data-tip={item.label}
            >
              <Icon className="size-4" />
              <span className="is-drawer-close:hidden">{item.label}</span>
            </Link>
          </li>
        );
      })}
      <li className="border-t border-base-content/30 w-full mt-2 pt-1">
        <AdminLogoutButton />
      </li>
    </>
  );
}
