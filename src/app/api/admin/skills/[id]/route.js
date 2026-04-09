import { ObjectId } from "mongodb";
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

export async function GET(request, { params }) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const id = await getParamId(params);
  const objectId = parseId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Invalid skill id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const skill = await db.collection("skills").findOne({ _id: objectId });

    if (!skill) {
      return NextResponse.json({ message: "Skill not found." }, { status: 404 });
    }

    return NextResponse.json({
      skill: { ...skill, _id: skill._id.toString() },
    });
  } catch (error) {
    console.error("Failed to fetch skill:", error);
    return NextResponse.json(
      { message: "Unable to fetch skill." },
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
    return NextResponse.json({ message: "Invalid skill id." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = normalizeSkillInput(body);

    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("skills").updateOne(
      { _id: objectId },
      {
        $set: {
          ...parsed.data,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ message: "Skill not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Skill updated." });
  } catch (error) {
    console.error("Failed to update skill:", error);
    return NextResponse.json(
      { message: "Unable to update skill." },
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
    return NextResponse.json({ message: "Invalid skill id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db.collection("skills").deleteOne({ _id: objectId });

    if (!result.deletedCount) {
      return NextResponse.json({ message: "Skill not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Skill deleted." });
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return NextResponse.json(
      { message: "Unable to delete skill." },
      { status: 500 }
    );
  }
}
