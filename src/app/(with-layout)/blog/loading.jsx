import PageIntroSkeleton from "@/components/skeleton/PageIntroSkeleton";
import BlogPostCardSkeleton from "@/components/skeleton/BlogPostCardSkeleton";

export default function Loading() {
  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <PageIntroSkeleton />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-9 w-24 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <BlogPostCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
