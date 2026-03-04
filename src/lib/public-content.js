import "server-only";
import { getDb } from "@/lib/db";

function mapWithStringId(items) {
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
}

export async function getSkills() {
  try {
    const db = await getDb();
    const skills = await db
      .collection("skills")
      .find({})
      .project({ name: 1, iconUrl: 1, level: 1, category: 1, order: 1 })
      .sort({ order: 1, level: -1, createdAt: -1 })
      .toArray();

    return mapWithStringId(skills);
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return [];
  }
}

export async function getProjects() {
  try {
    const db = await getDb();
    const projects = await db
      .collection("projects")
      .find({})
      .project({
        title: 1,
        summary: 1,
        thumbnailUrl: 1,
        liveUrl: 1,
        repoUrl: 1,
        isFeatured: 1,
        order: 1,
        skillMeta: 1,
      })
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return mapWithStringId(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getPublishedBlogPosts(limit) {
  try {
    const db = await getDb();
    const cursor = db
      .collection("blogPosts")
      .find({ status: "published" })
      .project({
        title: 1,
        slug: 1,
        excerpt: 1,
        coverImageUrl: 1,
        category: 1,
        publishedAt: 1,
        createdAt: 1,
      })
      .sort({ publishedAt: -1, createdAt: -1 });

    if (typeof limit === "number") {
      cursor.limit(limit);
    }

    const posts = await cursor.toArray();
    return mapWithStringId(posts);
  } catch (error) {
    console.error("Failed to fetch published blog posts:", error);
    return [];
  }
}

export async function getBlogCategories() {
  try {
    const db = await getDb();
    const categories = await db
      .collection("blogCategories")
      .find({})
      .project({ title: 1, slug: 1, description: 1 })
      .sort({ title: 1 })
      .toArray();

    return mapWithStringId(categories);
  } catch (error) {
    console.error("Failed to fetch blog categories:", error);
    return [];
  }
}

export async function getCategoryPosts(slug) {
  const db = await getDb();
  const category = await db.collection("blogCategories").findOne({ slug });

  if (!category) {
    return null;
  }

  const posts = await db
    .collection("blogPosts")
    .find({ status: "published", "category.slug": slug })
    .project({
      title: 1,
      slug: 1,
      excerpt: 1,
      coverImageUrl: 1,
      category: 1,
      publishedAt: 1,
      createdAt: 1,
    })
    .sort({ publishedAt: -1, createdAt: -1 })
    .toArray();

  return {
    category: {
      ...category,
      _id: category._id.toString(),
    },
    posts: mapWithStringId(posts),
  };
}

export async function getPostBySlug(slug) {
  const db = await getDb();
  const post = await db.collection("blogPosts").findOne({ slug, status: "published" });

  if (!post) {
    return null;
  }

  const relatedPosts = await db
    .collection("blogPosts")
    .find({
      status: "published",
      "category.slug": post.category?.slug,
      slug: { $ne: post.slug },
    })
    .project({ title: 1, slug: 1 })
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(3)
    .toArray();

  return {
    ...post,
    _id: post._id.toString(),
    relatedPosts: mapWithStringId(relatedPosts),
  };
}

export async function getActiveResumes() {
  try {
    const db = await getDb();
    const resumes = await db
      .collection("resumes")
      .find({ isActive: true })
      .project({ title: 1, driveUrl: 1, order: 1, updatedAt: 1 })
      .sort({ order: 1, updatedAt: -1 })
      .toArray();

    return mapWithStringId(resumes);
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    return [];
  }
}
