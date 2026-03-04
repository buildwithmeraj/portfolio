import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import BlogPostForm from "@/components/admin/BlogPostForm";

async function getPost(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDb();
  const post = await db
    .collection("blogPosts")
    .findOne({ _id: new ObjectId(id) });
  if (!post) {
    return null;
  }

  return {
    ...post,
    _id: post._id.toString(),
  };
}

const EditBlogPostPage = async ({ params }) => {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams?.id);
  if (!post) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl space-y-2">
      <h2 className="text-2xl font-semibold">Edit Blog Post</h2>
      <BlogPostForm mode="edit" postId={post._id} initialData={post} />
    </section>
  );
};

export default EditBlogPostPage;
