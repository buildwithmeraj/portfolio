const BlogPostCardSkeleton = () => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-base-300/90 bg-base-100/80 p-4 shadow-sm backdrop-blur">
      <div className="overflow-hidden rounded-2xl border border-base-300">
        <div className="skeleton h-52 w-full rounded-none" />
      </div>
      <div className="mt-4 space-y-3">
        <div className="skeleton h-7 w-4/5 rounded-xl" />
        <div className="skeleton h-4 w-11/12 rounded-xl" />
        <div className="skeleton h-4 w-full rounded-xl" />
        <div className="skeleton h-4 w-5/6 rounded-xl opacity-80" />
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-base-300 pt-4">
        <div className="skeleton h-9 w-24 rounded-xl" />
        <div className="skeleton h-4 w-24 rounded-xl" />
      </div>
    </article>
  );
};

export default BlogPostCardSkeleton;
