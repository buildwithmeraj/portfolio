import { notFound } from "next/navigation";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import EmptyState from "@/components/shared/EmptyState";
import { getCategoryPosts } from "@/lib/public-content";
import { FiInfo } from "react-icons/fi";

export const dynamic = "force-dynamic";

const BlogCategoryPage = async ({ params }) => {
  const resolvedParams = await params;
  const data = await getCategoryPosts(resolvedParams?.slug);

  if (!data) {
    notFound();
  }

  const { category, posts } = data;

  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <div className="reveal">
        <div className="flex gap-2 items-end">
          <h1 className="text-3xl font-black md:text-5xl">
            {category.title} ({posts.length})
          </h1>
          <p className="text-xs uppercase tracking-widest opacity-70">
            (Category)
          </p>
        </div>
      </div>

      {category.description ? (
        <p className="reveal opacity-80 alert alert-info py-4">
          <FiInfo className="inline mb-0.5 mr-2" />
          {category.description}
        </p>
      ) : null}

      {!posts.length ? (
        <EmptyState
          message="No published posts in this category yet."
          className="p-8"
          centered
        />
      ) : (
        <BlogPostsGrid posts={posts} />
      )}
    </section>
  );
};

export default BlogCategoryPage;
