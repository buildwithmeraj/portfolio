import BlogPostCard from "@/components/blog/BlogPostCard";

const BlogPostsGrid = ({ posts }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post) => (
        <BlogPostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default BlogPostsGrid;
