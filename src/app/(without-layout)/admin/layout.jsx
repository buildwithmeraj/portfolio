import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import Navbar from "@/components/shared/Navbar";
import "../../globals.css";
import Footer from "@/components/shared/Footer";
import Providers from "@/providers/Providers";
import MobileDock from "@/components/shared/MobileDock";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminLayout = async ({ children }) => {
  // Authentication is already handled by middleware (proxy.js)
  // No need to check again here

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased flex flex-col min-h-screen`}>
        <Providers>
          <header className="sticky top-0 z-50">
            <Navbar />
          </header>
          <main className="grow pb-24 lg:pb-0">
            <div className="drawer lg:drawer-open">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content min-h-screen bg-base-200/50">
                <nav className="navbar w-full bg-base-300">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-4"
                    >
                      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                      <path d="M9 4v16"></path>
                      <path d="M14 10l2 2l-2 2"></path>
                    </svg>
                  </label>
                  <div className="px-4 font-semibold">Admin Dashboard</div>
                </nav>
                <section className="p-4">{children}</section>
              </div>

              <div className="drawer-side is-drawer-close:overflow-visible">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                />
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                  <ul className="menu w-full grow">
                    <AdminSidebar />
                  </ul>
                  <div className="w-full mt-2 border-t border-base-content/30 pt-1">
                    <AdminLogoutButton />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
          <MobileDock />
        </Providers>
      </body>
    </html>
  );
};

export default AdminLayout;
