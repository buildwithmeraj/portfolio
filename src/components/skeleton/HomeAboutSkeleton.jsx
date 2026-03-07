const HomeAboutSkeleton = () => {
  return (
    <section className="rounded-[2rem] backdrop-blur-xl">
      <div className="grid gap-5 xl:grid-cols-12">
        <article className="surface-card space-y-4 p-6 md:p-8 xl:col-span-8">
          <div className="skeleton h-12 w-3/4 rounded-2xl" />
          <div className="skeleton h-5 w-44 rounded-xl" />
          <div className="skeleton h-4 w-full rounded-xl" />
          <div className="skeleton h-4 w-5/6 rounded-xl" />
          <div className="flex gap-2 pt-1">
            <div className="skeleton h-10 w-32 rounded-xl" />
            <div className="skeleton h-10 w-28 rounded-xl" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="skeleton h-20 rounded-2xl" />
            <div className="skeleton h-20 rounded-2xl" />
            <div className="skeleton h-20 rounded-2xl" />
          </div>
        </article>

        <aside className="space-y-5 xl:col-span-4">
          <article>
            <div className="skeleton mx-auto h-60 w-60 rounded-full" />
          </article>
          <article className="surface-card space-y-3 p-5">
            <div className="skeleton h-6 w-28 rounded-xl" />
            <div className="flex flex-wrap gap-2">
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-6 w-16 rounded-full" />
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-6 w-12 rounded-full" />
              <div className="skeleton h-6 w-16 rounded-full" />
            </div>
          </article>
        </aside>

        <div className="grid gap-4 md:grid-cols-3 xl:col-span-12">
          <div className="surface-card space-y-3 p-5">
            <div className="skeleton h-4 w-28 rounded-xl" />
            <div className="skeleton h-4 w-full rounded-xl" />
            <div className="skeleton ml-auto h-12 w-12 rounded-2xl" />
          </div>
          <div className="surface-card space-y-3 p-5">
            <div className="skeleton h-4 w-28 rounded-xl" />
            <div className="skeleton h-4 w-full rounded-xl" />
            <div className="skeleton ml-auto h-12 w-12 rounded-2xl" />
          </div>
          <div className="surface-card space-y-3 p-5">
            <div className="skeleton h-4 w-28 rounded-xl" />
            <div className="skeleton h-4 w-full rounded-xl" />
            <div className="skeleton ml-auto h-12 w-12 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSkeleton;
