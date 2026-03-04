import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";
import { extractGoogleDriveFileId } from "@/lib/google-drive";

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

export async function GET(request, { params }) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const id = await getParamId(params);
  const objectId = parseId(id);
  if (!objectId) {
    return NextResponse.json({ message: "Invalid resume id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const item = await db.collection("resumes").findOne({ _id: objectId });
    if (!item) {
      return NextResponse.json({ message: "Resume not found." }, { status: 404 });
    }

    return NextResponse.json({
      resume: { ...item, _id: item._id.toString() },
    });
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    return NextResponse.json({ message: "Unable to fetch resume." }, { status: 500 });
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
    return NextResponse.json({ message: "Invalid resume id." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = normalizeResumeInput(body);
    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("resumes").updateOne(
      { _id: objectId },
      {
        $set: {
          ...parsed.data,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ message: "Resume not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Resume updated." });
  } catch (error) {
    console.error("Failed to update resume:", error);
    return NextResponse.json({ message: "Unable to update resume." }, { status: 500 });
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
    return NextResponse.json({ message: "Invalid resume id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db.collection("resumes").deleteOne({ _id: objectId });
    if (!result.deletedCount) {
      return NextResponse.json({ message: "Resume not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Resume deleted." });
  } catch (error) {
    console.error("Failed to delete resume:", error);
    return NextResponse.json({ message: "Unable to delete resume." }, { status: 500 });
  }
}
