import nodemailer from "nodemailer";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const to = process.env.CONTACT_RECEIVER_EMAIL || user;

  if (!host || !user || !pass || !from || !to) {
    throw new Error(
      "Missing SMTP env vars. Required: SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_RECEIVER_EMAIL(or SMTP_USER)."
    );
  }

  return {
    host,
    port,
    secure,
    auth: { user, pass },
    from,
    to,
  };
}

export async function sendContactMail({ name, email, subject, message }) {
  const config = getSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  const safeSubject = subject?.trim() || "Portfolio Contact Form";

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: email,
    subject: `[Contact] ${safeSubject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}
