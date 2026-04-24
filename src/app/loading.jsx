import HomeAboutSkeleton from "@/components/skeleton/HomeAboutSkeleton";
import SectionTitleSkeleton from "@/components/skeleton/SectionTitleSkeleton";
import SkillCardSkeleton from "@/components/skeleton/SkillCardSkeleton";
import ProjectCardSkeleton from "@/components/skeleton/ProjectCardSkeleton";
import BlogPostCardSkeleton from "@/components/skeleton/BlogPostCardSkeleton";

export default function Loading() {
  return (
    <section className="space-y-12 py-2 md:space-y-14">
      <HomeAboutSkeleton />

      <div className="space-y-4">
        <SectionTitleSkeleton />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkillCardSkeleton key={`skill-${i}`} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionTitleSkeleton />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProjectCardSkeleton key={`project-${i}`} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionTitleSkeleton />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <BlogPostCardSkeleton key={`post-${i}`} />
          ))}
        </div>
      </div>

      <div className="section-shell">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-3">
            <div className="skeleton h-8 w-72 rounded-xl md:h-10 md:w-96" />
            <div className="skeleton h-4 w-80 max-w-full rounded-xl" />
            <div className="skeleton h-4 w-72 max-w-full rounded-xl" />
            <div className="skeleton h-10 w-52 rounded-xl" />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="skeleton h-20 w-20 rounded-2xl opacity-50" />
            <div className="skeleton h-24 w-24 rounded-2xl opacity-50" />
            <div className="skeleton h-20 w-20 rounded-2xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
