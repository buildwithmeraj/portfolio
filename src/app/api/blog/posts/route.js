import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    const posts = await db
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
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();

    return NextResponse.json({
      posts: posts.map((post) => ({ ...post, _id: post._id.toString() })),
    });
  } catch (error) {
    console.error("Failed to fetch public posts:", error);
    return NextResponse.json({ message: "Unable to fetch posts." }, { status: 500 });
  }
}
