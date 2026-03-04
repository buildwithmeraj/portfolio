"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiFileText, FiFolder, FiHome, FiLayers, FiMail } from "react-icons/fi";

const items = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/projects", label: "Projects", icon: FiFolder },
  { href: "/skills", label: "Skills", icon: FiLayers },
  { href: "/resume", label: "Resume", icon: FiFileText },
  { href: "/contact", label: "Contact", icon: FiMail, mdOnly: false },
];

const MobileDock = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-3 z-40 px-3 lg:hidden">
      <div className="liquid-shell mx-auto flex max-w-md items-center justify-around p-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs transition duration-300 ${
                item.mdOnly ? "hidden md:flex" : ""
              } ${
                active
                  ? "bg-primary text-primary-content shadow-sm"
                  : "hover:bg-base-200/60"
              }`}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileDock;
