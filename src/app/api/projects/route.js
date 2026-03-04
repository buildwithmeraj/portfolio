import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
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
        order: 1,
        isFeatured: 1,
        skillMeta: 1,
      })
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    const payload = projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
    }));

    return NextResponse.json({ projects: payload });
  } catch (error) {
    console.error("Failed to fetch public projects:", error);
    return NextResponse.json(
      { message: "Unable to fetch projects." },
      { status: 500 }
    );
  }
}
