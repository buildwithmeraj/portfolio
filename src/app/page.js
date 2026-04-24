import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { MdOutlineBuildCircle, MdPeopleAlt } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import SkillsGrid from "@/components/skills/SkillsGrid";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import EmptyState from "@/components/shared/EmptyState";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  getProjects,
  getPublishedBlogPosts,
  getSkills,
} from "@/lib/public-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [skills, projects, recentPosts] = await Promise.all([
    getSkills(),
    getProjects(),
    getPublishedBlogPosts(4),
  ]);

  const homeSkills = skills.slice(0, 6);
  const homeProjects = projects.slice(0, 4);

  return (
    <section className="space-y-12 py-2 md:space-y-14">
      <HomeAboutSection
        projectsCount={projects.length}
        skillsCount={skills.length}
        postsCount={recentPosts.length}
      />

      <div className="space-y-4">
        <SectionTitle title="Skills" href="/skills" />
        {!homeSkills.length ? (
          <EmptyState message="No skills added yet. Add skills from admin panel." />
        ) : (
          <SkillsGrid skills={homeSkills} />
        )}
      </div>

      <div className="space-y-4">
        <SectionTitle title="Projects" href="/projects" />
        {!homeProjects.length ? (
          <EmptyState message="No projects added yet. Add projects from admin panel." />
        ) : (
          <ProjectsGrid projects={homeProjects} maxSkills={4} />
        )}
      </div>

      <div className="space-y-4">
        <SectionTitle title="Blog" href="/blog" />
        {!recentPosts.length ? (
          <EmptyState message="No published posts yet. Add posts from admin panel." />
        ) : (
          <BlogPostsGrid posts={recentPosts} />
        )}
      </div>

      <div className="section-shell reveal">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Let&apos;s Build Something Great
            </h2>
            <p className="my-2 text-sm opacity-80">
              Open to freelance projects, collaborations, and full-time
              opportunities.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Start a Conversation
              <FiArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="flex items-center gap-2 text-primary/70">
            <MdPeopleAlt className="hidden lg:flex" size={100} />
            <FaHandshakeSimple className="hidden lg:flex" size={110} />
            <MdOutlineBuildCircle className="hidden md:flex" size={100} />
          </div>
        </div>
      </div>
    </section>
  );
}
