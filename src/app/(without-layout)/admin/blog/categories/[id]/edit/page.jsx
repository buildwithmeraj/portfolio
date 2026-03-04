import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import BlogCategoryForm from "@/components/admin/BlogCategoryForm";

async function getCategory(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDb();
  const category = await db
    .collection("blogCategories")
    .findOne({ _id: new ObjectId(id) });

  if (!category) {
    return null;
  }

  return {
    ...category,
    _id: category._id.toString(),
  };
}

const EditBlogCategoryPage = async ({ params }) => {
  const resolvedParams = await params;
  const category = await getCategory(resolvedParams?.id);
  if (!category) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-xl space-y-3">
      <h2 className="text-2xl font-semibold">Edit Category</h2>
      <BlogCategoryForm
        mode="edit"
        categoryId={category._id}
        initialData={category}
      />
    </section>
  );
};

export default EditBlogCategoryPage;
