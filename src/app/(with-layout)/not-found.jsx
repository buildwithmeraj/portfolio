import Link from "next/link";
import { FiArrowUpRight, FiHome, FiMail } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-2 md:min-h-[70vh]">
      <div className="section-shell text-center">
        <h1 className="mt-2 text-balance text-3xl font-black text-error leading-tight">
          Page Not Found
        </h1>
        <p className="mt-3 text-lg font-semibold uppercase text-primary">
          Error 404
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 opacity-80 md:text-base">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link href="/" className="btn btn-primary">
            <FiHome className="size-4" />
            Go Home
          </Link>
          <Link href="/projects" className="btn btn-outline">
            Explore Projects
            <FiArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
