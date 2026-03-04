import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import AdminSkillsTable from "@/components/admin/AdminSkillsTable";

export const dynamic = "force-dynamic";

const AdminSkillsPage = () => {
  return (
    <section className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Skills Management</h1>
          <p className="text-sm opacity-80">
            Add, update, and remove skills shown in your portfolio.
          </p>
        </div>
        <Link href="/admin/skills/new" className="btn btn-primary">
          <FiPlus className="size-4" />
          Add Skill
        </Link>
      </div>

      <AdminSkillsTable />
    </section>
  );
};

export default AdminSkillsPage;
