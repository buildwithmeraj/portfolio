import PageIntroSkeleton from "@/components/skeleton/PageIntroSkeleton";
import ResumeCardSkeleton from "@/components/skeleton/ResumeCardSkeleton";

export default function Loading() {
  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <PageIntroSkeleton />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <ResumeCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
