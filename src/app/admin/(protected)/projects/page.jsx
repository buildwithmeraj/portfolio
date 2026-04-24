import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import AdminProjectsTable from "@/components/admin/AdminProjectsTable";

export const dynamic = "force-dynamic";

const AdminProjectsPage = () => {
  return (
    <section className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Projects Management</h1>
          <p className="text-sm opacity-80">
            Add, edit, and delete projects with selected skills.
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn btn-primary">
          <FiPlus className="size-4" />
          Add Project
        </Link>
      </div>
      <AdminProjectsTable />
    </section>
  );
};

export default AdminProjectsPage;
