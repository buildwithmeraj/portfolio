import { NextResponse } from "next/server";
import { sendContactMail } from "@/lib/mailer";

function normalizeField(value) {
  return value?.toString().trim() || "";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = normalizeField(body?.name);
    const email = normalizeField(body?.email).toLowerCase();
    const subject = normalizeField(body?.subject);
    const message = normalizeField(body?.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json(
        { message: "Message should be at least 10 characters." },
        { status: 400 }
      );
    }

    await sendContactMail({ name, email, subject, message });
    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact mail error:", error);
    return NextResponse.json(
      { message: "Unable to send message right now." },
      { status: 500 }
    );
  }
}
