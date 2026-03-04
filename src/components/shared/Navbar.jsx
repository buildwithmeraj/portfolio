"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBookOpen,
  FiFileText,
  FiFolder,
  FiHome,
  FiLayers,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Logo from "../utilities/Logo";
import ThemeSwitcher from "./ThemeSwitcher";

const navItems = [
  { label: "Home", href: "/", icon: FiHome },
  { label: "Projects", href: "/projects", icon: FiFolder },
  { label: "Skills", href: "/skills", icon: FiLayers },
  { label: "Resume", href: "/resume", icon: FiFileText },
  { label: "Blog", href: "/blog", icon: FiBookOpen },
  { label: "Contact", href: "/contact", icon: FiMail },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="navbar mx-auto w-full max-w-7xl bg-base-100/70 px-4 backdrop-blur lg:px-6 border border-base-300/80 rounded-4xl">
        <div className="navbar-start">
          <button
            type="button"
            className="mr-2 rounded-xl p-2 transition hover:bg-base-200/60 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <FiMenu className="size-5" />
          </button>
          <Link href="/" className="text-xl">
            <Logo />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-2 rounded-xl ${
                      active ? "bg-base-content/10 font-semibold" : ""
                    }`}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end">
          <ThemeSwitcher />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/45 transition-opacity ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close navigation menu overlay"
        />

        <aside
          className={`liquid-shell absolute left-0 top-0 h-full w-72 border-r border-base-300/70 p-4 shadow-xl transition-transform duration-300 border-l-0 !rounded-l-none !rounded-tl-none !rounded-bl-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <Link
              href="/"
              className="rounded-xl px-2 py-1 text-center text-xl"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Logo />
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close navigation menu"
            >
              <FiX className="size-5" />
            </button>
          </div>

          <ul className="menu w-full gap-1 rounded-box bg-base-100/0">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`inline-flex items-center gap-2 rounded-xl ${
                      active ? "bg-base-content/10 font-semibold" : ""
                    }`}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
