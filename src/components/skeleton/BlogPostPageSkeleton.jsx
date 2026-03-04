const BlogPostPageSkeleton = () => {
  return (
    <article className="mx-auto space-y-6 py-2 md:space-y-8">
      <div className="space-y-3">
        <div className="space-y-3">
          <div className="skeleton h-12 w-3/4 rounded-xl" />
          <div className="skeleton h-12 w-3/4 rounded-xl" />
          <div className="skeleton h-6 w-64 rounded-xl" />
        </div>
      </div>
      <div className="surface-card space-y-3 p-6 md:p-8">
        <div className="skeleton h-72 w-full rounded-2xl lg:float-left lg:mr-8 lg:w-1/2 xl:w-1/3" />
        <div className="skeleton h-5 w-full rounded-xl" />
        <div className="skeleton h-5 w-11/12 rounded-xl" />
        <div className="skeleton h-5 w-10/12 rounded-xl" />
        <div className="skeleton h-5 w-full rounded-xl" />
        <div className="clear-both" />
      </div>
      <div className="surface-card space-y-3 p-6">
        <div className="skeleton h-6 w-32 rounded-xl" />
        <div className="skeleton h-4 w-2/3 rounded-xl" />
        <div className="skeleton h-4 w-1/2 rounded-xl" />
      </div>
    </article>
  );
};

export default BlogPostPageSkeleton;
