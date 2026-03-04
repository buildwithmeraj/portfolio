import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import AdminBlogCategoriesTable from "@/components/admin/AdminBlogCategoriesTable";

export const dynamic = "force-dynamic";

const AdminBlogCategoriesPage = () => {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Blog Categories</h1>
          <p className="text-sm opacity-80 my-1">
            Create and manage your blog categories.
          </p>
        </div>
        <Link href="/admin/blog/categories/new" className="btn btn-primary">
          <FiPlus className="size-4" />
          Add Category
        </Link>
      </div>

      <AdminBlogCategoriesTable />
    </section>
  );
};

export default AdminBlogCategoriesPage;
