import PageIntroSkeleton from "@/components/skeleton/PageIntroSkeleton";
import ProjectCardSkeleton from "@/components/skeleton/ProjectCardSkeleton";

export default function Loading() {
  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <PageIntroSkeleton />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
