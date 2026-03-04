import BlogPostCardSkeleton from "@/components/skeleton/BlogPostCardSkeleton";

export default function Loading() {
  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <div className="section-shell space-y-3">
        <div className="skeleton h-4 w-24 rounded-xl" />
        <div className="skeleton h-10 w-64 rounded-xl" />
        <div className="skeleton h-4 w-40 rounded-xl" />
      </div>
      <div className="skeleton h-4 w-2/3 rounded-xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <BlogPostCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
