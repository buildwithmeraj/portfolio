import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiCode,
  FiDatabase,
  FiMail,
  FiServer,
} from "react-icons/fi";
import { FaLaptopCode } from "react-icons/fa6";

const highlights = [
  {
    title: "Frontend",
    detail:
      "Accessible interfaces, responsive systems, and UX-driven implementation.",
    icon: FiCode,
  },
  {
    title: "Backend",
    detail: "Scalable APIs, auth flows, and maintainable service architecture.",
    icon: FiServer,
  },
  {
    title: "Data",
    detail: "Schema planning and query tuning for real production workloads.",
    icon: FiDatabase,
  },
];

const stack = [
  "Next.js",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "TailwindCSS",
  "JavaScript",
  "MySQL",
  "PHP",
  "Laravel",
];

const HomeAboutSection = ({ projectsCount, skillsCount, postsCount }) => {
  return (
    <section className="reveal rounded-[2rem] backdrop-blur-xl">
      <div className="grid gap-5 xl:grid-cols-12">
        <article className="surface-card xl:col-span-8 p-6 md:p-8">
          <h1 className="max-w-4xl text-balance text-3xl font-black leading-tight md:text-5xl">
            Merajul Islam
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 font-semibold text-primary">
            <FaLaptopCode size={20} />
            Full Stack Developer
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 opacity-80 md:text-base">
            I build production-ready web applications that balance clean user
            experience, reliable backend logic, and maintainable codebases. My
            primary stack centers on Next.js, React, Node.js, and MongoDB.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/projects" className="btn btn-primary">
              View Projects
              <FiArrowUpRight className="size-5" />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              <FiMail className="size-4" />
              Contact Me
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-base-300/80 bg-base-100/65 px-4 py-3 text-center">
              <p className="text-2xl font-bold leading-none">
                {projectsCount}+
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-70">
                Projects
              </p>
            </div>
            <div className="rounded-2xl border border-base-300/80 bg-base-100/65 px-4 py-3 text-center">
              <p className="text-2xl font-bold leading-none">{skillsCount}+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-70">
                Skills
              </p>
            </div>
            <div className="rounded-2xl border border-base-300/80 bg-base-100/65 px-4 py-3 text-center">
              <p className="text-2xl font-bold leading-none">{postsCount}+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-70">
                Posts
              </p>
            </div>
          </div>
        </article>

        <aside className="space-y-5 xl:col-span-4">
          <article className="">
            <div className="rounded-3xl">
              <Image
                src="/images/profile.png"
                alt="Meraj profile"
                className="mx-auto h-60 w-60 rounded-full object-cover"
                width={600}
                height={600}
                priority
              />
            </div>
          </article>

          <article className="surface-card p-5">
            <h2 className="text-lg font-semibold">Core Stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="badge badge-primary badge-outline">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </aside>

        <div className="grid gap-4 md:grid-cols-3 xl:col-span-12">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="surface-card p-5 relative overflow-hidden"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 opacity-75 pr-12">
                  {item.detail}
                </p>
                <Icon className="size-16 absolute top-4 right-2 text-primary/50" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;
