import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";

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

export async function GET(request) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const db = await getDb();
    const projects = await db
      .collection("projects")
      .aggregate([
        { $sort: { order: 1, createdAt: -1 } },
        {
          $lookup: {
            from: "skills",
            localField: "skillObjectIds",
            foreignField: "_id",
            as: "skills",
          },
        },
        {
          $project: {
            title: 1,
            summary: 1,
            thumbnailUrl: 1,
            liveUrl: 1,
            repoUrl: 1,
            order: 1,
            isFeatured: 1,
            createdAt: 1,
            updatedAt: 1,
            skillIds: 1,
            skills: {
              $map: {
                input: "$skills",
                as: "skill",
                in: {
                  _id: { $toString: "$$skill._id" },
                  name: "$$skill.name",
                  iconUrl: "$$skill.iconUrl",
                },
              },
            },
          },
        },
      ])
      .toArray();

    const payload = projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
    }));

    return NextResponse.json({ projects: payload });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { message: "Unable to fetch projects." },
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

    const now = new Date();
    const projectToInsert = {
      ...parsed.data,
      skillObjectIds: parsed.data.skillIds.map((id) => new ObjectId(id)),
      skillMeta,
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection("projects").insertOne(projectToInsert);
    return NextResponse.json(
      { message: "Project created.", id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { message: "Unable to create project." },
      { status: 500 }
    );
  }
}
