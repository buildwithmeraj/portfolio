import { getDb } from "@/lib/db";

export async function ensureAdminFromEnv() {
  const username = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!username || !passwordHash) {
    return;
  }

  const db = await getDb();
  const admins = db.collection("admins");

  await admins.createIndex({ username: 1 }, { unique: true });

  const existingAdmin = await admins.findOne({});
  if (existingAdmin) {
    return;
  }

  await admins.insertOne({
    username,
    passwordHash,
    role: "admin",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
