import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";
import { generateUniqueSlug } from "@/lib/slug";

function normalizePostInput(body) {
  const title = body?.title?.trim();
  const excerpt = body?.excerpt?.trim() || "";
  const contentHtml = body?.contentHtml?.trim();
  const coverImageUrl = body?.coverImageUrl?.trim() || "";
  const categoryId = body?.categoryId?.toString().trim();
  const status = body?.status === "published" ? "published" : "draft";
  const publishedAtValue = body?.publishedAt?.toString().trim();

  if (!title) {
    return { error: "Post title is required." };
  }

  if (!contentHtml) {
    return { error: "Post content is required." };
  }

  if (!categoryId || !ObjectId.isValid(categoryId)) {
    return { error: "Valid category is required." };
  }

  let publishedAt = null;
  if (publishedAtValue) {
    publishedAt = new Date(publishedAtValue);
    if (Number.isNaN(publishedAt.getTime())) {
      return { error: "Publish date/time is invalid." };
    }
  }

  return {
    data: {
      title,
      excerpt,
      contentHtml,
      coverImageUrl,
      categoryId,
      status,
      publishedAt,
    },
  };
}

async function getCategorySnapshot(db, categoryId) {
  const category = await db
    .collection("blogCategories")
    .findOne({ _id: new ObjectId(categoryId) });

  if (!category) {
    return null;
  }

  return {
    id: category._id.toString(),
    title: category.title,
    slug: category.slug,
  };
}

export async function GET(request) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const db = await getDb();
    await db.collection("blogPosts").createIndex({ slug: 1 }, { unique: true });

    const posts = await db
      .collection("blogPosts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      posts: posts.map((post) => ({ ...post, _id: post._id.toString() })),
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ message: "Unable to fetch posts." }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const parsed = normalizePostInput(body);
    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("blogPosts").createIndex({ slug: 1 }, { unique: true });

    const category = await getCategorySnapshot(db, parsed.data.categoryId);
    if (!category) {
      return NextResponse.json({ message: "Category not found." }, { status: 400 });
    }

    const slug = await generateUniqueSlug({
      db,
      collectionName: "blogPosts",
      title: parsed.data.title,
    });

    const now = new Date();
    const isPublished = parsed.data.status === "published";
    const result = await db.collection("blogPosts").insertOne({
      ...parsed.data,
      slug,
      category,
      publishedAt: isPublished ? parsed.data.publishedAt || now : parsed.data.publishedAt,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      { message: "Post created.", id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ message: "Unable to create post." }, { status: 500 });
  }
}
