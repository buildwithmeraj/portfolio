const ResumeCardSkeleton = () => {
  return (
    <article className="relative rounded-2xl border border-base-300/90 bg-base-100/80 p-5 shadow-sm backdrop-blur">
      <div className="skeleton h-7 w-3/4 rounded-xl" />
      <div className="mt-2 skeleton h-3 w-40 rounded-xl" />
      <div className="mt-4 flex gap-2">
        <div className="skeleton h-9 w-20 rounded-xl" />
        <div className="skeleton h-9 w-24 rounded-xl" />
      </div>
      <div className="skeleton absolute bottom-3 right-3 h-16 w-16 rounded-2xl opacity-40" />
    </article>
  );
};

export default ResumeCardSkeleton;
