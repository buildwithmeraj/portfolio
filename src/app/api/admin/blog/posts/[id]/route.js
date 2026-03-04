import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";
import { generateUniqueSlug } from "@/lib/slug";

function parseId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
}

async function getParamId(params) {
  const resolvedParams = await params;
  return resolvedParams?.id;
}

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

export async function GET(request, { params }) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const id = await getParamId(params);
  const objectId = parseId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Invalid post id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const post = await db.collection("blogPosts").findOne({ _id: objectId });
    if (!post) {
      return NextResponse.json({ message: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({
      post: { ...post, _id: post._id.toString() },
    });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json({ message: "Unable to fetch post." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const id = await getParamId(params);
  const objectId = parseId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Invalid post id." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = normalizePostInput(body);
    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("blogPosts").createIndex({ slug: 1 }, { unique: true });
    const existing = await db.collection("blogPosts").findOne({ _id: objectId });
    if (!existing) {
      return NextResponse.json({ message: "Post not found." }, { status: 404 });
    }

    const category = await getCategorySnapshot(db, parsed.data.categoryId);
    if (!category) {
      return NextResponse.json({ message: "Category not found." }, { status: 400 });
    }

    const slug = await generateUniqueSlug({
      db,
      collectionName: "blogPosts",
      title: parsed.data.title,
      excludeId: objectId,
    });

    const nextPublishedAt =
      parsed.data.status === "published"
        ? parsed.data.publishedAt || existing.publishedAt || new Date()
        : parsed.data.publishedAt;

    await db.collection("blogPosts").updateOne(
      { _id: objectId },
      {
        $set: {
          ...parsed.data,
          slug,
          category,
          publishedAt: nextPublishedAt,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: "Post updated." });
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ message: "Unable to update post." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const id = await getParamId(params);
  const objectId = parseId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Invalid post id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db.collection("blogPosts").deleteOne({ _id: objectId });
    if (!result.deletedCount) {
      return NextResponse.json({ message: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted." });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ message: "Unable to delete post." }, { status: 500 });
  }
}
