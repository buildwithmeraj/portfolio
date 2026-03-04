import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

const AdminLoginPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const payload = await verifyAdminToken(token);

  if (payload) {
    redirect("/admin");
  }

  return (
    <section className="flex min-h-[85vh] items-center justify-center">
      <AdminLoginForm />
    </section>
  );
};

export default AdminLoginPage;
