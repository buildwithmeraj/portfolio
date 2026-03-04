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

export async function GET(request, { params }) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const id = await getParamId(params);
  const objectId = parseId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Invalid category id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const category = await db.collection("blogCategories").findOne({ _id: objectId });
    if (!category) {
      return NextResponse.json({ message: "Category not found." }, { status: 404 });
    }

    return NextResponse.json({
      category: { ...category, _id: category._id.toString() },
    });
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return NextResponse.json(
      { message: "Unable to fetch category." },
      { status: 500 }
    );
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
    return NextResponse.json({ message: "Invalid category id." }, { status: 400 });
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
      excludeId: objectId,
    });

    const result = await db.collection("blogCategories").updateOne(
      { _id: objectId },
      {
        $set: {
          ...parsed.data,
          slug,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ message: "Category not found." }, { status: 404 });
    }

    await db.collection("blogPosts").updateMany(
      { categoryId: objectId.toString() },
      {
        $set: {
          "category.title": parsed.data.title,
          "category.slug": slug,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: "Category updated." });
  } catch (error) {
    console.error("Failed to update category:", error);
    return NextResponse.json(
      { message: "Unable to update category." },
      { status: 500 }
    );
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
    return NextResponse.json({ message: "Invalid category id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const inUse = await db
      .collection("blogPosts")
      .countDocuments({ categoryId: objectId.toString() });

    if (inUse > 0) {
      return NextResponse.json(
        { message: "Category is used by posts. Reassign posts first." },
        { status: 400 }
      );
    }

    const result = await db.collection("blogCategories").deleteOne({ _id: objectId });
    if (!result.deletedCount) {
      return NextResponse.json({ message: "Category not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted." });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json(
      { message: "Unable to delete category." },
      { status: 500 }
    );
  }
}
