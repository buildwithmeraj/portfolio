const SkillCardSkeleton = () => {
  return (
    <article className="rounded-2xl border border-base-300/90 bg-base-100/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-md" />
        <div>
          <div className="skeleton h-4 w-24 rounded-xl" />
          <div className="mt-2 skeleton h-3 w-20 rounded-xl" />
        </div>
      </div>
    </article>
  );
};

export default SkillCardSkeleton;
