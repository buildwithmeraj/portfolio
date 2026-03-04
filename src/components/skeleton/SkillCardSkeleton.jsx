const SkillCardSkeleton = () => {
  return (
    <article className="rounded-2xl border border-base-300/90 bg-base-100/80 p-4 backdrop-blur">
      <div className="mb-3 flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-md" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-24 rounded-xl" />
          <div className="skeleton h-3 w-20 rounded-xl" />
        </div>
      </div>
      <div className="skeleton h-2 w-full rounded-xl" />
      <div className="mt-2 skeleton h-4 w-28 rounded-xl" />
    </article>
  );
};

export default SkillCardSkeleton;
