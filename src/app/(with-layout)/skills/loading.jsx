import PageIntroSkeleton from "@/components/skeleton/PageIntroSkeleton";
import SkillCardSkeleton from "@/components/skeleton/SkillCardSkeleton";

export default function Loading() {
  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <PageIntroSkeleton />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkillCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
