import BlogPostForm from "@/components/admin/BlogPostForm";

const CreateBlogPostPage = () => {
  return (
    <section className="mx-auto max-w-2xl space-y-2">
      <h1 className="text-2xl font-semibold">Create Blog Post</h1>
      <BlogPostForm mode="create" />
    </section>
  );
};

export default CreateBlogPostPage;
