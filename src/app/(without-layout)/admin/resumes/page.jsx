import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import AdminResumesTable from "@/components/admin/AdminResumesTable";

export const dynamic = "force-dynamic";

const AdminResumesPage = () => {
  return (
    <section className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Resumes Manage</h1>
          <p className="text-sm opacity-80 my-1">
            Manage Google Drive resume PDF links shown on the resume page.
          </p>
        </div>
        <Link href="/admin/resumes/new" className="btn btn-primary">
          <FiPlus className="size-4" />
          Add Resume
        </Link>
      </div>

      <AdminResumesTable />
    </section>
  );
};

export default AdminResumesPage;
