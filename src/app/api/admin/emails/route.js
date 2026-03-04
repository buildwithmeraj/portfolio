import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdminRequest } from "@/lib/admin-request";

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

export async function GET(request) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const db = await getDb();
    await db.collection("emailAccounts").createIndex({ email: 1 }, { unique: true });

    const emails = await db
      .collection("emailAccounts")
      .find({})
      .sort({ used: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json({
      emails: emails.map((item) => ({ ...item, _id: item._id.toString() })),
    });
  } catch (error) {
    console.error("Failed to fetch email accounts:", error);
    return NextResponse.json(
      { message: "Unable to fetch email accounts." },
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
    const parsed = normalizeEmailInput(body);
    if (parsed.error) {
      return NextResponse.json({ message: parsed.error }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("emailAccounts").createIndex({ email: 1 }, { unique: true });

    const now = new Date();
    const result = await db.collection("emailAccounts").insertOne({
      ...parsed.data,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      { message: "Email account created.", id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json({ message: "Email already exists." }, { status: 400 });
    }
    console.error("Failed to create email account:", error);
    return NextResponse.json(
      { message: "Unable to create email account." },
      { status: 500 }
    );
  }
}
