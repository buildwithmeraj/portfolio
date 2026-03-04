import Link from "next/link";

const BlogCategoryFilter = ({ categories }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/blog" className="btn btn-sm btn-outline">
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/blog/category/${category.slug}`}
          className="btn btn-sm btn-ghost"
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default BlogCategoryFilter;
