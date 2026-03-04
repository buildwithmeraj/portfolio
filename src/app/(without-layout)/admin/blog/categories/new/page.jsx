import BlogCategoryForm from "@/components/admin/BlogCategoryForm";

const CreateBlogCategoryPage = () => {
  return (
    <section className="mx-auto max-w-xl space-y-3">
      <div>
        <h2 className="text-2xl font-semibold">Create Category</h2>
      </div>
      <BlogCategoryForm mode="create" />
    </section>
  );
};

export default CreateBlogCategoryPage;
