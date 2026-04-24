import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

const ProtectedAdminLayout = async ({ children }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const payload = await verifyAdminToken(token);

  if (!payload) {
    redirect("/admin/login");
  }

  return (
    <div>
      <section className="mx-auto w-full max-w-[1600px]">
        <div>
          <AdminBreadcrumbs />
        </div>
        {children}
      </section>
    </div>
  );
};

export default ProtectedAdminLayout;
