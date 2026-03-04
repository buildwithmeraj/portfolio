import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

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

const BlogPostCard = ({ post }) => {
  return (
    <article className="reveal group block h-full rounded-2xl border border-base-300/90 bg-base-100/80 p-4 shadow-sm backdrop-blur">
      <Link
        href={`/blog/${post.slug}`}
        className="block overflow-hidden rounded-2xl border border-base-300"
      >
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            height={300}
            width={400}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-52 w-full items-center justify-center bg-base-200">
            <span className="text-sm opacity-70">No cover image</span>
          </div>
        )}
      </Link>

      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="mb-2 mt-4 text-2xl font-semibold tracking-tight text-base-content">
          {post.title}
        </h2>
      </Link>

      {post.excerpt ? (
        <p className="mb-6 line-clamp-3 text-sm text-base-content/75">
          {post.excerpt}
        </p>
      ) : (
        <p className="mb-6 text-sm text-base-content/60">
          {formatDate(post.publishedAt || post.createdAt)}
        </p>
      )}

      <div className="flex items-center justify-between">
        <Link href={`/blog/${post.slug}`} className="btn btn-primary btn-soft">
          Read more
          <FiArrowRight className="size-4" />
        </Link>
        <p className="text-sm text-base-content/60">
          {formatDate(post.publishedAt || post.createdAt)}
        </p>
      </div>
    </article>
  );
};

export default BlogPostCard;
