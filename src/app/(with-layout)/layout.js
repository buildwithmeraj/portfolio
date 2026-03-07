import Navbar from "@/components/shared/Navbar";
import "../globals.css";
import "highlight.js/styles/github-dark.css";
import Footer from "@/components/shared/Footer";
import Providers from "@/providers/Providers";
import MobileDock from "@/components/shared/MobileDock";

export const metadata = {
  title: "Portfolio of Merajul Islam",
  description:
    "meraj.pro is the portfolio of Merajul Islam, a Web Developer with expertise in React, Next.js, and Node.js, PHP and Laravel. Explore projects, skills, and contact information.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
              <Navbar />
            </header>

            <main className="grow px-4 pb-10 pt-6 md:px-6 md:pb-14 lg:pb-0 lg:pt-10">
              <div className="mx-auto w-full max-w-7xl">{children}</div>
            </main>

            <Footer />
            <MobileDock />
          </div>
        </Providers>
      </body>
    </html>
  );
}
