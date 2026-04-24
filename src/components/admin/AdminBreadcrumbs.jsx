"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STATIC_LABELS = {
  admin: "Dashboard",
  blog: "Blog",
  categories: "Categories",
  posts: "Posts",
  skills: "Skills",
  projects: "Projects",
  resumes: "Resumes",
  emails: "Emails",
  new: "New",
  edit: "Edit",
};

function titleCase(value) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toLabel(segment, previousSegment) {
  const decoded = decodeURIComponent(segment);

  if (STATIC_LABELS[decoded]) return STATIC_LABELS[decoded];

  if (/^[a-f\d]{24}$/i.test(decoded)) {
    if (previousSegment === "skills") return "Skill";
    if (previousSegment === "projects") return "Project";
    if (previousSegment === "resumes") return "Resume";
    if (previousSegment === "emails") return "Email";
    if (previousSegment === "categories") return "Category";
    if (previousSegment === "posts") return "Post";
    return "Item";
  }

  return titleCase(decoded);
}

export default function AdminBreadcrumbs() {
  const pathname = usePathname() || "/admin";
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length || segments[0] !== "admin") return null;

  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const previousSegment = index > 0 ? segments[index - 1] : undefined;

    return {
      href,
      label: toLabel(segment, previousSegment),
      isLast: index === segments.length - 1,
    };
  });

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {crumbs.map((crumb) => (
          <li key={crumb.href}>
            {crumb.isLast ? <span>{crumb.label}</span> : <Link href={crumb.href}>{crumb.label}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
}
