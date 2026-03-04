import Link from "next/link";
import { FiFolder, FiTag } from "react-icons/fi";

const AdminBlogPage = () => {
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Blog Management</h1>
        <p className="text-sm opacity-80 my-3">
          Manage blog categories and posts from one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/blog/categories"
          className="rounded-xl border border-base-300 bg-base-100 p-6 shadow transition hover:border-primary"
        >
          <div className="flex items-center gap-3">
            <FiTag className="size-5" />
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>
          <p className="mt-2 text-sm opacity-80">
            Create and update blog categories. Category slug is auto-generated
            from title.
          </p>
        </Link>

        <Link
          href="/admin/blog/posts"
          className="rounded-xl border border-base-300 bg-base-100 p-6 shadow transition hover:border-primary"
        >
          <div className="flex items-center gap-3">
            <FiFolder className="size-5" />
            <h2 className="text-lg font-semibold">Posts</h2>
          </div>
          <p className="mt-2 text-sm opacity-80">
            Write blog posts with WYSIWYG editor and ImgBB image uploads.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default AdminBlogPage;
