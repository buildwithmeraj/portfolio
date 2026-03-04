import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";

function parseObjectId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
}

async function getParamId(params) {
  const resolvedParams = await params;
  return resolvedParams?.id;
}

function normalizeProjectInput(body) {
  const title = body?.title?.trim();
  const summary = body?.summary?.trim();
  const thumbnailUrl = body?.thumbnailUrl?.trim();
  const liveUrl = body?.liveUrl?.trim() || "";
  const repoUrl = body?.repoUrl?.trim() || "";
  const order = Number(body?.order);
  const isFeatured = Boolean(body?.isFeatured);
  const skillIds = Array.isArray(body?.skillIds)
    ? body.skillIds.map((id) => id?.toString().trim()).filter(Boolean)
    : [];

  if (!title) {
    return { error: "Project title is required." };
  }
  if (!summary) {
    return { error: "Project summary is required." };
  }
  if (!thumbnailUrl) {
    return { error: "Project thumbnail URL is required." };
  }
  if (Number.isNaN(order)) {
    return { error: "Display order must be a valid number." };
  }

  const invalidSkillId = skillIds.find((id) => !ObjectId.isValid(id));
  if (invalidSkillId) {
    return { error: "One or more selected skill IDs are invalid." };
  }

  return {
    data: {
      title,
      summary,
      thumbnailUrl,
      liveUrl,
      repoUrl,
      order,
      isFeatured,
      skillIds,
    },
  };
}

async function getProjectSkillMeta(db, skillIds) {
  if (!skillIds.length) {
    return [];
  }

  const objectIds = skillIds.map((id) => new ObjectId(id));
  const skills = await db
    .collection("skills")
    .find({ _id: { $in: objectIds } })
    .project({ name: 1, iconUrl: 1 })
    .toArray();

  if (skills.length !== objectIds.length) {
    return null;
  }

  return skills.map((skill) => ({
    _id: skill._id.toString(),
    name: skill.name,
    iconUrl: skill.iconUrl || "",
  }));
}

export async function GET(request, { params }) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const id = await getParamId(params);
  const objectId = parseObjectId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Invalid project id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const project = await db.collection("projects").findOne({ _id: objectId });
    if (!project) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({
      project: {
        ...project,
        _id: project._id.toString(),
      },
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return NextResponse.json(
      { message: "Unable to fetch project." },
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
  const objectId = parseObjectId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Invalid project id." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = normalizeProjectInput(body);
    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    const skillMeta = await getProjectSkillMeta(db, parsed.data.skillIds);
    if (skillMeta === null) {
      return NextResponse.json(
        { message: "Some selected skills were not found." },
        { status: 400 }
      );
    }

    const result = await db.collection("projects").updateOne(
      { _id: objectId },
      {
        $set: {
          ...parsed.data,
          skillObjectIds: parsed.data.skillIds.map((skillId) => new ObjectId(skillId)),
          skillMeta,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Project updated." });
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json(
      { message: "Unable to update project." },
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
  const objectId = parseObjectId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Invalid project id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db.collection("projects").deleteOne({ _id: objectId });
    if (!result.deletedCount) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted." });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { message: "Unable to delete project." },
      { status: 500 }
    );
  }
}
