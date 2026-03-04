import Link from "next/link";
import { FiArrowUpRight, FiHome, FiLock } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="space-y-6 p-4 md:space-y-8">
      <div className="section-shell text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Error 404
        </p>
        <h1 className="mt-2 text-balance text-3xl font-black leading-tight md:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 opacity-80 md:text-base">
          This route is not available. Use one of the links below.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link href="/" className="btn btn-primary">
            <FiHome className="size-4" />
            Go Home
          </Link>
          <Link href="/admin" className="btn btn-outline">
            Admin Dashboard
            <FiLock className="size-4" />
          </Link>
          <Link href="/admin/login" className="btn btn-ghost">
            Admin Login
            <FiArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
