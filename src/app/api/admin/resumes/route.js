import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";
import { extractGoogleDriveFileId } from "@/lib/google-drive";

function normalizeResumeInput(body) {
  const title = body?.title?.trim();
  const driveUrl = body?.driveUrl?.trim();
  const order = Number(body?.order);
  const isActive = Boolean(body?.isActive);

  if (!title) {
    return { error: "Resume title is required." };
  }

  if (!driveUrl) {
    return { error: "Google Drive URL is required." };
  }

  if (!extractGoogleDriveFileId(driveUrl)) {
    return { error: "Provide a valid Google Drive file URL." };
  }

  if (Number.isNaN(order)) {
    return { error: "Display order must be a valid number." };
  }

  return {
    data: {
      title,
      driveUrl,
      order,
      isActive,
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
    const resumes = await db
      .collection("resumes")
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json({
      resumes: resumes.map((item) => ({ ...item, _id: item._id.toString() })),
    });
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    return NextResponse.json({ message: "Unable to fetch resumes." }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const parsed = normalizeResumeInput(body);
    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    const now = new Date();
    const result = await db.collection("resumes").insertOne({
      ...parsed.data,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      { message: "Resume created.", id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create resume:", error);
    return NextResponse.json({ message: "Unable to create resume." }, { status: 500 });
  }
}
