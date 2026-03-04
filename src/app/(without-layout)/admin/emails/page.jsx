import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import AdminEmailsTable from "@/components/admin/AdminEmailsTable";

export const dynamic = "force-dynamic";

const AdminEmailsPage = () => {
  return (
    <section className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Email Management</h1>
          <p className="text-sm opacity-80">
            Store account email, password, and used status.
          </p>
        </div>
        <Link href="/admin/emails/new" className="btn btn-primary">
          <FiPlus className="size-4" />
          Add Email
        </Link>
      </div>

      <AdminEmailsTable />
    </section>
  );
};

export default AdminEmailsPage;
