import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/public-content";
import { IoMdCalendar } from "react-icons/io";
import { FiBookOpen } from "react-icons/fi";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { sanitizeBlogHtml } from "@/lib/sanitize-blog-html";

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const dynamic = "force-dynamic";

const BlogPostPage = async ({ params }) => {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams?.slug);

  if (!post) {
    notFound();
  }

  const safeContentHtml = sanitizeBlogHtml(post.contentHtml);

  return (
    <article className="mx-auto space-y-6 py-2 md:space-y-8">
      <div className="reveal">
        <div className="space-y-2">
          <h1 className="text-balance text-3xl font-black md:text-5xl">
            {post.title}
          </h1>
          <p className="text-sm opacity-75 mt-3 flex items-center gap-1">
            <IoMdCalendar size={20} />
            {formatDate(post.publishedAt || post.createdAt)}
            <Link
              href={`/blog/category/${post.category?.slug || ""}`}
              className="badge badge-sm badge-secondary ml-6"
            >
              {post.category?.title || "Uncategorized"}
            </Link>
          </p>
        </div>
      </div>

      {post.coverImageUrl ? (
        <div className="surface-card reveal blog-content p-6 md:p-8 after:block after:clear-both after:content-['']">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            width={1200}
            height={680}
            className="mb-4 h-auto w-full rounded-2xl border border-base-300 object-contain lg:float-left lg:!mb-4 lg:!mr-8 lg:w-1/2 xl:!mr-10 xl:w-1/3"
          />
          <BlogPostContent html={safeContentHtml} />
        </div>
      ) : (
        <div className="surface-card reveal blog-content p-6 md:p-8">
          <BlogPostContent html={safeContentHtml} />
        </div>
      )}

      {!!post.relatedPosts?.length ? (
        <div className="surface-card reveal space-y-3 p-6">
          <h2 className="text-xl font-semibold">Related posts</h2>
          <div className="grid gap-2">
            {post.relatedPosts.map((item) => (
              <Link
                key={item._id}
                href={`/blog/${item.slug}`}
                className="hover:text-primary"
              >
                <FiBookOpen className="inline mb-0.5 mr-2" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
};

export default BlogPostPage;
