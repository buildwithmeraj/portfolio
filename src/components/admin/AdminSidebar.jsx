"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBarChart2,
  FiGrid,
  FiHome,
  FiTag,
  FiLayers,
  FiFolder,
  FiMail,
  FiFileText,
} from "react-icons/fi";

const adminSections = [
  {
    title: "Overview",
    links: [{ href: "/admin", label: "Dashboard", icon: FiGrid }],
  },
  {
    title: "Content",
    links: [
      { href: "/admin/blog/categories", label: "Categories", icon: FiTag },
      { href: "/admin/blog/posts", label: "Posts", icon: FiBarChart2 },
    ],
  },
  {
    title: "Portfolio",
    links: [
      { href: "/admin/skills", label: "Skills", icon: FiLayers },
      { href: "/admin/projects", label: "Projects", icon: FiFolder },
      { href: "/admin/resumes", label: "Resumes", icon: FiFileText },
    ],
  },
  {
    title: "Settings",
    links: [{ href: "/admin/emails", label: "Emails", icon: FiMail }],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isLinkActive(href) {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="space-y-4">
      <div className="is-drawer-close:hidden rounded-2xl border border-base-300/80 bg-base-100/70 p-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-base-content/60">
          Admin Panel
        </p>
        <h2 className="mt-1 text-sm font-semibold">Content Control Center</h2>
      </div>

      <Link
        href="/"
        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 rounded-xl border border-base-300/70 bg-base-100/70 px-3 py-2 text-sm font-medium transition hover:border-primary/40 hover:bg-base-100"
        data-tip="Back to site"
      >
        <FiHome className="size-4 shrink-0" />
        <span className="is-drawer-close:hidden">Back to site</span>
      </Link>

      {adminSections.map((section) => (
        <div key={section.title} className="space-y-1.5">
          <p className="is-drawer-close:hidden px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-base-content/50">
            {section.title}
          </p>

          {section.links.map((item) => {
            const Icon = item.icon;
            const active = isLinkActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                  active
                    ? "bg-primary/15 text-base-content border border-primary/30 font-semibold"
                    : "border border-transparent text-base-content/80 hover:border-base-300/90 hover:bg-base-100/80"
                }`}
                data-tip={item.label}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={`size-4 shrink-0 ${active ? "text-primary" : ""}`} />
                <span className="is-drawer-close:hidden">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
