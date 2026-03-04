import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin-request";

export async function POST(request) {
  const auth = await requireAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Missing IMGBB_API_KEY in environment." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "Image file is required." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const payload = new FormData();
    payload.append("image", base64Image);
    payload.append("name", file.name || "blog-image");

    const imgbbResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: payload,
      }
    );

    const data = await imgbbResponse.json();
    if (!imgbbResponse.ok || !data?.success) {
      return NextResponse.json(
        { message: data?.error?.message || "ImgBB upload failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      url: data.data?.url,
      displayUrl: data.data?.display_url,
      deleteUrl: data.data?.delete_url,
    });
  } catch (error) {
    console.error("ImgBB upload failed:", error);
    return NextResponse.json(
      { message: "Unable to upload image right now." },
      { status: 500 }
    );
  }
}
