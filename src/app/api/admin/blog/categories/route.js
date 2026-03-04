import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";
import { generateUniqueSlug } from "@/lib/slug";

function normalizeCategoryInput(body) {
  const title = body?.title?.trim();
  const description = body?.description?.trim() || "";

  if (!title) {
    return { error: "Category title is required." };
  }

  return {
    data: {
      title,
      description,
    },
  };
}

export async function GET(request) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const db = await getDb();
    await db.collection("blogCategories").createIndex({ slug: 1 }, { unique: true });

    const categories = await db
      .collection("blogCategories")
      .find({})
      .sort({ title: 1 })
      .toArray();

    return NextResponse.json({
      categories: categories.map((category) => ({
        ...category,
        _id: category._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch blog categories:", error);
    return NextResponse.json(
      { message: "Unable to fetch categories." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const parsed = normalizeCategoryInput(body);
    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("blogCategories").createIndex({ slug: 1 }, { unique: true });
    const slug = await generateUniqueSlug({
      db,
      collectionName: "blogCategories",
      title: parsed.data.title,
    });

    const now = new Date();
    const result = await db.collection("blogCategories").insertOne({
      ...parsed.data,
      slug,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      { message: "Category created.", id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create blog category:", error);
    return NextResponse.json(
      { message: "Unable to create category." },
      { status: 500 }
    );
  }
}
