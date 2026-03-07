import Link from "next/link";
import { FiArrowUpRight, FiGithub, FiLinkedin } from "react-icons/fi";

const links = [
  {
    href: "https://github.com/buildwithmeraj",
    label: "GitHub",
    icon: FiGithub,
  },
  {
    href: "https://www.linkedin.com/in/meraj-ul-islam/",
    label: "LinkedIn",
    icon: FiLinkedin,
  },
];

const Footer = () => {
  return (
    <footer className="mt-auto px-4 pb-24 pt-3 md:px-6 md:pt-4 lg:pb-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 rounded-4xl border border-base-300/80 bg-base-100/70 p-5 backdrop-blur text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="text-sm opacity-75">
          Copyright © {new Date().getFullYear()} Merajul Islam. All rights
          reserved.
        </p>
        <div className="flex items-center justify-center gap-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-ghost"
              >
                <Icon className="size-4" />
                {item.label}
                <FiArrowUpRight className="size-5.5" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
