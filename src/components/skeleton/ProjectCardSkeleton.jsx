const ProjectCardSkeleton = () => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-base-300/90 bg-base-100/80 p-4 shadow-sm backdrop-blur">
      <div className="skeleton h-52 w-full rounded-2xl" />
      <div className="mt-6 space-y-3">
        <div className="skeleton h-8 w-3/4 rounded-xl" />
        <div className="skeleton h-4 w-full rounded-xl" />
        <div className="skeleton h-4 w-full rounded-xl" />
        <div className="skeleton h-4 w-4/5 rounded-xl" />
      </div>
      <div className="mt-auto flex gap-1 pt-3">
        <div className="skeleton h-5 w-14 rounded-full" />
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-5 w-12 rounded-full" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="skeleton h-10 flex-1 rounded-xl" />
        <div className="skeleton h-10 flex-1 rounded-xl" />
      </div>
    </article>
  );
};

export default ProjectCardSkeleton;
