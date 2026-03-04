import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    const skills = await db
      .collection("skills")
      .find({})
      .project({
        name: 1,
        iconUrl: 1,
        category: 1,
        level: 1,
        order: 1,
        isFeatured: 1,
      })
      .sort({ order: 1, level: -1, createdAt: -1 })
      .toArray();

    const payload = skills.map((skill) => ({
      ...skill,
      _id: skill._id.toString(),
    }));

    return NextResponse.json({ skills: payload });
  } catch (error) {
    console.error("Failed to fetch public skills:", error);
    return NextResponse.json(
      { message: "Unable to fetch skills." },
      { status: 500 }
    );
  }
}
