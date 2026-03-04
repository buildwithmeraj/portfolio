import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import AdminBlogPostsTable from "@/components/admin/AdminBlogPostsTable";

export const dynamic = "force-dynamic";

const AdminBlogPostsPage = () => {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Blog Posts</h1>
          <p className="text-sm opacity-80 my-1">
            Write posts with WYSIWYG editor and publish by category.
          </p>
        </div>
        <Link href="/admin/blog/posts/new" className="btn btn-primary">
          <FiPlus className="size-4" />
          Add Post
        </Link>
      </div>

      <AdminBlogPostsTable />
    </section>
  );
};

export default AdminBlogPostsPage;
