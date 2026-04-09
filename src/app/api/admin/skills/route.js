import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";

function normalizeSkillInput(body) {
  const name = body?.name?.trim();
  const iconUrl = body?.iconUrl?.trim();
  const category = body?.category?.trim() || "General";
  const order = Number(body?.order);
  const isFeatured = Boolean(body?.isFeatured);

  if (!name) {
    return { error: "Skill name is required." };
  }

  if (!iconUrl) {
    return { error: "Skill icon URL is required." };
  }

  if (Number.isNaN(order)) {
    return { error: "Display order must be a valid number." };
  }

  return {
    data: {
      name,
      iconUrl,
      category,
      order,
      isFeatured,
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
    const skills = await db
      .collection("skills")
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    const payload = skills.map((skill) => ({
      ...skill,
      _id: skill._id.toString(),
    }));

    return NextResponse.json({ skills: payload });
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return NextResponse.json(
      { message: "Unable to fetch skills." },
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
    const parsed = normalizeSkillInput(body);

    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    const now = new Date();
    const skillToInsert = {
      ...parsed.data,
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection("skills").insertOne(skillToInsert);
    return NextResponse.json(
      { message: "Skill created.", id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create skill:", error);
    return NextResponse.json(
      { message: "Unable to create skill." },
      { status: 500 }
    );
  }
}
