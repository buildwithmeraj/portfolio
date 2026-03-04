import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    const categories = await db
      .collection("blogCategories")
      .find({})
      .project({ title: 1, slug: 1, description: 1 })
      .sort({ title: 1 })
      .toArray();

    return NextResponse.json({
      categories: categories.map((category) => ({
        ...category,
        _id: category._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch public blog categories:", error);
    return NextResponse.json(
      { message: "Unable to fetch categories." },
      { status: 500 }
    );
  }
}
