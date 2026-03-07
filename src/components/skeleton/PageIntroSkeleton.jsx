const PageIntroSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="skeleton h-10 w-64 rounded-xl md:h-12 md:w-80" />
      <div className="skeleton h-4 w-full max-w-2xl rounded-xl" />
      <div className="skeleton h-4 w-2/3 max-w-xl rounded-xl" />
      <div className="skeleton h-px w-full rounded-none opacity-40" />
    </div>
  );
};

export default PageIntroSkeleton;
