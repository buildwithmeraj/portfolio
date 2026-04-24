import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import EmptyState from "@/components/shared/EmptyState";
import PageIntro from "@/components/shared/PageIntro";
import {
  getBlogCategories,
  getPublishedBlogPosts,
} from "@/lib/public-content";

export const dynamic = "force-dynamic";

const BlogPage = async () => {
  const [categories, posts] = await Promise.all([
    getBlogCategories(),
    getPublishedBlogPosts(),
  ]);

  return (
    <section className="space-y-6 py-2 md:space-y-8">
      <PageIntro title="Blog" description="Writing on development, architecture, and practical engineering." />
      <div className="reveal">
        <BlogCategoryFilter categories={categories} />
      </div>

      {!posts.length ? (
        <EmptyState message="No published posts yet." className="p-8" centered />
      ) : (
        <BlogPostsGrid posts={posts} />
      )}
    </section>
  );
};

export default BlogPage;
