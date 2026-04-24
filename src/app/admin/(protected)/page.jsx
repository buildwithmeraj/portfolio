import Link from "next/link";
import {
  FiFileText,
  FiFolder,
  FiLayers,
  FiMail,
  FiTag,
  FiBarChart2,
} from "react-icons/fi";

const AdminDashboardPage = () => {
  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="my-2 text-sm opacity-80">
          Manage blog content, portfolio entities, and admin resources.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Link
          href="/admin/blog/categories"
          className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:border-primary"
        >
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FiTag />
            Categories
          </div>
          <p className="mt-2 text-sm opacity-80">Manage blog categories.</p>
        </Link>

        <Link
          href="/admin/blog/posts"
          className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:border-primary"
        >
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FiBarChart2 className="size-5" />
            Posts
          </div>
          <p className="mt-2 text-sm opacity-80">Manage blog posts.</p>
        </Link>

        <Link
          href="/admin/skills"
          className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:border-primary"
        >
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FiLayers className="size-5" />
            Skills
          </div>
          <p className="mt-2 text-sm opacity-80">
            Add and update skill records.
          </p>
        </Link>

        <Link
          href="/admin/projects"
          className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:border-primary"
        >
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FiFolder className="size-5" />
            Projects
          </div>
          <p className="mt-2 text-sm opacity-80">
            Manage projects and linked skills.
          </p>
        </Link>

        <Link
          href="/admin/emails"
          className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:border-primary"
        >
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FiMail className="size-5" />
            Emails
          </div>
          <p className="mt-2 text-sm opacity-80">
            Store and update email account data.
          </p>
        </Link>

        <Link
          href="/admin/resumes"
          className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:border-primary"
        >
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FiFileText className="size-5" />
            Resumes
          </div>
          <p className="mt-2 text-sm opacity-80">
            Manage resume links and ordering.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
