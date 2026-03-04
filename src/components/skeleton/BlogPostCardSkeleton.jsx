const BlogPostCardSkeleton = () => {
  return (
    <article className="rounded-2xl border border-base-300/90 bg-base-100/80 p-4 backdrop-blur">
      <div className="skeleton h-52 w-full rounded-2xl" />
      <div className="mt-4 space-y-3">
        <div className="skeleton h-8 w-5/6 rounded-xl" />
        <div className="skeleton h-4 w-full rounded-xl" />
        <div className="skeleton h-4 w-11/12 rounded-xl" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="skeleton h-9 w-24 rounded-xl" />
        <div className="skeleton h-4 w-24 rounded-xl" />
      </div>
    </article>
  );
};

export default BlogPostCardSkeleton;
