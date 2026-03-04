import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";

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

function normalizeEmailInput(body) {
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password?.toString() || "";
  const used = Boolean(body?.used);

  if (!email) {
    return { error: "Email is required." };
  }

  if (!password) {
    return { error: "Password is required." };
  }

  return {
    data: {
      email,
      password,
      used,
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
    return NextResponse.json({ message: "Invalid email id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const item = await db.collection("emailAccounts").findOne({ _id: objectId });
    if (!item) {
      return NextResponse.json({ message: "Email account not found." }, { status: 404 });
    }

    return NextResponse.json({
      email: { ...item, _id: item._id.toString() },
    });
  } catch (error) {
    console.error("Failed to fetch email account:", error);
    return NextResponse.json(
      { message: "Unable to fetch email account." },
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
    return NextResponse.json({ message: "Invalid email id." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = normalizeEmailInput(body);
    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("emailAccounts").createIndex({ email: 1 }, { unique: true });
    const result = await db.collection("emailAccounts").updateOne(
      { _id: objectId },
      {
        $set: {
          ...parsed.data,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ message: "Email account not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Email account updated." });
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json({ message: "Email already exists." }, { status: 400 });
    }
    console.error("Failed to update email account:", error);
    return NextResponse.json(
      { message: "Unable to update email account." },
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
    return NextResponse.json({ message: "Invalid email id." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db.collection("emailAccounts").deleteOne({ _id: objectId });
    if (!result.deletedCount) {
      return NextResponse.json({ message: "Email account not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Email account deleted." });
  } catch (error) {
    console.error("Failed to delete email account:", error);
    return NextResponse.json(
      { message: "Unable to delete email account." },
      { status: 500 }
    );
  }
}
